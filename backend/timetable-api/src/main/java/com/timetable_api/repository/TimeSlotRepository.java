package com.timetable_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.timetable_api.entity.TimeSlot;

public interface TimeSlotRepository extends JpaRepository<TimeSlot, Long> {
}