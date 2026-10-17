from fastapi import FastAPI, HTTPException, status
from datetime import datetime, timezone
from sqlalchemy import select
from sqlalchemy.orm import Session
import uvicorn


from db.db_schema import User
from db.db import engine
from schemas.user import CreateUser

app = FastAPI()


@app.get("/", status_code=status.HTTP_200_OK)
async def root():
    return {
        "message": "Server Running",
        "timestamp": datetime.now(timezone.utc)
        }


@app.get("/users")
async def get_users():
    with Session(engine) as session:
        users = session.scalars(select(User)).all()
        return users
    

@app.get("/users/{id}", 
         status_code=status.HTTP_200_OK, 
         responses={
            404: {"description": "User not found"}
        }
)
def get_user_by_id(id: int):
    with Session(engine) as session:
        user = session.get(User, id)
        if user is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User id not found")
        return user 
    

@app.post("/users", status_code=status.HTTP_201_CREATED)
def create_user(user: CreateUser) -> CreateUser:
    with Session(engine) as session:
        db_user = User(username=user.username)
        session.add(db_user)
        session.commit()
        session.refresh(db_user)
        return CreateUser(username=db_user.username)
    
        
    
def run_server():
    uvicorn.run("routers.server:app", host="127.0.0.1", port=8000, log_level="info", reload=True)