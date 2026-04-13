import re
from typing import Optional


def normalize_text(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


def extract_product_id(url: str) -> Optional[str]:
    m = re.search(r"/products/(\d+)", url)
    return m.group(1) if m else None


def extract_money(text: str) -> Optional[str]:
    m = re.search(r"[\d,]+원", text)
    return m.group(0) if m else None


def extract_count(label: str, text: str) -> Optional[str]:
    m = re.search(rf"{label}\s*([0-9\.,만천]+)", text)
    return m.group(1) if m else None


def parse_search_card(raw_text: str, product_url: str) -> dict:
    text = normalize_text(raw_text)

    price = extract_money(text)
    interest_count = extract_count("관심", text)
    review_count = extract_count("리뷰", text)
    trade_count = extract_count("거래", text)

    title_part = text
    if price:
        title_part = title_part.split(price)[0].strip()

    return {
        "product_url": product_url,
        "product_id": extract_product_id(product_url),
        "raw_card_text": text,
        "title_guess": title_part if title_part else None,
        "current_price": price,
        "interest_count": interest_count,
        "review_count": review_count,
        "trade_count": trade_count,
    }


def extract_model_number_from_page_text(text: str) -> Optional[str]:
    m = re.search(r"모델번호\s*([A-Z0-9\-]+)", text)
    return m.group(1) if m else None


def extract_release_date_from_page_text(text: str) -> Optional[str]:
    m = re.search(r"발매일\s*([0-9/.-]+)", text)
    return m.group(1) if m else None


def is_price_token(token: str) -> bool:
    return re.fullmatch(r"[\d,]+원", token) is not None


def is_time_token(token: str) -> bool:
    return (
        ("전" in token)
        or bool(re.fullmatch(r"\d{2}/\d{2}", token))
        or bool(re.fullmatch(r"\d{2}/\d{2}/\d{2}", token))
        or bool(re.fullmatch(r"\d{4}-\d{2}-\d{2}", token))
        or bool(re.fullmatch(r"\d{2}\.\d{2}\.\d{2}", token))
    )


def is_option_token(token: str) -> bool:
    token = token.strip()
    if not token:
        return False
    if token in {
        "옵션", "거래가", "거래일",
        "체결 거래", "판매 입찰", "구매 입찰",
        "거래 내역 더보기", "로그인",
    }:
        return False
    if is_price_token(token) or is_time_token(token):
        return False
    if len(token) > 20:
        return False
    return True


def parse_transaction_rows_from_lines(lines: list[str]) -> list[dict]:
    """
    전체 페이지 텍스트에서
    옵션 / 거래가 / 거래일 패턴을 찾아 행으로 변환합니다.
    """
    rows = []

    start_idx = None
    for i in range(len(lines) - 2):
        if lines[i] == "옵션" and lines[i + 1] == "거래가" and lines[i + 2] == "거래일":
            start_idx = i + 3
            break

    if start_idx is None:
        return rows

    stop_tokens = {
        "모든 시세는 로그인 후 확인 가능합니다.",
        "거래 내역 더보기",
        "고객센터",
        "이용안내",
        "자주 묻는 질문",
    }

    i = start_idx
    while i < len(lines) - 2:
        if lines[i] in stop_tokens:
            break

        option_candidate = lines[i]
        price_candidate = lines[i + 1]
        time_candidate = lines[i + 2]

        if (
            is_option_token(option_candidate)
            and is_price_token(price_candidate)
            and is_time_token(time_candidate)
        ):
            rows.append(
                {
                    "size_option": option_candidate,
                    "price": price_candidate,
                    "trade_time": time_candidate,
                }
            )
            i += 3
        else:
            i += 1

    return rows