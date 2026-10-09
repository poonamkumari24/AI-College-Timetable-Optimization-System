package com.timetable_api.controller;

import com.timetable_api.entity.Room;
import com.timetable_api.service.RoomService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.timetable_api.dto.request.RoomRequest;
import com.timetable_api.dto.response.RoomResponse;
import com.timetable_api.mapper.RoomMapper;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "http://localhost:5173")
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping
    public ResponseEntity<List<RoomResponse>> getAllRooms() {
        List<RoomResponse> response =
                roomService.getAllRooms()
                        .stream()
                        .map(RoomMapper::toResponse)
                        .toList();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoomResponse> getRoomById(
            @PathVariable Long id) {
        Room room = roomService.getRoomById(id);
        return ResponseEntity.ok(RoomMapper.toResponse(room));
    }

    @PostMapping
    public ResponseEntity<RoomResponse> createRoom(
            @RequestBody RoomRequest request) {
        Room createdRoom = roomService.createRoom(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(RoomMapper.toResponse(createdRoom));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoomResponse> updateRoom(
            @PathVariable Long id,
            @RequestBody RoomRequest request) {
        Room updatedRoom = roomService.updateRoom(id, request);

        return ResponseEntity.ok(RoomMapper.toResponse(updatedRoom));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
        return ResponseEntity.noContent().build();
    }
}