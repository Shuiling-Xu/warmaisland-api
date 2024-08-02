import requests
from base64 import encodestring
with open("./yux/0.jpg.key","r") as f:
    r=requests.get("http://127.0.0.1:8081/refresh",headers={"data":f.read()})
    print(r.headers)