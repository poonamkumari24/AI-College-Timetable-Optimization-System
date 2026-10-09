package com.timetable_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.timetable_api.entity.Subject;

public interface SubjectRepository extends JpaRepository<Subject, Long> {
}