## USER AUTHENTICATION and Authorization REST API 

###  Introduction

![](https://ocw.cs.pub.ro/courses/_media/se/labs/3-tier-architecture.png?w=600&tok=fa6eda)

The API's server-side is built with Express.js Framework of Node.js and
client-side is built with Vue.js Framework. MongoDB using to store user
information and notes.

### Requirements

* MongoDB
* Node

### Instructions

* Clone the repository.
  ```bash
    git clone https://github.com/3n0ugh/User-Authentication-Authorization.git
  ```
* Move to the server folder and install npm packages for server.
  ```bash
    npm install
  ```
* Creating a .env file in the server folder.
  ```bash
    touch .env
  ```
  * Then create a TOKEN_SECRET using letters, numbers, and symbols.
    ```bash
      TOKEN_SECRET=kwqejnrlkqwe%423%@$^klsd;flka1
    ```
* Run server
  ```bash
    npm start
  ```
* Move to the client folder and install npm packages for the client.
  ```bash
    npm install
  ```
* Run client
  ```bash
    npm run serve
  ```
* Now, you can test the [website](http://localhost:8080/) .
  ```bash
    http://localhost:8080/
  ```
