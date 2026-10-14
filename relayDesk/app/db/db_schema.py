# from sqlalchemy import Integer, String, ForeignKey
from .db import engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"
    
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str]
    # email: Mapped[str]
    
Base.metadata.create_all(engine)