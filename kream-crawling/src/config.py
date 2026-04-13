from pathlib import Path
import os

from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

CHROME_USER_DATA_DIR = os.getenv(
    "CHROME_USER_DATA_DIR",
    str(BASE_DIR / "chrome_profile"),
)

HEADLESS = os.getenv("HEADLESS", "false").lower() == "true"
SEARCH_SCROLL_ROUNDS = int(os.getenv("SEARCH_SCROLL_ROUNDS", "8"))
SEARCH_SCROLL_PAUSE = float(os.getenv("SEARCH_SCROLL_PAUSE", "1.2"))
TXN_SCROLL_ROUNDS = int(os.getenv("TXN_SCROLL_ROUNDS", "40"))
TXN_SCROLL_PAUSE = float(os.getenv("TXN_SCROLL_PAUSE", "1.0"))
DEFAULT_WAIT_SEC = int(os.getenv("DEFAULT_WAIT_SEC", "15"))

OUTPUT_DIR = BASE_DIR / "data" / "output"
INPUT_DIR = BASE_DIR / "data" / "input"

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
INPUT_DIR.mkdir(parents=True, exist_ok=True)