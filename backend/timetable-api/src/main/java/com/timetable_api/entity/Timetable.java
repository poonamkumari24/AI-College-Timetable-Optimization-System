package com.timetable_api.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "timetables")
public class Timetable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "academic_year", nullable = false, length = 20)
    private String academicYear;

    @Column(nullable = false, length = 20)
    private String semester;

    @OneToMany(
        mappedBy = "timetable",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<TimetableEntry> entries = new ArrayList<>();

    public Timetable() {
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

    public List<TimetableEntry> getEntries() {
        return entries;
    }

    public void setAcademicYear(String academicYear) {
        this.academicYear = academicYear;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

    public void setEntries(List<TimetableEntry> entries) {
        this.entries = entries;
    }
}