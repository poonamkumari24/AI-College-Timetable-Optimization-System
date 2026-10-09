package com.timetable_api.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.timetable_api.dto.request.TimetableEntryRequest;
import com.timetable_api.dto.response.TimetableEntryResponse;
import com.timetable_api.entity.TimetableEntry;
import com.timetable_api.mapper.TimetableEntryMapper;
import com.timetable_api.repository.FacultyRepository;
import com.timetable_api.repository.RoomRepository;
import com.timetable_api.repository.SectionRepository;
import com.timetable_api.repository.SubjectRepository;
import com.timetable_api.repository.TimeSlotRepository;
import com.timetable_api.repository.TimetableEntryRepository;
import com.timetable_api.repository.TimetableRepository;

@Service
public class TimetableEntryService {

    private final TimetableEntryRepository entryRepository;
    private final TimetableRepository timetableRepository;
    private final SectionRepository sectionRepository;
    private final SubjectRepository subjectRepository;
    private final FacultyRepository facultyRepository;
    private final RoomRepository roomRepository;
    private final TimeSlotRepository timeSlotRepository;

    public TimetableEntryService(
            TimetableEntryRepository entryRepository,
            TimetableRepository timetableRepository,
            SectionRepository sectionRepository,
            SubjectRepository subjectRepository,
            FacultyRepository facultyRepository,
            RoomRepository roomRepository,
            TimeSlotRepository timeSlotRepository
    ) {
        this.entryRepository = entryRepository;
        this.timetableRepository = timetableRepository;
        this.sectionRepository = sectionRepository;
        this.subjectRepository = subjectRepository;
        this.facultyRepository = facultyRepository;
        this.roomRepository = roomRepository;
        this.timeSlotRepository = timeSlotRepository;
    }

