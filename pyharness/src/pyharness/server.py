from datetime import datetime, timezone
from fastapi import FastAPI, status
from .schemas.harness_schemas import Result, Task
from .harness.task_runner import run_tasks
import uvicorn

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Server running"}

@app.get("/health", status_code=status.HTTP_200_OK)
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now(timezone.utc)
    }

@app.post("/evaluations")
async def create_evaluation(task: Task):
    
    return {
        "task_id": task.id,
        "prompt": task.prompt,
        "expected": task.expected
    }
    
def run_server():
    uvicorn.run("pyharness.server:app", host="127.0.0.1", port=8000, reload=True)