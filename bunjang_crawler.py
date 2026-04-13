import requests
import pandas as pd
import time
import random
import os

def get_bunjang_data(keyword="나이키", max_page=2):
    """
    번개장터 검색 리스트를 크롤링하여 이미지 포함 데이터를 반환함.
    """
    results = []
    
    # 봇 차단 방지를 위한 필수 헤더 설정
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": "https://m.bunjang.co.kr/",
        "Origin": "https://m.bunjang.co.kr",
        "Accept": "application/json, text/plain, */*"
    }
    
    url = "https://api.bunjang.co.kr/api/1/find_v2.json"

    for page in range(max_page):
        # 실시간 요청 ID 생성 (서버 검증 우회용)
        req_id = time.strftime("%Y%m%d%H%M%S")
        
        params = {
            "q": keyword,
            "order": "score",
            "page": page,
            "request_id": req_id,
            "stat_device": "w",
            "n": 100, # 한 페이지당 최대 100개
            "stat_category_required": "1",
            "req_ref": "search",
            "version": "5"
        }
        
        print(f"[진행] {page+1}/{max_page} 페이지 수집 중...")
        
        try:
            resp = requests.get(url, params=params, headers=headers, timeout=10)
            
            if resp.status_code != 200:
                print(f"[오류] 응답 실패 ({resp.status_code}): {resp.text}")
                break
                
            data = resp.json()
            items = data.get("list", [])
            
            if not items:
                print("[알림] 더 이상 검색 결과가 없음.")
                break

            for item in items:
                # [수정] 광고 상품(AD)인 경우 수집하지 않고 건너뜀
                if item.get("ad") is True:
                    continue

                # 이미지 URL 처리
                raw_img = item.get("product_image", "")
                clean_img = raw_img.replace("{res}", "600") if raw_img else ""
                
                results.append({
                    "pid": item.get("pid"),
                    "상품명": item.get("name"),
                    "가격": item.get("price"),
                    "이미지URL": clean_img,
                    "태그": item.get("tag"),
                    "상태": item.get("status"),
                    "업데이트시간": item.get("update_time"),
                    "지역": item.get("location")
                })
            
            # IP 차단 방지를 위한 랜덤 지연 (필수)
            time.sleep(random.uniform(2.0, 4.0))

        except Exception as e:
            print(f"[에러] 실행 중 문제 발생: {e}")
            break

    return results

# --- 메인 실행부 ---
if __name__ == "__main__":
    SEARCH_KEYWORD = "나이키"
    PAGE_COUNT = 2 # 수집할 페이지 수
    
    data_list = get_bunjang_data(SEARCH_KEYWORD, PAGE_COUNT)

    if data_list:
        df = pd.DataFrame(data_list)
        
        # CSV 저장 (엑셀 한글 깨짐 방지를 위해 utf-8-sig 사용)
        file_name = f"bunjang_{SEARCH_KEYWORD}_results.csv"
        df.to_csv(file_name, index=False, encoding="utf-8-sig")
        
        print("-" * 30)
        print(f"수집 성공! 총 {len(df)}개 데이터 확보")
        print(f"파일 경로: {os.path.abspath(file_name)}")
        print("-" * 30)
    else:
        print("수집된 데이터가 없음. 다시 시도할 것.")