package com.timetable_api.mapper;

import com.timetable_api.dto.response.SectionResponse;
import com.timetable_api.entity.Section;

public class SectionMapper {

    private SectionMapper() {
    }

    public static SectionResponse toResponse(Section section) {

        return new SectionResponse(
                section.getId(),
                section.getName(),
                section.getSemester().getId(),
                section.getSemester().getSemesterNumber()
        );
    }
}