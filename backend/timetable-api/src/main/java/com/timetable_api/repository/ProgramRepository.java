package com.timetable_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.timetable_api.entity.Program;

public interface ProgramRepository extends JpaRepository<Program, Long> {
}