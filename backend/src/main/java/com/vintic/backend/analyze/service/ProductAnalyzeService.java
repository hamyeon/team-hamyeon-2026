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

@Service
@RequiredArgsConstructor
public class ProductAnalyzeService {

    private final S3UploaderService s3Service;
    private final OpenAiService openAiService;
    private final ObjectMapper objectMapper;

    public AnalyzeResponse processImageAndAnalyze(MultipartFile imageFile) {

        if (imageFile == null || imageFile.isEmpty()) {
            throw new InvalidImageException("이미지 파일이 존재하지 않습니다.");
        }

        try {
            String imageUrl = s3Service.uploadImage(imageFile);//실패시 s3업로드 에러 날아감
            String aiAnalysisResult = openAiService.analyzeProductImage(imageUrl);//ai 분석 실패시 에러 날아감

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
            throw new AiApiException("AI 분석 응답을 처리하는 중 오류가 발생했습니다.");
        }
    }
}