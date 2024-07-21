import requests
import time
import subprocess
from geopy.geocoders import Nominatim

def getCoordinates():
    try:
        response = requests.post('http://localhost:3000/get-location')
        response.raise_for_status()
        data = response.json()
        return data.get('latitude'), data.get('longitude')
    except Exception as e:
        print(f"Error fetching coordinates: {e}")
        return None, None


def Glocation(latitude, longitude):
    geolocator = Nominatim(user_agent="CommsLogger")
    try:
        location = geolocator.reverse((latitude, longitude))
        if location:
            location_data = {
                'address': location.address,
                'latitude': location.latitude,
                'longitude': location.longitude
            }
            response = requests.post('http://localhost:3000/data', json=location_data)
            print('Server response:', response.text)
            return location_data
        else:
            print('No location found.')

    except Exception as e:
        print(f'Error occurred: {e}')

    while True:
        latitude, longitude = getCoordinates()
        if latitude and longitude:
            Glocation(latitude, longitude)
            time.sleep(30) 

  




