# nodejs-crud-project
# User Management REST API

A simple REST API built using Node.js and Express.js that performs CRUD operations on user data stored in a JSON file.

## Features
- Create, Read, Update, Delete users
- Express middleware usage
- REST API structure
- JSON file used as database

## Technologies Used
- Node.js
- Express.js
- JavaScript
- JSON (File-based storage)
- File System (fs)
- Postman

## API Endpoints

| Method | Endpoint | Description |
|------|---------|------------|
| GET | /api/users | Get all users |
| GET | /api/users/:id | Get user by ID |
| POST | /api/users | Create new user |
| PATCH | /api/users/:id | Update user |
| DELETE | /api/users/:id | Delete user |

## How to Run
```bash
npm install
node index.js
