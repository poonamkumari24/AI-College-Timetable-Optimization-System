package com.timetable_api.dto.response;

public class SemesterResponse {

    private Long id;
    private Integer semesterNumber;
    private Long programId;
    private String programName;

    public SemesterResponse() {
    }

    public SemesterResponse(
            Long id,
            Integer semesterNumber,
            Long programId,
            String programName) {

        this.id = id;
        this.semesterNumber = semesterNumber;
        this.programId = programId;
        this.programName = programName;
    }

    public Long getId() {
        return id;
    }

    public Integer getSemesterNumber() {
        return semesterNumber;
    }

    public Long getProgramId() {
        return programId;
    }

    public String getProgramName() {
        return programName;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setSemesterNumber(Integer semesterNumber) {
        this.semesterNumber = semesterNumber;
    }

    public void setProgramId(Long programId) {
        this.programId = programId;
    }

    public void setProgramName(String programName) {
        this.programName = programName;
    }
}