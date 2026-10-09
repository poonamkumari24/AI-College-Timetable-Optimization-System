package com.timetable_api.dto.request;

public class SemesterRequest {

    private Integer semesterNumber;
    private Long programId;

    public SemesterRequest() {
    }

    public Integer getSemesterNumber() {
        return semesterNumber;
    }

    public Long getProgramId() {
        return programId;
    }

    public void setSemesterNumber(Integer semesterNumber) {
        this.semesterNumber = semesterNumber;
    }

    public void setProgramId(Long programId) {
        this.programId = programId;
    }
}