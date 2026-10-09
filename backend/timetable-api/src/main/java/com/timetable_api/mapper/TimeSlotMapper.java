package com.timetable_api.mapper;

import com.timetable_api.dto.response.TimeSlotResponse;
import com.timetable_api.entity.TimeSlot;

public class TimeSlotMapper {

    private TimeSlotMapper() {
    }

    public static TimeSlotResponse toResponse(TimeSlot timeSlot) {

        return new TimeSlotResponse(
                timeSlot.getId(),
                timeSlot.getDayOfWeek(),
                timeSlot.getPeriodNumber(),
                timeSlot.getStartTime(),
                timeSlot.getEndTime()
        );
    }
}