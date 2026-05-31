package com.vintic.backend.analyze.dto;

import java.util.List;

public record AnalyzeResponse(
        List<String> imageUrls,
        String brand,
        String modelName,
        String color,
        Integer size,
        String conditionDescription,
        String conditionGrade
) {}
