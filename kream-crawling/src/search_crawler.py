import time
from urllib.parse import quote

from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from config import DEFAULT_WAIT_SEC, SEARCH_SCROLL_PAUSE, SEARCH_SCROLL_ROUNDS
from parsers import parse_search_card


class SearchCrawler:
    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, DEFAULT_WAIT_SEC)

    def search(self, keyword: str, max_items: int = 50) -> list[dict]:
        url = f"https://kream.co.kr/search?keyword={quote(keyword)}"
        self.driver.get(url)
        self.wait.until(EC.presence_of_element_located((By.TAG_NAME, "body")))

        last_count = 0
        stable_rounds = 0

        for _ in range(SEARCH_SCROLL_ROUNDS):
            items = self._collect_anchor_data()
            current_count = len(items)

            if current_count == last_count:
                stable_rounds += 1
            else:
                stable_rounds = 0
                last_count = current_count

            if current_count >= max_items or stable_rounds >= 2:
                break

            self.driver.execute_script("window.scrollBy(0, window.innerHeight * 0.9);")
            time.sleep(SEARCH_SCROLL_PAUSE)

        items = self._collect_anchor_data()

        records = []
        seen = set()

        for item in items:
            href = item["href"]
            text = item["text"]

            if href in seen:
                continue
            seen.add(href)

            parsed = parse_search_card(text, href)
            parsed["keyword"] = keyword
            records.append(parsed)

            if len(records) >= max_items:
                break

        return records

    def _collect_anchor_data(self) -> list[dict]:
        script = """
        return [...document.querySelectorAll('a[href]')]
          .map(a => ({ href: a.href, text: (a.innerText || '').trim() }))
          .filter(x => /\\/products\\/\\d+$/.test(x.href));
        """
        return self.driver.execute_script(script)