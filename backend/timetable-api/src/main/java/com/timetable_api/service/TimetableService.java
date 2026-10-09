package com.timetable_api.service;

import com.timetable_api.entity.Timetable;
import com.timetable_api.repository.TimetableRepository;

import org.springframework.stereotype.Service;

import java.util.List;

import com.timetable_api.dto.request.TimetableRequest;
import com.timetable_api.dto.response.TimetableResponse;
import com.timetable_api.mapper.TimetableMapper;

@Service
public class TimetableService {

    private final TimetableRepository timetableRepository;

    public TimetableService(TimetableRepository timetableRepository) {
        this.timetableRepository = timetableRepository;
    }

    public List<TimetableResponse> getAllTimetables() {
        return timetableRepository.findAll()
                .stream()
                .map(TimetableMapper::toResponse)
                .toList();
    }

    public TimetableResponse getTimetableById(Long id) {
        Timetable timetable = timetableRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Timetable not found with id: " + id));

        return TimetableMapper.toResponse(timetable);
    }

    public TimetableResponse createTimetable(TimetableRequest request) {
        Timetable timetable = new Timetable();
        timetable.setAcademicYear(request.getAcademicYear());
        timetable.setSemester(request.getSemester());

        Timetable savedTimetable = timetableRepository.save(timetable);

        return TimetableMapper.toResponse(savedTimetable);
    }

    public TimetableResponse updateTimetable(
            Long id,
            TimetableRequest request
    ) {
        Timetable timetable = timetableRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Timetable not found with id: " + id));

        timetable.setAcademicYear(request.getAcademicYear());
        timetable.setSemester(request.getSemester());

        Timetable updatedTimetable = timetableRepository.save(timetable);

        return TimetableMapper.toResponse(updatedTimetable);
    }

    public void deleteTimetable(Long id) {
        Timetable timetable = timetableRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Timetable not found with id: " + id));

        timetableRepository.delete(timetable);
    }
}