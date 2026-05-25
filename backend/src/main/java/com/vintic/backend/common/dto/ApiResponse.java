package com.vintic.backend.common.dto;

public record ApiResponse<T>(
        boolean success,
        T data,
        ApiError error
) {
    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(true, data, null);
    }

    public static ApiResponse<Void> fail(int code, String message) {
        return new ApiResponse<>(
                false,
                null,
                new ApiError(code, message)
        );
    }
}