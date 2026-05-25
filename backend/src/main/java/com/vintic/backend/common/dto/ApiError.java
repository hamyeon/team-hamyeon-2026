package com.vintic.backend.common.dto;

public record ApiError(
        int code,
        String message
) {
}