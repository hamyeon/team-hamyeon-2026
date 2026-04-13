import argparse
from pathlib import Path

import pandas as pd

from browser import create_driver
from config import OUTPUT_DIR
from search_crawler import SearchCrawler
from transaction_crawler import TransactionCrawler

from datetime import datetime
import re


def run_search(driver, keyword: str, max_items: int, output_file: str):
    crawler = SearchCrawler(driver)
    records = crawler.search(keyword=keyword, max_items=max_items)
    df = pd.DataFrame(records)
    out_path = Path(output_file)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(out_path, index=False, encoding="utf-8-sig")
    print(f"\n검색 결과 저장 완료: {out_path}")
    print(df.head(20).to_string(index=False))


def run_transactions(driver, input_csv: str, output_file: str, tab_name: str):
    crawler = TransactionCrawler(driver)
    crawler.ensure_manual_login()

    df = pd.read_csv(input_csv)
    if "product_url" not in df.columns:
        raise ValueError("입력 CSV에 product_url 컬럼이 있어야 합니다.")

    all_rows = []

    for idx, product_url in enumerate(df["product_url"].dropna().tolist(), start=1):
        print(f"[{idx}/{len(df)}] 수집 중: {product_url}")
        try:
            rows = crawler.collect_for_url(product_url=product_url, tab_name=tab_name)
            print(f"  -> {len(rows)}건 수집")
            all_rows.extend(rows)
        except Exception as e:
            print(f"  -> 실패: {e}")

    out_df = pd.DataFrame(all_rows).drop_duplicates()
    out_path = Path(output_file)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_df.to_csv(out_path, index=False, encoding="utf-8-sig")

    print(f"\n거래 데이터 저장 완료: {out_path}")
    if not out_df.empty:
        print(out_df.head(20).to_string(index=False))


def slugify_filename(text: str) -> str:
    text = re.sub(r"\s+", "", text)
    text = re.sub(r'[\\/:"*?<>|]+', "", text)
    return text[:30] if text else "result"


def make_search_output_path(keyword: str) -> str:
    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    keyword_slug = slugify_filename(keyword)
    return str(OUTPUT_DIR / f"search_{ts}_{keyword_slug}.csv")


def make_transactions_output_path(tab_name: str) -> str:
    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    tab_slug = slugify_filename(tab_name)
    return str(OUTPUT_DIR / f"transactions_{ts}_{tab_slug}.csv")


def main():
    parser = argparse.ArgumentParser()
    sub = parser.add_subparsers(dest="command", required=True)

    search_parser = sub.add_parser("search")
    search_parser.add_argument("--keyword", required=True)
    search_parser.add_argument("--max-items", type=int, default=50)
    search_parser.add_argument(
        "--output",
        default=None,
    )

    txn_parser = sub.add_parser("transactions")
    txn_parser.add_argument(
        "--input",
        required=True,
        help="product_url 컬럼이 있는 CSV 경로",
    )
    txn_parser.add_argument(
        "--output",
        default=None,
    )
    txn_parser.add_argument(
        "--tab",
        default="체결 거래",
        choices=["체결 거래", "판매 입찰", "구매 입찰"],
    )

    args = parser.parse_args()

    driver = create_driver()
    try:
        if args.command == "search":
            search_output = args.output or make_search_output_path(args.keyword)
            run_search(
                driver=driver,
                keyword=args.keyword,
                max_items=args.max_items,
                output_file=search_output,
            )
        elif args.command == "transactions":
            txn_output = args.output or make_transactions_output_path(args.tab)
            run_transactions(
                driver=driver,
                input_csv=args.input,
                output_file=txn_output,
                tab_name=args.tab,
            )
    finally:
        input("\n브라우저를 닫으려면 Enter를 누르세요: ")
        driver.quit()


if __name__ == "__main__":
    main()