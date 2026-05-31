package com.vintic.backend.ai.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vintic.backend.ai.prompt.ProductAnalysisPrompt;
import com.vintic.backend.common.exception.AiApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
@RequiredArgsConstructor
public class OpenAiService {

    @Value("${openai.api.key}")
    private String apiKey;

    private final ObjectMapper objectMapper;
    private final RestTemplate restTemplate = new RestTemplate();

    public String analyzeProductImages(List<String> imageUrls) { // List 파라미터로 변경
        try {
            String url = "https://api.openai.com/v1/chat/completions";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);

            Map<String, Object> body = new HashMap<>();
            body.put("model", "gpt-4o");

            Map<String, Object> systemMessage = new HashMap<>();
            systemMessage.put("role", "system");
            systemMessage.put("content", ProductAnalysisPrompt.SYSTEM_PROMPT);

            // 전달받은 URL 리스트를 순회하며 요청에 담을 Content 객체 리스트 생성
            List<Map<String, Object>> contentList = new ArrayList<>();
            for (String imageUrl : imageUrls) {
                Map<String, Object> imageUrlMap = new HashMap<>();
                imageUrlMap.put("url", imageUrl);

                Map<String, Object> imageContent = new HashMap<>();
                imageContent.put("type", "image_url");
                imageContent.put("image_url", imageUrlMap);

                contentList.add(imageContent);
            }

            Map<String, Object> userMessage = new HashMap<>();
            userMessage.put("role", "user");
            userMessage.put("content", contentList); // singletonList 대신 완성된 contentList 삽입

            body.put("messages", Arrays.asList(systemMessage, userMessage));

            Map<String, Object> responseFormat = new HashMap<>();
            responseFormat.put("type", "json_object");
            body.put("response_format", responseFormat);

            body.put("max_tokens", 1000);

            HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(body, headers);

            ResponseEntity<String> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    requestEntity,
                    String.class
            );

            return extractContent(response.getBody());

        } catch (Exception e) {
            throw new AiApiException("AI 분석 API 호출 중 오류가 발생했습니다.");
        }
    }

    private String extractContent(String responseBody) {
        // 기존 코드 유지
        try {
            JsonNode root = objectMapper.readTree(responseBody);
            return root.path("choices")
                    .get(0)
                    .path("message")
                    .path("content")
                    .asText();
        } catch (Exception e) {
            throw new IllegalArgumentException("OpenAI 응답에서 분석 결과를 추출할 수 없습니다.", e);
        }
    }
}