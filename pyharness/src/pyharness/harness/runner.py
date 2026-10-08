from pathlib import Path
import json

# Decouple the file path
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_FILE = BASE_DIR / "data" / "data.json"

from .agent import run_agent

# open the data from file-path with correct encoding
with open(DATA_FILE, "r", encoding="utf-8") as f:
    tasks = json.load(f)

# loop through json data
def run_tasks():
    for task in tasks:
        output = run_agent(task["prompt"])
        print(output)