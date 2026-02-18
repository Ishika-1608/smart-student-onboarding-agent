import requests
import os

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

def ask_ai(question, context):

    url = "https://api.groq.com/openai/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    prompt = f"""
    You are a Smart Student Onboarding Agent.

    Your job is to guide students step-by-step through onboarding.

    Rules:
    - Give short and clear answers.
    - If suggesting a task, explain WHY it should be done next.
    - Use deadlines and pending tasks to justify recommendations.
    - Sound helpful and professional.

    Student onboarding context:
    {context}

    Student question:
    {question}
    """

    data = {
        "model": "llama-3.1-8b-instant",
        "messages": [
            {"role": "user", "content": prompt}
        ]
    }

    response = requests.post(url, headers=headers, json=data)

    print("GROQ RESPONSE:", response.json())   # 👈 ADD THIS LINE

    result = response.json()

    if "choices" not in result:
        return "AI service error. Please check API key or request format."

    return result["choices"][0]["message"]["content"]
