package com.timetable_api.mapper;

import com.timetable_api.dto.response.RoomResponse;
import com.timetable_api.entity.Room;

public class RoomMapper {

    private RoomMapper() {
    }

    public static RoomResponse toResponse(Room room) {

        Long departmentId = room.getDepartment() != null
                ? room.getDepartment().getId()
                : null;

        String departmentName = room.getDepartment() != null
                ? room.getDepartment().getName()
                : null;

        return new RoomResponse(
                room.getId(),
                room.getName(),
                room.getCapacity(),
                room.getLab(),
                departmentId,
                departmentName
        );
    }
}