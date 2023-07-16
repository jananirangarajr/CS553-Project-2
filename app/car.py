from pydantic import BaseModel, Field
from typing import Optional

class Cars(BaseModel):
    vin: str
    plate: str
    state: str
    model: str
    year: str
    owner_name: str
    owner_address: str
    owner_dl: str
    problem_description: str
    date_in: str
    date_out: str
    technician: str
    shop_id: str
    shop_name: str
    shop_city: str
    shop_state: str


class ModifiedCar(BaseModel):
    vin: Optional[str] = None
    plate: Optional[str] = None
    state: Optional[str] = None
    model: Optional[str] = None
    year: Optional[str] = None
    owner_name: Optional[str] = None
    owner_address: Optional[str] = None
    owner_dl: Optional[str] = None
    problem_description: Optional[str] = None
    date_in: Optional[str] = None
    date_out: Optional[str] = None
    technician: Optional[str] = None
    shop_id: Optional[str] = None
    shop_name: Optional[str] = None
    shop_city: Optional[str] = None
    shop_state: Optional[str] = None