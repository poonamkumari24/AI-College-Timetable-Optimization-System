package com.timetable_api.mapper;

import com.timetable_api.dto.response.TimetableResponse;
import com.timetable_api.entity.Timetable;

public class TimetableMapper {

    private TimetableMapper() {
    }

    public static TimetableResponse toResponse(Timetable timetable) {
        return new TimetableResponse(
                timetable.getId(),
                timetable.getAcademicYear(),
                timetable.getSemester()
        );
    }
}