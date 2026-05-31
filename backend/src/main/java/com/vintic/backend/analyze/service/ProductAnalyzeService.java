package com.vintic.backend.analyze.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vintic.backend.ai.service.OpenAiService;
import com.vintic.backend.analyze.dto.AnalyzeResponse;
import com.vintic.backend.common.exception.AiApiException;
import com.vintic.backend.common.exception.InvalidImageException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductAnalyzeService {

    private final S3UploaderService s3Service;
    private final OpenAiService openAiService;
    private final ObjectMapper objectMapper;

    public AnalyzeResponse processImageAndAnalyze(List<MultipartFile> imageFiles) {

        // 방어 로직: 리스트 자체가 null이거나 비어있는지, 첫 번째 파일이 비어있는지 확인
        if (imageFiles == null || imageFiles.isEmpty() || imageFiles.get(0).isEmpty()) {
            throw new InvalidImageException("이미지 파일이 존재하지 않습니다.");
        }

        try {
            // S3에 여러 이미지 업로드 후 URL 리스트 반환
            List<String> imageUrls = s3Service.uploadImages(imageFiles);
            // URL 리스트를 AI 서비스로 전달
            String aiAnalysisResult = openAiService.analyzeProductImages(imageUrls);

            AnalyzeResponse response = objectMapper.readValue(aiAnalysisResult, AnalyzeResponse.class);

            return new AnalyzeResponse(
                    imageUrls, // 변경된 리스트 타입 삽입
                    response.brand(),
                    response.modelName(),
                    response.color(),
                    response.size(),
                    response.conditionDescription(),
                    response.conditionGrade()
            );

        } catch (JsonProcessingException e) {
            throw new AiApiException("AI 분석 응답을 처리하는 중 오류가 발생했습니다.");
        }
    }
}