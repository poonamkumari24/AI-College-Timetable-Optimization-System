package com.timetable_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.timetable_api.entity.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {
}