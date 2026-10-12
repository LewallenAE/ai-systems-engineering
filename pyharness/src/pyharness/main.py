# from harness.task_runner import run_tasks, results
import json
from pathlib import Path
from .harness.task_runner import run_tasks
from .harness.result_writer import result_writer
from .schemas.harness_schemas import Task

BASE_DIR = Path(__file__).resolve().parent
DATA_FILE = BASE_DIR / "data" / "data.json"



def main():
   with open(DATA_FILE, "r", encoding="utf-8") as f:
      tasks = json.load(f)
      tasks = [Task.model_validate(t) for t in tasks]
      results = result_writer()
   return results

if __name__ == "__main__":
   main()