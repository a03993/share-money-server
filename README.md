# ShareMoney Server

This is the backend server for [ShareMoney](https://github.com/a03993/share-money-app), a simple and fun web app to split group expenses and calculate settlements fairly.

> 💡 Built with **Node.js**, **Express**, and **MongoDB**.  
> 🔧 This server provides RESTful APIs for managing users, expenses, settlements, and links.


## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Overview](#api-overview)
- [Author](#author)

## Features

- Create and manage users in a shared link
- Add expenses and split them with selected people
- Automatically calculate settlements
- Mark settlements as done, preventing further edits
- Link expiration support to auto-disable editing
- Protected from updates after final settlement

## 🛠 Tech Stack

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![REST API](https://img.shields.io/badge/REST_API-007ACC?style=for-the-badge)](https://restfulapi.net/)

- **Backend Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Utilities:** dotenv, nodemon
- **Architecture:** MVC + RESTful API

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/a03993/share-money-server.git
cd share-money-server
# 2. Install dependencies
npm install
# 3. Configure environment variables
# create a .env file based on .env.example:
PORT=5001
MONGODB_URI=mongodb+srv://a03993a:fkf3TsiudexQs7J7@cluster.gaol3ny.mongodb.net/
# 4. Start the server
nodemon app.js
```

## API Overview

| Method   | Endpoint                        | Description                                       |
|----------|---------------------------------|---------------------------------------------------|
| `GET`    | `/links/:linkId`                | 取得特定分帳連結的資訊                               |
| `POST`   | `/links`                        | 建立一個新的分帳連結                               |
| `GET`    | `/users/:linkId`                | 取得該連結下所有使用者資料                         |
| `POST`   | `/users/:linkId`                | 新增使用者到指定連結                               |
| `GET`    | `/expenses/:linkId`             | 取得該連結下所有花費紀錄                           |
| `POST`   | `/expenses/:linkId`             | 新增一筆花費紀錄                                   |
| `DELETE` | `/expenses/:expenseId`          | 刪除指定的花費紀錄                                 |
| `GET`    | `/settlements/:linkId`          | 計算並取得該連結下的清算資訊（settlements）         |
| `PATCH`  | `/settlements/:settlementId`    | 更新指定清算的狀態（如：從 pending 改為 done）     |

You can test APIs using Postman. A frontend client is available here:

👉 [Frontend Repo](https://github.com/a03993/share-money-app)

## Author

Tina Chiu [@a03993](https://github.com/a03993)

If you have any suggestions, questions, or feedback — feel free to open an issue or contribute!




