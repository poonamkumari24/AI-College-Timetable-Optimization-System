package com.timetable_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.timetable_api.entity.Semester;

public interface SemesterRepository extends JpaRepository<Semester, Long> {
}