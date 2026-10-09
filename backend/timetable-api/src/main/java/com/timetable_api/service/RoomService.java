package com.timetable_api.service;

import com.timetable_api.entity.Room;
import com.timetable_api.repository.RoomRepository;

import org.springframework.stereotype.Service;

import java.util.List;

import com.timetable_api.dto.request.RoomRequest;
import com.timetable_api.entity.Department;
import com.timetable_api.repository.DepartmentRepository;

@Service
public class RoomService {

    private final RoomRepository roomRepository;
    private final DepartmentRepository departmentRepository;

    public RoomService(
            RoomRepository roomRepository,
            DepartmentRepository departmentRepository) {
        this.roomRepository = roomRepository;
        this.departmentRepository = departmentRepository;
    }

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Room getRoomById(Long id) {
        return roomRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Room not found with id: " + id));
    }

    public Room createRoom(RoomRequest request) {
        Room room = new Room();

        room.setName(request.getName());
        room.setCapacity(request.getCapacity());
        room.setLab(request.getLab());

        if (request.getDepartmentId() != null) {
            Department department = departmentRepository
                    .findById(request.getDepartmentId())
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Department not found with id: "
                                            + request.getDepartmentId()));

            room.setDepartment(department);
        }

        return roomRepository.save(room);
    }

    public Room updateRoom(Long id, RoomRequest request) {
        Room existingRoom = getRoomById(id);

        existingRoom.setName(request.getName());
        existingRoom.setCapacity(request.getCapacity());
        existingRoom.setLab(request.getLab());

        if (request.getDepartmentId() != null) {
            Department department = departmentRepository
                    .findById(request.getDepartmentId())
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Department not found with id: "
                                            + request.getDepartmentId()));

            existingRoom.setDepartment(department);
        } else {
            existingRoom.setDepartment(null);
        }

        return roomRepository.save(existingRoom);
    }

    public void deleteRoom(Long id) {
        Room room = getRoomById(id);
        roomRepository.delete(room);
    }
}