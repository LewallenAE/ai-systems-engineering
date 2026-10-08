from pydantic import BaseModel

class Task(BaseModel):
    id: str
    prompt: str
    expected: str
    
class Result(BaseModel):
    task_id: str
    output: str
    passed: bool
    score: float

