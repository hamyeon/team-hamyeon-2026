from selenium import webdriver
from selenium.webdriver.chrome.options import Options

from config import CHROME_USER_DATA_DIR, HEADLESS


def create_driver() -> webdriver.Chrome:
    options = Options()

    options.add_argument("--start-maximized")
    options.add_argument(f"--user-data-dir={CHROME_USER_DATA_DIR}")
    options.add_argument("--lang=ko-KR")
    options.add_argument(
        "user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/131.0.0.0 Safari/537.36"
    )

    if HEADLESS:
        options.add_argument("--headless=new")

    driver = webdriver.Chrome(options=options)
    return driver