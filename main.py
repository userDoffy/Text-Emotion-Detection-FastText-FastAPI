from fastapi import FastAPI,Form
from fastapi import Request
from fastapi.responses import JSONResponse
from fastapi.responses import HTMLResponse
import uvicorn 
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import fasttext

model=fasttext.load_model('models/all_train_fastText.bin')
app=FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get("/",response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/")
async def getemotion(request: Request,text:str=Form(...)):
    ans=model.predict(text.strip())
    label=ans[0][0].removeprefix("__label__")
    prob=round(ans[1][0],2)
    return{
        "label":label,
        "prob":prob*100
    }

if __name__=="__main__":
    uvicorn.run(app,port=8000,host="localhost")