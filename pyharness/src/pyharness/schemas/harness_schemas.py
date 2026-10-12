from datetime import datetime
from pydantic import BaseModel
from uuid import UUID, uuid4
class Task(BaseModel):
    id: str
    prompt: str
    expected: str
    
class Result(BaseModel):
    task_id: str
    run_id: UUID
    timestamp: datetime
    model: str
    prompt: str
    agent_output: str
    expected_output: str
    passed: bool
    score: float

