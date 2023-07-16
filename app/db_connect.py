from bson import ObjectId
from pymongo import MongoClient
import os
import requests
import xml.etree.ElementTree as ET

class DatabaseInitialize:
    container_name = os.environ.get('MONGODB_CONTAINER_NAME')
    print(f"Container name :{container_name}")
    # container_name = 'localhost'

    client = MongoClient(f'mongodb://{container_name}:27017')

    db = client['car-shop']

    collection = db['mike']
    id = 1;

def insert(db_object,car_details):
    result = db_object.collection.insert_one(car_details)
    if result.acknowledged:
        return str(result.inserted_id)
    else:
        return ""

def get_all_car_details(db_object):
    cars = []
    result = db_object.collection.find()
    for doc in result:
        doc["_id"] = str(doc["_id"])
        key = doc["_id"]
        cars.append(doc)
    return cars
def get_car_details(db_object, field ,value):
    return db_object.collection.find({field:value})

def update_car_details(db_object, objectID, details):
    try:
        result = db_object.collection.update_one({'_id':ObjectId(objectID)},{'$set':details})
        if result.modified_count > 0:
            return True;
        else:
            return False;
    except Exception as e:
        print(e)

def delete_document(db_object, value):
    result = db_object.collection.delete_one({'_id':value})
    if result.deleted_count > 0:
        return True
    else:
        return False

def close_connection(db_object):
    db_object.client.close()


def get_order_details(part_number):
    order_container = os.environ.get('ORDER_CONTAINER_NAME')
    url = "http://"+order_container+":8001/wsdl"

    # structured XML
    payload = """
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
       <soapenv:Header/>
           <soapenv:Body>
              <tem:OrderingRequest>
                 <tem:part_number>12345</tem:part_number>
              </tem:OrderingRequest>
           </soapenv:Body>
    </soapenv:Envelope>
    """
    # headers
    headers = {
        'Content-Type': 'text/xml; charset=utf-8'
    }
    # POST request
    response = requests.request("POST", url, headers=headers, data=payload)
    print(response)
    print(response.text)
    root = ET.fromstring(response.text)
    date_element = root.find(".//{http://tempuri.org/}Date")
    price_element = root.find(".//{http://tempuri.org/}Price")

    # Extract the text values from the elements
    date = date_element.text
    price = price_element.text
    result = {"date": date, "price": price}
    return result