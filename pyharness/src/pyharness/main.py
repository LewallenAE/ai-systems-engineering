import sys
from pathlib import Path
from openai import OpenAI

script_dir = Path(__file__).resolve().parent
target_dir = script_dir.parent.parent

if str(target_dir) not in sys.path:
    sys.path.append(str(target_dir))
    
from dotenv import load_dotenv

load_dotenv()

client = OpenAI()
cli_input = input(">> ")

response = client.responses.create(
    model="gpt-6-luna",
    input = cli_input,
)


print(response.output_text)