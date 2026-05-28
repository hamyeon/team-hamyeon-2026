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
    public ResponseEntity<ApiResponse<AnalyzeResponse>> analyzeImage(@RequestPart("image") MultipartFile image) {
        // 에러나면 서비스가 알아서 던지고 Advice가 알아서 처리함
        AnalyzeResponse aiAnalysisResult = productAnalyzeService.processImageAndAnalyze(image);
        return ResponseEntity.ok(ApiResponse.success(aiAnalysisResult));
    }
}