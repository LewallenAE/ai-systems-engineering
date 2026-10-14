from fastapi import FastAPI, status
from datetime import datetime, timezone
from sqlalchemy import select
from sqlalchemy.orm import Session
import uvicorn


from db.db_schema import User
from db import db

app = FastAPI()

@app.get("/", status_code=status.HTTP_200_OK)
async def root():
    return {
        "message": "Server Running",
        "timestamp": datetime.now(timezone.utc)
        }

@app.get("/users")
def get_users():
    with Session(db.engine) as session:
        users = session.scalars(select(User)).all()
        return users 
    
def run_server():
    uvicorn.run("routers.server:app", host="127.0.0.1", port=8000, log_level="info", reload=True)