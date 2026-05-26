package com.vintic.backend.ai.dto;

public record ProductAnalysisCandidate(
        String brand,
        String modelName,
        String colorway,
        Double confidence
) {
}