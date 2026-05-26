package com.vintic.backend.analyze.controller;

import com.vintic.backend.analyze.service.ProductAnalyzeService;
import com.vintic.backend.common.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;



//S3UploaderService에 프론트가 보낸 이미지를 전달하는 컨트롤러
@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class AnalyzeController {

    private final ProductAnalyzeService productAnalyzeService;
    

    @PostMapping(value = "/analyze", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<?>> analyzeImage(@RequestPart("image") MultipartFile image) {
        // 빈 파일이 오면 쫓아냄
        if (image == null || image.isEmpty()) {
            return ResponseEntity.badRequest().body(ApiResponse.fail(400, "이미지 파일이 없습니다."));
        }

        try {
            //서비스 호출(S3 업로드+OpenAI 분석)
            String aiAnalysisResult = productAnalyzeService.processImageAndAnalyze(image);

            // 최종 AI 분석 결과를 기존 공통 ApiResponse 성공 포맷에 담아 반환
            return ResponseEntity.ok(ApiResponse.success(aiAnalysisResult));

        } catch (Exception e) {
            // 업로드 또는 ai 분석 중 에러가 터지면 500 에러 반환
            e.printStackTrace(); //개발용. 운영 환경에선 log.error()로 대체
            return ResponseEntity.internalServerError().body(ApiResponse.fail(500,"이미지 업로드에 실패했습니다."));
        }
    }


}
