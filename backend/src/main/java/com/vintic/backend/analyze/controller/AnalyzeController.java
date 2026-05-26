package com.vintic.backend.analyze.controller;

import com.vintic.backend.analyze.dto.AnalyzeResponse;
import com.vintic.backend.analyze.service.ProductAnalyzeService;
import com.vintic.backend.common.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

// 프론트가 보낸 이미지를 받아 S3 업로드 및 AI 분석을 수행하는 컨트롤러
@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class AnalyzeController {

    private final ProductAnalyzeService productAnalyzeService;

    @PostMapping(value = "/analyze", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<?>> analyzeImage(@RequestPart("image") MultipartFile image) {
        if (image == null || image.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.fail(40002, "이미지 파일이 없습니다."));
        }

        try {
            AnalyzeResponse response = productAnalyzeService.processImageAndAnalyze(image);
            return ResponseEntity.ok(ApiResponse.success(response));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.fail(50003, "이미지 분석에 실패했습니다."));
        }
    }
}