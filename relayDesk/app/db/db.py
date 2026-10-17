from sqlalchemy import create_engine, text
import psycopg

engine = create_engine(f"postgresql+psycopg://lewal:password@localhost:5432/relaydesk_db")

def db_connection():
    with engine.connect() as conn:
        result = conn.execute(text("SELECT current_database()"))
        print(result.scalar())
        
