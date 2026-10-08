from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI()

def run_agent(prompt: str) -> str:
    response = client.responses.create(
        model = "gpt-6-luna",
        input = prompt
    )
    return response.output_text