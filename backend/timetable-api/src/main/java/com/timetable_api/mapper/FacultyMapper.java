package com.timetable_api.mapper;

import com.timetable_api.dto.response.FacultyResponse;
import com.timetable_api.entity.Faculty;

public class FacultyMapper {

    private FacultyMapper() {
    }

    public static FacultyResponse toResponse(Faculty faculty) {

        return new FacultyResponse(
                faculty.getId(),
                faculty.getName(),
                faculty.getEmployeeCode(),
                faculty.getEmail(),
                faculty.getDepartment().getId(),
                faculty.getDepartment().getName()
        );
    }
}