import time
from datetime import datetime

from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from config import DEFAULT_WAIT_SEC, TXN_SCROLL_PAUSE, TXN_SCROLL_ROUNDS
from parsers import (
    extract_model_number_from_page_text,
    extract_release_date_from_page_text,
    normalize_text,
    parse_transaction_rows_from_lines,
)


class TransactionCrawler:
    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, DEFAULT_WAIT_SEC)

    def ensure_manual_login(self):
        self.driver.get("https://kream.co.kr/login")
        self.wait.until(EC.presence_of_element_located((By.TAG_NAME, "body")))
        print("\n브라우저에서 직접 로그인하세요.")
        input("로그인이 완료되면 Enter를 누르세요: ")

    def collect_for_url(self, product_url: str, tab_name: str = "체결 거래") -> list[dict]:
        self.driver.get(product_url)
        self.wait.until(EC.presence_of_element_located((By.TAG_NAME, "body")))
        time.sleep(2)

        self._try_open_full_history_panel()
        self._try_click_text(tab_name)

        records = {}
        same_count_rounds = 0
        previous_total = 0

        for _ in range(TXN_SCROLL_ROUNDS):
            page_text = normalize_text(self.driver.find_element(By.TAG_NAME, "body").text)
            lines = [x.strip() for x in page_text.split(" ") if x.strip()]

            # body.text 기반이므로 줄 정보가 뭉개질 수 있어 innerText로 다시 받음
            body_inner_text = self.driver.execute_script(
                "return document.body ? document.body.innerText : '';"
            )
            raw_lines = [x.strip() for x in body_inner_text.splitlines() if x.strip()]

            model_number = extract_model_number_from_page_text(body_inner_text)
            release_date = extract_release_date_from_page_text(body_inner_text)
            rows = parse_transaction_rows_from_lines(raw_lines)

            collected_at = datetime.now().isoformat(timespec="seconds")

            for row in rows:
                key = (
                    product_url,
                    tab_name,
                    row["size_option"],
                    row["price"],
                    row["trade_time"],
                )
                records[key] = {
                    "product_url": product_url,
                    "tab_name": tab_name,
                    "model_number": model_number,
                    "release_date": release_date,
                    "size_option": row["size_option"],
                    "price": row["price"],
                    "trade_time": row["trade_time"],
                    "collected_at": collected_at,
                }

            current_total = len(records)
            if current_total == previous_total:
                same_count_rounds += 1
            else:
                same_count_rounds = 0
                previous_total = current_total

            if same_count_rounds >= 3:
                break

            moved = self._scroll_best_container()
            time.sleep(TXN_SCROLL_PAUSE)

            if not moved and same_count_rounds >= 1:
                break

        return list(records.values())

    def _try_open_full_history_panel(self):
        # 현재 페이지에는 "거래 내역 더보기" 문구가 존재합니다.
        self._try_click_text("거래 내역 더보기")
        time.sleep(1)

    def _try_click_text(self, target_text: str) -> bool:
        script = """
        const target = arguments[0];
        const nodes = [...document.querySelectorAll('button, a, div, span')];
        for (const el of nodes) {
          const text = (el.innerText || '').trim();
          const style = window.getComputedStyle(el);
          const visible = el.offsetParent !== null && style.visibility !== 'hidden' && style.display !== 'none';
          if (visible && text === target) {
            el.click();
            return true;
          }
        }
        return false;
        """
        try:
            return bool(self.driver.execute_script(script, target_text))
        except Exception:
            return False

    def _scroll_best_container(self) -> bool:
        script = """
        const candidates = [...document.querySelectorAll('*')]
          .filter(el => {
            const s = getComputedStyle(el);
            const visible = el.offsetParent !== null && s.visibility !== 'hidden' && s.display !== 'none';
            const scrollable = (s.overflowY === 'auto' || s.overflowY === 'scroll');
            return visible && scrollable && el.scrollHeight > el.clientHeight + 50 && el.clientHeight > 150;
          })
          .sort((a, b) => (b.scrollHeight - b.clientHeight) - (a.scrollHeight - a.clientHeight));

        if (candidates.length > 0) {
          const el = candidates[0];
          const before = el.scrollTop;
          el.scrollTop = el.scrollTop + Math.max(400, el.clientHeight * 0.8);
          return el.scrollTop !== before;
        }

        const beforeY = window.scrollY;
        window.scrollBy(0, window.innerHeight * 0.8);
        return window.scrollY !== beforeY;
        """
        try:
            return bool(self.driver.execute_script(script))
        except Exception:
            return False