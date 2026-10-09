package com.timetable_api.mapper;

import com.timetable_api.dto.request.DepartmentRequest;
import com.timetable_api.dto.response.DepartmentResponse;
import com.timetable_api.entity.Department;

public class DepartmentMapper {

    private DepartmentMapper() {
    }

    public static Department toEntity(DepartmentRequest request) {

        Department department = new Department();

        department.setName(request.getName());
        department.setCode(request.getCode());

        return department;
    }

    public static DepartmentResponse toResponse(Department department) {

        return new DepartmentResponse(
                department.getId(),
                department.getName(),
                department.getCode()
        );
    }
}