    @Transactional(readOnly = true)
    public List<TimetableEntryResponse> getAllEntries() {
        return entryRepository.findAll()
                .stream()
                .map(TimetableEntryMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public TimetableEntryResponse getEntryById(Long id) {
        TimetableEntry entry = entryRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Timetable entry not found with id: " + id));

        return TimetableEntryMapper.toResponse(entry);
    }

    @Transactional
    public TimetableEntryResponse createEntry(
            TimetableEntryRequest request
    ) {
        TimetableEntry entry = new TimetableEntry();

        entry.setTimetable(timetableRepository.findById(request.getTimetableId())
                .orElseThrow(() -> new RuntimeException("Timetable not found")));

        entry.setSection(sectionRepository.findById(request.getSectionId())
                .orElseThrow(() -> new RuntimeException("Section not found")));

        entry.setSubject(subjectRepository.findById(request.getSubjectId())
                .orElseThrow(() -> new RuntimeException("Subject not found")));

        entry.setFaculty(facultyRepository.findById(request.getFacultyId())
                .orElseThrow(() -> new RuntimeException("Faculty not found")));

        entry.setRoom(roomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found")));

        entry.setTimeSlot(timeSlotRepository.findById(request.getTimeSlotId())
                .orElseThrow(() -> new RuntimeException("Time slot not found")));

       checkSectionConflict(
        request.getTimetableId(),
        request.getSectionId(),
        request.getTimeSlotId(),
        null
);

checkFacultyConflict(
        request.getTimetableId(),
        request.getFacultyId(),
        request.getTimeSlotId(),
        null
);

checkRoomConflict(
        request.getTimetableId(),
        request.getRoomId(),
        request.getTimeSlotId(),
        null
);
        TimetableEntry savedEntry = entryRepository.save(entry);

        return TimetableEntryMapper.toResponse(savedEntry);
    }

    @Transactional
    public TimetableEntryResponse updateEntry(
            Long id,
            TimetableEntryRequest request
    ) {
        TimetableEntry entry = entryRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Timetable entry not found with id: " + id));

        entry.setTimetable(timetableRepository.findById(request.getTimetableId())
                .orElseThrow(() -> new RuntimeException("Timetable not found")));

        entry.setSection(sectionRepository.findById(request.getSectionId())
                .orElseThrow(() -> new RuntimeException("Section not found")));

        entry.setSubject(subjectRepository.findById(request.getSubjectId())
                .orElseThrow(() -> new RuntimeException("Subject not found")));

        entry.setFaculty(facultyRepository.findById(request.getFacultyId())
                .orElseThrow(() -> new RuntimeException("Faculty not found")));

        entry.setRoom(roomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found")));

        entry.setTimeSlot(timeSlotRepository.findById(request.getTimeSlotId())
                .orElseThrow(() -> new RuntimeException("Time slot not found")));

         checkSectionConflict(
        request.getTimetableId(),
        request.getSectionId(),
        request.getTimeSlotId(),
        id
);

checkFacultyConflict(
        request.getTimetableId(),
        request.getFacultyId(),
        request.getTimeSlotId(),
        id
);

checkRoomConflict(
        request.getTimetableId(),
        request.getRoomId(),
        request.getTimeSlotId(),
        id
);
        TimetableEntry updatedEntry = entryRepository.save(entry);

        return TimetableEntryMapper.toResponse(updatedEntry);
    }

    @Transactional
    public void deleteEntry(Long id) {
        TimetableEntry entry = entryRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Timetable entry not found with id: " + id));

        entryRepository.delete(entry);
    }
    private void checkSectionConflict(
        Long timetableId,
        Long sectionId,
        Long timeSlotId,
        Long currentEntryId
) {
    boolean conflict =
            entryRepository.existsByTimetableIdAndSectionIdAndTimeSlotId(
                    timetableId,
                    sectionId,
                    timeSlotId
            );

    if (conflict) {
        boolean sameEntry = currentEntryId != null
                && entryRepository.findById(currentEntryId)
                .map(entry ->
                        entry.getTimetable().getId().equals(timetableId)
                        && entry.getSection().getId().equals(sectionId)
                        && entry.getTimeSlot().getId().equals(timeSlotId))
                .orElse(false);

        if (!sameEntry) {
            throw new IllegalArgumentException(
                    "Scheduling conflict: this section already has a class "
                    + "in the selected time slot."
            );
        }
    }
}

private void checkFacultyConflict(
        Long timetableId,
        Long facultyId,
        Long timeSlotId,
        Long currentEntryId
) {
    boolean conflict =
            entryRepository.existsByTimetableIdAndFacultyIdAndTimeSlotId(
                    timetableId,
                    facultyId,
                    timeSlotId
            );

    if (conflict) {
        boolean sameEntry = currentEntryId != null
                && entryRepository.findById(currentEntryId)
                .map(entry ->
                        entry.getTimetable().getId().equals(timetableId)
                        && entry.getFaculty().getId().equals(facultyId)
                        && entry.getTimeSlot().getId().equals(timeSlotId))
                .orElse(false);

        if (!sameEntry) {
            throw new IllegalArgumentException(
                    "Scheduling conflict: this faculty member "
                    + "is already assigned to a class in the selected time slot."
            );
        }
    }
}

private void checkRoomConflict(
        Long timetableId,
        Long roomId,
        Long timeSlotId,
        Long currentEntryId
) {
    boolean conflict =
            entryRepository.existsByTimetableIdAndRoomIdAndTimeSlotId(
                    timetableId,
                    roomId,
                    timeSlotId
            );

    if (conflict) {
        boolean sameEntry = currentEntryId != null
                && entryRepository.findById(currentEntryId)
                .map(entry ->
                        entry.getTimetable().getId().equals(timetableId)
                        && entry.getRoom().getId().equals(roomId)
                        && entry.getTimeSlot().getId().equals(timeSlotId))
                .orElse(false);

        if (!sameEntry) {
            throw new IllegalArgumentException(
                    "Scheduling conflict: this room is already assigned "
                    + "to another class in the selected time slot."
            );
        }
    }
}
}