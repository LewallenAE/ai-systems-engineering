import json
from pathlib import Path


# Decouple the file path
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_FILE = BASE_DIR / "data" / "data.json"

from .agent_import import run_agent
from .agent_grader import task_grader
from .agent_passed import task_passed
from schemas.harness_schemas import Result



# open the data from file-path with correct encoding
with open(DATA_FILE, "r", encoding="utf-8") as f:
    tasks = json.load(f)



# loop through json data
def run_tasks():
    results = []
    
    for task in tasks:
        output = run_agent(task["prompt"])
        score = task_grader(output, task["expected"])
        passed = task_passed(score)
        
        result = Result(
            task_id = task["id"],
            prompt = task["prompt"],
            agent_output = output,
            expected_output = task["expected"],
            passed = passed,
            score = score
        )
        results.append(result)
    return results


        