from datetime import datetime, timezone
from uuid import uuid4

from .agent_import import run_agent
from .agent_grader import task_grader
from .agent_passed import task_passed
from ..schemas.harness_schemas import Result, Task



# loop through json data
def run_tasks(tasks: list[Task]):
    results = []
    uuid = uuid4()
    
    for task in tasks:
        # task = Task.model_validate(raw_task) <--- not needed after refactor but kept as artifact
        
        output, model = run_agent(task.prompt)
        score = task_grader(output, task.expected)
        passed = task_passed(score)
        result = Result(
            task_id = task.id,
            run_id = uuid,
            timestamp = datetime.now(timezone.utc),
            model = model,
            prompt = task.prompt,
            agent_output = output,
            expected_output = task.expected,
            passed = passed,
            score = score
        )
        
        results.append(result)
    return results


        