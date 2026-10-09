package com.timetable_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.timetable_api.entity.Section;

public interface SectionRepository extends JpaRepository<Section, Long> {
}