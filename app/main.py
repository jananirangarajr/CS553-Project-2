from bson import ObjectId
import db_connect
from fastapi import FastAPI
from fastapi.responses import JSONResponse
import car
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
database_obj = db_connect.DatabaseInitialize()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/cars/{car_id}")
async def get_car_details(car_id: str):
    result = db_connect.get_car_details(database_obj, '_id', ObjectId(car_id))
    for doc in result:
        doc["_id"] = str(doc["_id"])
        return JSONResponse(content={"result": doc}, status_code=200)
    return JSONResponse(content={"message": "No car found maching the given ID"}, status_code=400)

@app.get("/cars")
async def get_all_car_details():
    result = db_connect.get_all_car_details(database_obj)
    return JSONResponse(content={"message": "success","result":result}, status_code=200)


@app.post("/cars")
async def add_car_details(car : car.Cars):
    result = db_connect.insert(database_obj, dict(car))
    if result is not "":
        return JSONResponse(content={"message": "success","id":result}, status_code=200)
    else:
        return JSONResponse(content={"message": "failed"}, status_code=400)

@app.put("/cars/{car_id}")
async def update_car_details(car_id: str, car : car.ModifiedCar):
    result = db_connect.update_car_details(database_obj, car_id, dict(car))
    if result:
        return JSONResponse(content={"result": "success"}, status_code=200)
    else:
        return JSONResponse(content={"message": "failed"}, status_code=400)

@app.delete("/cars/{car_id}")
async def delete_car_details(car_id:str):
    result = db_connect.delete_document(database_obj, ObjectId(car_id))
    if result:
        return JSONResponse(content={"result": "success"}, status_code=200)
    else:
        return JSONResponse(content={"message": "failed"}, status_code=400)

@app.post("/cars/order")
async def get_order_details(part_number:str):
    result = db_connect.get_order_details(part_number)
    if result:
        return JSONResponse(content={"message": "success","result": result}, status_code=200)
    else:
        return JSONResponse(content={"message": "failed"}, status_code=400)
