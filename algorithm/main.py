"""Round-robin college timetable proposal API."""
from __future__ import annotations
import random
from collections import defaultdict, deque
from typing import Any
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(title="College Timetable Scheduler", version="1.0.0")

class Slot(BaseModel):
    id: int
    day: str
    period: int

class Requirement(BaseModel):
    section_id: int
    subject_id: int
    weekly_hours: int = Field(gt=0)
    faculty_ids: list[int] = Field(min_length=1)
    room_ids: list[int] = Field(min_length=1)

class Entry(BaseModel):
    section_id: int
    subject_id: int
    faculty_id: int
    room_id: int
    slot_id: int

class ScheduleRequest(BaseModel):
    slots: list[Slot]
    requirements: list[Requirement]
    existing: list[Entry] = []
    preserve_existing: bool = True
    random_change_count: int = Field(default=0, ge=0)
    seed: int | None = None

@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}

@app.post("/api/schedule/generate")
def generate(req: ScheduleRequest) -> dict[str, Any]:
    if not req.slots:
        raise HTTPException(400, "At least one time slot is required")
    rng = random.Random(req.seed)
    slots = sorted(req.slots, key=lambda s: (s.day.lower(), s.period, s.id))
    slot_ids = {s.id for s in slots}
    assignments: list[Entry] = []
    section_busy: set[tuple[int, int]] = set()
    faculty_busy: set[tuple[int, int]] = set()
    room_busy: set[tuple[int, int]] = set()
    counts: dict[tuple[int, int], int] = defaultdict(int)

    def reserve(e: Entry) -> bool:
        if e.slot_id not in slot_ids:
            return False
        keys = ((e.section_id, e.slot_id), (e.faculty_id, e.slot_id), (e.room_id, e.slot_id))
        if any(k in busy for k, busy in zip(keys, (section_busy, faculty_busy, room_busy))):
            return False
        section_busy.add(keys[0]); faculty_busy.add(keys[1]); room_busy.add(keys[2])
        assignments.append(e); counts[(e.section_id, e.subject_id)] += 1
        return True

    changed = []
    if req.preserve_existing:
        change_count = min(req.random_change_count, len(req.existing))
        changed_indices = set(rng.sample(range(len(req.existing)), change_count))
        for index, old in enumerate(req.existing):
            if index in changed_indices:
                changed.append(old)
                continue
            if not reserve(old):
                raise HTTPException(409, "Existing timetable has a collision or references an unknown slot; cannot preserve it")

    # Expand weekly teaching hours into a queue and take one item per section in
    # each round. Randomness only breaks ties among feasible slots/resources.
    queues: dict[int, deque[Requirement]] = defaultdict(deque)
    for r in req.requirements:
        already = counts[(r.section_id, r.subject_id)] if req.preserve_existing else 0
        for _ in range(max(0, r.weekly_hours - already)):
            queues[r.section_id].append(r)
    sections = sorted(queues)
    rng.shuffle(sections)
    while any(queues.values()):
        progressed = False
        for section_id in sections:
            if not queues[section_id]:
                continue
            req_item = queues[section_id][0]
            candidates = slots.copy(); rng.shuffle(candidates)
            faculties = req_item.faculty_ids.copy(); rng.shuffle(faculties)
            rooms = req_item.room_ids.copy(); rng.shuffle(rooms)
            placed = False
            for slot in candidates:
                if (section_id, slot.id) in section_busy:
                    continue
                for faculty in faculties:
                    if (faculty, slot.id) in faculty_busy:
                        continue
                    for room in rooms:
                        if (room, slot.id) in room_busy:
                            continue
                        entry = Entry(section_id=section_id, subject_id=req_item.subject_id,
                                      faculty_id=faculty, room_id=room, slot_id=slot.id)
                        reserve(entry); queues[section_id].popleft()
                        placed = progressed = True
                        break
                    if placed: break
                if placed: break
        if not progressed:
            unscheduled = [{"section_id": sid, "subject_id": q[0].subject_id,
                            "remaining": len(q)} for sid, q in queues.items() if q]
            raise HTTPException(409, detail={"message": "Not enough conflict-free slots/resources to complete timetable", "unscheduled": unscheduled})
    return {"entries": [e.model_dump() for e in assignments], "replaced": [e.model_dump() for e in changed], "count": len(assignments), "algorithm": "round-robin"}


