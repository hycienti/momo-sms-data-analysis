
# MoMo SMS Data Analysis

A full-stack data analysis project for processing, analyzing, and visualizing SMS-based financial transaction data. The system extracts raw SMS data, parses and stores it in a SQLite database, exposes a Flask API for data retrieval, and visualizes the analytics on a modern web dashboard.

---

## 📂 Project Structure

```
momo-sms-data-analysis/
├── backend/           # Flask API + Data ingestion
│   ├── app.py         # Main Flask app with API routes
│   ├── Db_Config.py   # SQLite database connection config
│   ├── create_table.py # DB schema setup script
│   ├── truncate.py    # Utility to truncate database tables
│   ├── scripts.py     # XML data parsing and DB insertion logic
│   ├── modified_sms_v2.xml # Raw SMS dataset (XML format)
│   └── My_Database.db # SQLite database file (auto-generated after processing)
└── frontend/          # Pure HTML/JS dashboard using TailwindCSS & ApexCharts
    ├── index.html
    └── js/
        ├── main.js
        ├── utils/
        ├── components/
        └── data/
```

---

## ⚙ Backend Setup (Python Flask API)

### 1️⃣ Prerequisites

- Python 3.9+ installed
- Git installed

### 2️⃣ Clone the repository

```bash
git clone https://github.com/hycienti/momo-sms-data-analysis.git
cd momo-sms-data-analysis/backend
```

### 3️⃣ (Recommended) Create Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate  # For Linux/MacOS
venv\Scripts\activate   # For Windows
```

### 4️⃣ Install Dependencies

```bash
pip install flask flask-cors
```

### 5️⃣ Create Database Schema

First, generate the SQLite database:

```bash
python create_table.py
```

### 6️⃣ Load Raw XML Data into Database

The SMS data provided (`modified_sms_v2.xml`) is loaded into the database:

```bash
python scripts.py
```

This parses and extracts SMS transactions and inserts them into `My_Database.db`.

### 7️⃣ Run the Flask API Server

```bash
python app.py
```

The Flask app will be running at: `http://127.0.0.1:5000`

### 8️⃣ Available API Endpoints

- `GET /api/messages` — Returns all parsed SMS transaction data

> Note: `flask_cors` has been configured to allow requests from frontend.

---

## 💻 Frontend Setup

### 1️⃣ Navigate to frontend directory

```bash
cd ../frontend
```

### 2️⃣ Project Files

- `index.html` — Main entry page
- `js/components/` — Modularized JS components rendering charts, stats, and analytics.
- `js/data/` — Contains mock data files and optionally fetches live data via API.
- `js/utils/` — Contains helper functions for calculations and tab management.

### 3️⃣ Run Frontend

Since it's pure HTML/CSS/JS you can simply open `index.html` directly in your browser.

For local server (recommended to avoid CORS issues):

```bash
# Install live-server globally if not installed
npm install -g live-server

# Start local server in frontend directory
live-server
```

This will automatically open: `http://127.0.0.1:8080`

> The frontend expects backend running on: `http://127.0.0.1:5000`

---

## 📊 Data Flow Summary

1️⃣ You provide raw SMS file (`modified_sms_v2.xml`)  
2️⃣ `scripts.py` parses, extracts relevant fields (sender, amount, timestamps etc.)  
3️⃣ Parsed data is stored inside SQLite database (`My_Database.db`)  
4️⃣ Flask backend serves the data through `/api/messages`  
5️⃣ Frontend fetches data via Axios and renders analytics using ApexCharts.

---

## 📝 Development Notes

- Backend uses **Flask + SQLite**
- Frontend uses **HTML + TailwindCSS + Vanilla JS + ApexCharts**
- Clean modular frontend component structure.
- Fully isolated backend and frontend — easy to decouple or extend.

---

## 🔧 Troubleshooting

- If you face `CORS` errors, ensure both frontend and backend are running on correct ports (`5000` for backend, `8080` for frontend).
- Use browser dev tools (F12) to monitor API requests/responses.

---

## 🚀 Future Improvements

- Dockerize full stack for simpler deployment.
- Replace SQLite with PostgreSQL for production use.
- Build full authentication & authorization.
- Add filtering and search features for better analysis.
- Build mobile-first responsive UI.

---

## 🙌 Author

> Hycient Igweze *
> Principie Cyubahiro *
> Erica Ishimwe *
> Gaju Keane 

---

**This README was fully engineered to be usable by any developer to get your repo running out of the box.**
