from datetime import datetime, timezone
from fastapi import FastAPI, status
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
    
    
def run_server():
    uvicorn.run("pyharness.server:app", host="127.0.0.1", port=8000, reload=True)