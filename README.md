# OpenRouter Chat

**OpenRouter Chat** is a web application that supports GPT-3.5 and xAI Grok 4 models, offering both text and multimodal (image + text) chat experiences. It is built with React for the frontend and Node.js/Express for the backend. OpenTelemetry is integrated for backend tracing, with Zipkin as the telemetry backend.

---

## ⚡ Features

- Multimodel support:
    - **GPT-3.5**: Text-only chat
    - **xAI Grok 4**: Multimodal chat (text + images)
- Chat management:
    - Create new chats
    - Edit chat names
    - Delete chats
    - Search and filter chats
- Image upload and sending
- Backend tracing using OpenTelemetry
- Telemetry visualization via Zipkin
- LocalStorage for persisting chat history

---

## 🛠️ Technologies

| Layer         | Technology                 | Description                                  |
|---------------|----------------------------|----------------------------------------------|
| Frontend      | React 19                   | Modern React web app                          |
| UI            | Material-UI (MUI)          | Responsive, ready-to-use components          |
| State         | useState, useEffect,useRef | React hooks for state management             |
| Backend       | Node.js 22, Express 5      | REST API server                               |
| API Client    | Axios                      | Calls OpenRouter GPT-3.5 & Grok APIs         |
| Telemetry     | OpenTelemetry, Zipkin      | Tracing and performance monitoring           |
| Storage       | LocalStorage               | Stores chat history in the browser           |
| Images        | Base64 resizing            | Optimizes image uploads (max 512px)          |
| Env Variables | dotenv                     | API keys and configuration                    |

---

## Setup

Clone the repo:
```bash
  git clone https://github.com/cagribuyuk/openrouter_chat.git
  cd openrouter_chat
```

### Zipkin
```bash
  docker-compose up -d
```
Zipkin  UI will be available at localhost:9411.

### Backend
1. Enter your OpenRouter API Key in the .env file
```bash
  OPENROUTER_API_KEY=<YOUR-KEY>
```
2. Install dependencies and start the server:
```bash
  cd backend
  npm install
  npm run start
```
### Frontend
1. Enter your Backend URL in the .env file. Default port configured to 3001.
If you want to change the port, you also need to change the backend/.env PORT value.
```bash
  VITE_SERVER_API_URL=<YOUR-BACKEND-URL>
```
2. Install dependencies and start the server:
```bash
  cd frontend
  npm install
  npm run dev
  
```

