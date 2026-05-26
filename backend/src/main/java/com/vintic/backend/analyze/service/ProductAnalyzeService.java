package com.vintic.backend.analyze.service;

import com.vintic.backend.ai.service.OpenAiService;
import com.vintic.backend.analyze.service.S3UploaderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ProductAnalyzeService {
    // 우리가 만든 두 개의 부품을 가져옵니다.
    private final S3UploaderService s3Service;
    private final OpenAiService openAiService;

    // 파이프라인 메서드
    public String processImageAndAnalyze(MultipartFile imageFile) {

        // 프론트에서 받은 이미지를 S3에 업로드하고 URL을 받아옴
        String imageUrl = s3Service.uploadImage(imageFile);

        // 받아온 S3 URL을 OpenAI에게 던져서 분석 결과를 받아옴
        String aiAnalysisResult = openAiService.analyzeProductImage(imageUrl);

        // DB 저장 없이, 분석 결과(OpenAI가 준 JSON 문자열)만 그대로 리턴
        return aiAnalysisResult;
    }
}
