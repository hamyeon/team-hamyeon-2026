package com.example.shoepricevalidator.service;

import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class KeywordTranslateService {

    private final Map<String, String> replaceMap = new LinkedHashMap<>();

    public KeywordTranslateService() {
        // 브랜드
        replaceMap.put("나이키", "nike");
        replaceMap.put("아디다스", "adidas");
        replaceMap.put("뉴발란스", "new balance");
        replaceMap.put("뉴발", "new balance");
        replaceMap.put("아식스", "asics");
        replaceMap.put("컨버스", "converse");
        replaceMap.put("반스", "vans");
        replaceMap.put("리복", "reebok");
        replaceMap.put("푸마", "puma");
        replaceMap.put("살로몬", "salomon");

        // 모델/라인
        replaceMap.put("덩크 로우", "dunk low");
        replaceMap.put("덩크 하이", "dunk high");
        replaceMap.put("덩크", "dunk");
        replaceMap.put("에어포스 1", "air force 1");
        replaceMap.put("에어포스", "air force");
        replaceMap.put("에어 조던 1", "air jordan 1");
        replaceMap.put("조던 1", "jordan 1");
        replaceMap.put("조던", "jordan");
        replaceMap.put("삼바", "samba");
        replaceMap.put("가젤", "gazelle");
        replaceMap.put("슈퍼스타", "superstar");
        replaceMap.put("캠퍼스", "campus");
        replaceMap.put("1906r", "1906r");
        replaceMap.put("2002r", "2002r");
        replaceMap.put("530", "530");
        replaceMap.put("574", "574");
        replaceMap.put("996", "996");
        replaceMap.put("xt-6", "xt-6");
        replaceMap.put("xt6", "xt-6");
        replaceMap.put("젤 카야노 14", "gel kayano 14");
        replaceMap.put("젤 카야노", "gel kayano");
        replaceMap.put("젤1130", "gel 1130");
        replaceMap.put("젤 1130", "gel 1130");

        // 색상 / 별칭
        replaceMap.put("판다", "panda");
        replaceMap.put("시카고", "chicago");
        replaceMap.put("모카", "mocha");
        replaceMap.put("오프화이트", "off white");
        replaceMap.put("트래비스 스캇", "travis scott");
        replaceMap.put("트래비스", "travis");
        replaceMap.put("검흰", "black white");
        replaceMap.put("흰검", "white black");
        replaceMap.put("검빨", "black red");
        replaceMap.put("빨검", "red black");
        replaceMap.put("검노", "black yellow");
        replaceMap.put("범고래", "black white");

        // 공통 단어
        replaceMap.put("운동화", "shoes");
        replaceMap.put("스니커즈", "sneakers");
        replaceMap.put("신발", "shoes");
        replaceMap.put("로우", "low");
        replaceMap.put("하이", "high");
        replaceMap.put("미드", "mid");
    }

    public String translateToSearchKeyword(String input) {
        if (input == null || input.trim().isEmpty()) {
            return "";
        }

        String result = input.toLowerCase().trim();

        // 특수문자 정리
        result = result.replaceAll("[,()/]+", " ");
        result = result.replaceAll("\\s+", " ").trim();

        // 긴 키워드 먼저 바꾸는 게 유리해서 LinkedHashMap 사용
        for (Map.Entry<String, String> entry : replaceMap.entrySet()) {
            result = result.replace(entry.getKey(), entry.getValue());
        }

        // 사이즈 표기 제거 예시: 270, 275, 280
        result = result.replaceAll("\\b2[0-9]{2}\\b", " ");

        // 한국어 남아 있으면 그냥 제거하지 말고 공백 정리만
        result = result.replaceAll("\\s+", " ").trim();

        return result;
    }
}