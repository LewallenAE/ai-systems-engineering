import json
from pathlib import Path

from .task_runner import run_tasks


def result_writer():
    run_output = run_tasks()

    current_file = Path(__file__).resolve()
    src_dir = current_file.parents[2]
    
    run_output_dir = src_dir / "data" / "results"
    run_output_file = run_output_dir / "eval_results.json"
    
    run_output_dir.mkdir(parents=True, exist_ok=True)
    
    serialized_Result = [item.model_dump() for item in run_output]
    
    with open(run_output_file, "w", encoding="utf-8") as f:
        json.dump(serialized_Result, f, indent=4)
        
    print(f"Results successfully written to: {run_output_file}")
    