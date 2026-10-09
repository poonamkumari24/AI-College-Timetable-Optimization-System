package com.timetable_api.dto.response;

public class TimetableEntryResponse {

    private Long id;
    private Long timetableId;
    private Long sectionId;
    private String sectionName;
    private Long subjectId;
    private String subjectName;
    private Long facultyId;
    private String facultyName;
    private Long roomId;
    private String roomName;
    private Long timeSlotId;
    private String dayOfWeek;
    private Integer periodNumber;
    private String startTime;
    private String endTime;

    public TimetableEntryResponse(
            Long id,
            Long timetableId,
            Long sectionId,
            String sectionName,
            Long subjectId,
            String subjectName,
            Long facultyId,
            String facultyName,
            Long roomId,
            String roomName,
            Long timeSlotId,
            String dayOfWeek,
            Integer periodNumber,
            String startTime,
            String endTime
    ) {
        this.id = id;
        this.timetableId = timetableId;
        this.sectionId = sectionId;
        this.sectionName = sectionName;
        this.subjectId = subjectId;
        this.subjectName = subjectName;
        this.facultyId = facultyId;
        this.facultyName = facultyName;
        this.roomId = roomId;
        this.roomName = roomName;
        this.timeSlotId = timeSlotId;
        this.dayOfWeek = dayOfWeek;
        this.periodNumber = periodNumber;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public Long getId() { return id; }
    public Long getTimetableId() { return timetableId; }
    public Long getSectionId() { return sectionId; }
    public String getSectionName() { return sectionName; }
    public Long getSubjectId() { return subjectId; }
    public String getSubjectName() { return subjectName; }
    public Long getFacultyId() { return facultyId; }
    public String getFacultyName() { return facultyName; }
    public Long getRoomId() { return roomId; }
    public String getRoomName() { return roomName; }
    public Long getTimeSlotId() { return timeSlotId; }
    public String getDayOfWeek() { return dayOfWeek; }
    public Integer getPeriodNumber() { return periodNumber; }
    public String getStartTime() { return startTime; }
    public String getEndTime() { return endTime; }
}
