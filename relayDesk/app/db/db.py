from sqlalchemy import create_engine, text


engine = create_engine("postgresql+psycopg://@localhost:5432/relaydesk_db")

def db_connection():
    with engine.connect() as conn:
        result = conn.execute(text("SELECT current_database()"))
        print(result.scalar())
        
