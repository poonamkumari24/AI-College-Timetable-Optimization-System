package com.timetable_api.mapper;

import com.timetable_api.dto.response.SemesterResponse;
import com.timetable_api.entity.Semester;

public class SemesterMapper {

    private SemesterMapper() {
    }

    public static SemesterResponse toResponse(Semester semester) {

        return new SemesterResponse(
                semester.getId(),
                semester.getSemesterNumber(),
                semester.getProgram().getId(),
                semester.getProgram().getName()
        );
    }
}