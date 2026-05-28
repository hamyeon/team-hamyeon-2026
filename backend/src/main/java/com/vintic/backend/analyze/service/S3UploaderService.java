package com.vintic.backend.analyze.service;

import com.vintic.backend.common.exception.S3UploadException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.UUID;

//S3에 이미지를 저장하고 URL을 조립해 컨트롤러로 반환하는 서비스
@Service
@RequiredArgsConstructor
public class S3UploaderService {
    private final S3Client s3Client; // S3과 통신하는 객체

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;


    public String uploadImage(MultipartFile image) {

        try {
            // 파일명 추출 및 변환
            String originalFilename = image.getOriginalFilename();
            String uniqueFilename = UUID.randomUUID() + "_" + originalFilename; // 난수 붙이기 (예: 1234_신발.jpg)

            // S3 업로드 요청서 작성
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucket) // 어느 버킷에?
                    .key(uniqueFilename) // 무슨 이름으로?
                    .contentType(image.getContentType()) // 파일 종류? (이미지)
                    .build();

            // 파일 전송 (진짜 업로드 명령)
            s3Client.putObject(putObjectRequest,
                    RequestBody.fromInputStream(image.getInputStream(), image.getSize()));

            // URL 조립
            // S3 기본 주소 + 버킷 이름 + 지역(서울) + 파일이름을 합침
            String imageUrl = "https://" + bucket + ".s3.ap-northeast-2.amazonaws.com/" + uniqueFilename;

            return imageUrl; // 완성된 주소를 컨트롤러로
        } catch (Exception e) {
            // S3 에러 발생 시 전용 에러로 바꿔서 던지기
            throw new S3UploadException("S3 이미지 업로드 중 문제가 발생했습니다.");
        }



    }


}
