package com.timetable_api.mapper;

import com.timetable_api.dto.response.SubjectResponse;
import com.timetable_api.entity.Subject;

public class SubjectMapper {

    private SubjectMapper() {
    }

    public static SubjectResponse toResponse(Subject subject) {

        return new SubjectResponse(
                subject.getId(),
                subject.getName(),
                subject.getCode(),
                subject.getWeeklyHours(),
                subject.getDepartment().getId(),
                subject.getDepartment().getName()
        );
    }
}