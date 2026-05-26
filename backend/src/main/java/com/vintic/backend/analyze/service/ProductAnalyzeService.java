package com.vintic.backend.analyze.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vintic.backend.ai.service.OpenAiService;
import com.vintic.backend.analyze.dto.AnalyzeResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class ProductAnalyzeService {

    private final S3UploaderService s3Service;
    private final OpenAiService openAiService;
    private final ObjectMapper objectMapper;

    public AnalyzeResponse processImageAndAnalyze(MultipartFile imageFile) {
        try {
            String imageUrl = s3Service.uploadImage(imageFile);
            String aiAnalysisResult = openAiService.analyzeProductImage(imageUrl);

            AnalyzeResponse response = objectMapper.readValue(aiAnalysisResult, AnalyzeResponse.class);

            return new AnalyzeResponse(
                    imageUrl,
                    response.brand(),
                    response.modelName(),
                    response.color(),
                    response.size(),
                    response.conditionDescription(),
                    response.conditionGrade()
            );

        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("AI 분석 응답을 파싱할 수 없습니다.", e);
        } catch (IOException e) {
            throw new IllegalStateException("이미지 업로드 중 오류가 발생했습니다.", e);
        }
    }
}