package com.timetable_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.timetable_api.entity.Timetable;

public interface TimetableRepository extends JpaRepository<Timetable, Long> {
}