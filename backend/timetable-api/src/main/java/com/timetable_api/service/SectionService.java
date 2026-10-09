package com.timetable_api.service;

import com.timetable_api.entity.Section;
import com.timetable_api.repository.SectionRepository;

import org.springframework.stereotype.Service;

import java.util.List;

import com.timetable_api.dto.request.SectionRequest;
import com.timetable_api.entity.Semester;
import com.timetable_api.repository.SemesterRepository;

@Service
public class SectionService {

    private final SectionRepository sectionRepository;
    private final SemesterRepository semesterRepository;

    public SectionService(
            SectionRepository sectionRepository,
            SemesterRepository semesterRepository) {

        this.sectionRepository = sectionRepository;
        this.semesterRepository = semesterRepository;
    }

    public List<Section> getAllSections() {
        return sectionRepository.findAll();
    }

    public Section getSectionById(Long id) {
        return sectionRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Section not found with id: " + id));
    }

    public Section createSection(SectionRequest request) {

        Semester semester = semesterRepository.findById(
                request.getSemesterId()
        ).orElseThrow(() ->
                new RuntimeException(
                        "Semester not found with id: "
                                + request.getSemesterId()));

        Section section = new Section();

        section.setName(request.getName());
        section.setSemester(semester);

        return sectionRepository.save(section);
    }

    public Section updateSection(
            Long id,
            SectionRequest request) {

        Section existingSection = getSectionById(id);

        Semester semester = semesterRepository.findById(
                request.getSemesterId()
        ).orElseThrow(() ->
                new RuntimeException(
                        "Semester not found with id: "
                                + request.getSemesterId()));

        existingSection.setName(request.getName());
        existingSection.setSemester(semester);

        return sectionRepository.save(existingSection);
    }

    public void deleteSection(Long id) {

        Section section = getSectionById(id);

        sectionRepository.delete(section);
    }
}