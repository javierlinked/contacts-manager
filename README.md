# Instructions

## Installation

If docker is installed run:
```
docker compose up 
```
In case it is not installed two terminals should be opened:
**1st terminal:**
```
cd backend
npm i
npm run start
```
**2nd terminal:**
```
cd frontend
npm i
npm run start
```

Open a browser and navigate to:
- http://localhost:3000/

User pasword is `123456`
File db file is located in `/backend/storage/db.json.enc` and it's encrypted with aes-256-gcm.
Both password and encryption key can be configurable through a secrets provider or environment variables, but they have been hardcoded for simplicity.

## Consideration

This system is single-user, "contact managers found in many smart phones and operating systems". Also performance could improve with certain patterns.