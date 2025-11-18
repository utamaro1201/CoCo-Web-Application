from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---- 受け取るデータ形式を変更 ----
class AnswerData(BaseModel):
    base: str
    toppings: list[str]

@app.post("/api/answers")
def receive_answers(data: AnswerData):
    print(f"ベース: {data.base}")
    print(f"トッピング: {data.toppings}")
    return {"status": "ok", "received": data.model_dump()}
