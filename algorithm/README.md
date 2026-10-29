# Timetable algorithm API

Run from this folder with `py -m venv .venv`, activate the environment, then `pip install -r requirements.txt` and `uvicorn main:app --reload --port 8001`.

`POST /api/schedule/generate` accepts `slots` (`id`, `day`, `period`), `requirements` (`section_id`, `subject_id`, `weekly_hours`, eligible `faculty_ids`, eligible `room_ids`), optional existing `entries`, `preserve_existing` (defaults true), `random_change_count`, and optional `seed`. It returns a proposed list of assignments. Existing entries are preserved by default; set `preserve_existing` false to regenerate. `GET /health` checks the service.

Round robin gives each section one pending lecture per pass. Feasibility checks prevent section, faculty, and room collisions. Randomized tie-breaking can be reproduced with `seed`. Set `random_change_count` to randomly unassign selected existing lectures and place the missing weekly hours again. The response lists displaced records under `replaced`. The service never writes to the database; Java remains the owner of persistence.
