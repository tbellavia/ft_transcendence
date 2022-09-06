import requests

usernames = [
    "bbellavi", "eassouli", 
    "lvirgini", "mvo-van-", 
    "alelaval", "lperson-",
    "anclarma", "plam"]

BASE_URL = "http://localhost:3000/api/v1"

def populate_users():
    try:
        for username in usernames:
            response = requests.post(f"{BASE_URL}/users", data={
                "username" : username
            })

            if response.ok:
                print(f"User {username} created")
    except Exception as e:
        print(e)

def populate_stats():
    try:
        for username in usernames:
            response = requests.post(f"{BASE_URL}/users/{username}/stats")

            if response.ok:
                print(f"Stats for {username} created")
    except Exception as e:
        print(e)