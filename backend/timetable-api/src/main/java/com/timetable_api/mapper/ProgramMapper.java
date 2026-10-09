package com.timetable_api.mapper;

import com.timetable_api.dto.request.ProgramRequest;
import com.timetable_api.dto.response.ProgramResponse;
import com.timetable_api.entity.Program;

public class ProgramMapper {

    private ProgramMapper() {
    }

    public static ProgramResponse toResponse(Program program) {

        return new ProgramResponse(
                program.getId(),
                program.getName(),
                program.getCode(),
                program.getDepartment().getId(),
                program.getDepartment().getName()
        );
    }
}