package com.timetable_api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(
    name = "sections",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"semester_id", "name"})
    }
)
public class Section {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 20)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "semester_id", nullable = false)
    private Semester semester;

    public Section() {
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Semester getSemester() {
        return semester;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSemester(Semester semester) {
        this.semester = semester;
    }
}