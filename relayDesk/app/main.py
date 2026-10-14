from routers.server import run_server
from db.db import db_connection

def main():
    db_connection()
    run_server()
    


if __name__ == "__main__":
    main()
