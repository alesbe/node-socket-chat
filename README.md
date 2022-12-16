# Socket chat 💬
Online chat made with [NodeJS](https://nodejs.org/en/), [Express](https://expressjs.com/es/) y [socket.io](https://socket.io/)

_Note: The UI it's a template, I made the backend and implemented the template to send and recieve messages!_

![chat](https://i.imgur.com/aCH9c4s.png)

## Features 🌟
- Unique chat rooms
- Name identification by dynamic IDs
- Server broadcasts of users entering and leaving the rooms
- List of connected users
- Emoji support

## Images 🖼️

### Landing page
![entrada](https://i.imgur.com/bFWT1Ib.png)

### PC view
![chat](https://i.imgur.com/aCH9c4s.png)

### Smartphone view
![smartphone](https://i.imgur.com/JzAhPEB.png)

## Install 🛠️

### Docker 🐋
#### 1.- Build the image
```docker build -t alesbe/socket-chat:1.0 .```

#### 2.- Run it
```docker run --name socket-chat -p 8000:8000 alesbe/socket-chat:1.0```

### Manual installation 🔨
Install dependencies:
```
npm install
```

Start app:
```
npm start
```

or

```
node server/server
```
