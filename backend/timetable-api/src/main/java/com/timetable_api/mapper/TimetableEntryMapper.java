package com.timetable_api.mapper;

import com.timetable_api.dto.response.TimetableEntryResponse;
import com.timetable_api.entity.TimetableEntry;

public class TimetableEntryMapper {

    private TimetableEntryMapper() {
    }

    public static TimetableEntryResponse toResponse(
            TimetableEntry entry
    ) {
        return new TimetableEntryResponse(
                entry.getId(),

                entry.getTimetable().getId(),

                entry.getSection().getId(),
                entry.getSection().getName(),

                entry.getSubject().getId(),
                entry.getSubject().getName(),

                entry.getFaculty().getId(),
                entry.getFaculty().getName(),

                entry.getRoom().getId(),
                entry.getRoom().getName(),

                entry.getTimeSlot().getId(),
                entry.getTimeSlot().getDayOfWeek(),
                entry.getTimeSlot().getPeriodNumber(),
                entry.getTimeSlot().getStartTime(),
                entry.getTimeSlot().getEndTime()
        );
    }
}