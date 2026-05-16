# Campus Lost & Found System

## Problem Description
Students lose items daily on campus with no central system to report or recover them.

## Solution
A RESTful API backend allowing students to report lost/found items, search for them, and mark them as claimed.

## Features
- Report lost or found items
- View all reported items
- Update item status (claimed)
- Delete resolved reports

## Technologies
Node.js, Express.js, MongoDB, Mongoose, Postman, React.js

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/items/report | Report an item |
| GET | /api/items/all | Get all items |
| GET | /api/items/:id | Get item by ID |
| PUT | /api/items/update/:id | Update item |
| DELETE | /api/items/delete/:id | Delete item |

## Setup
1. Clone the repo
2. Run `npm install`
3. Create `.env` with your MongoDB URL
4. Run `npm start`
