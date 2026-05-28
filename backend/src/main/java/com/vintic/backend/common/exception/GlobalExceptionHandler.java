package com.vintic.backend.common.exception;

import com.vintic.backend.common.dto.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Void>> handleValidationException(
            MethodArgumentNotValidException exception
    ) {
        String message = exception.getBindingResult()
                .getFieldErrors()
                .stream()
                .findFirst()
                .map(error -> error.getDefaultMessage())
                .orElse("유효하지 않은 요청입니다.");

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ApiResponse.fail(40001, message));
    }

    // 빈 이미지 에러 처리 (400 Bad Request)
    @ExceptionHandler(InvalidImageException.class)
    public ResponseEntity<ApiResponse<Void>> handleInvalidImageException(InvalidImageException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiResponse.fail(40002, e.getMessage()));
    }

    // S3 업로드 에러 처리 (500 Internal Server Error)
    @ExceptionHandler(S3UploadException.class)
    public ResponseEntity<ApiResponse<Void>> handleS3UploadException(S3UploadException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.fail(50002, e.getMessage()));
    }

    // OpenAI 통신 에러 처리 (500 Internal Server Error)
    @ExceptionHandler(AiApiException.class)
    public ResponseEntity<ApiResponse<Void>> handleAiApiException(AiApiException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.fail(50003, e.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleException(Exception exception) {
        // 1. 에러 내용을 콘솔에 강제로 출력
        exception.printStackTrace();

        // 2. 개발자를 위한 상세 메시지 (실제 서비스에서는 보안상 숨겨야 하지만, 지금은 개발 중이니 출력)
        String detailMessage = exception.getMessage();

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.fail(50001, "서버 내부 오류: " + detailMessage));
    }
}