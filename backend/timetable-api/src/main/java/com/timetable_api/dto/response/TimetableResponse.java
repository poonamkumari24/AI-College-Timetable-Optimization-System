package com.timetable_api.dto.response;

public class TimetableResponse {

    private Long id;
    private String academicYear;
    private String semester;

    public TimetableResponse() {
    }

    public TimetableResponse(
            Long id,
            String academicYear,
            String semester
    ) {
        this.id = id;
        this.academicYear = academicYear;
        this.semester = semester;
    }

    public Long getId() {
        return id;
    }

    public String getAcademicYear() {
        return academicYear;
    }

    public String getSemester() {
        return semester;
    }
}