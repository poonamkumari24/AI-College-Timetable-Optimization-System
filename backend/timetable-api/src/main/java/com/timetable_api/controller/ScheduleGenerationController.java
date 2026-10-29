package com.timetable_api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** Thin bridge: scheduling stays in Python; persistence stays in Java. */
@RestController
@RequestMapping("/api/schedule")
public class ScheduleGenerationController {
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final String schedulerUrl;

    public ScheduleGenerationController(
            @Value("${scheduler.api-url:http://localhost:8001}") String schedulerUrl) {
        this.schedulerUrl = schedulerUrl;
    }

    @PostMapping("/generate")
    public ResponseEntity<Map> generate(@RequestBody Map<String, Object> request) {
        try {
            URL url = URI.create(schedulerUrl + "/api/schedule/generate").toURL();
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json; charset=utf-8");
            connection.setDoOutput(true);
            byte[] payload = objectMapper.writeValueAsBytes(request);
            connection.setFixedLengthStreamingMode(payload.length);
            try (var output = connection.getOutputStream()) {
                output.write(payload);
            }
            int status = connection.getResponseCode();
            var stream = status >= 400 ? connection.getErrorStream() : connection.getInputStream();
            try (stream) {
                Map result = objectMapper.readValue(stream, Map.class);
                return ResponseEntity.status(status).body(result);
            } finally {
                connection.disconnect();
            }
        } catch (IOException exception) {
            return ResponseEntity.status(503).body(Map.of(
                    "error", "Scheduler service is unavailable",
                    "detail", exception.getMessage()));
        }
    }
}
