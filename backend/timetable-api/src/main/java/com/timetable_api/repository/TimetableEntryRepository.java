package com.timetable_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.timetable_api.entity.TimetableEntry;

public interface TimetableEntryRepository extends JpaRepository<TimetableEntry, Long> {
    boolean existsByTimetableIdAndSectionIdAndTimeSlotId(
        Long timetableId,
        Long sectionId,
        Long timeSlotId
);

boolean existsByTimetableIdAndFacultyIdAndTimeSlotId(
        Long timetableId,
        Long facultyId,
        Long timeSlotId
);

boolean existsByTimetableIdAndRoomIdAndTimeSlotId(
        Long timetableId,
        Long roomId,
        Long timeSlotId
);
}