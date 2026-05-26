package com.vintic.backend.ai.dto;

import java.util.List;

public record ProductAnalysisResponse(
        String brand,
        String modelName,
        String colorway,
        Integer sizeKr,
        ConditionGrade conditionGrade,
        Boolean boxIncluded,
        Double confidence,
        Boolean needsUserConfirmation,
        List<String> warnings,
        List<ProductAnalysisCandidate> candidates
) {
}