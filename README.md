
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
venv\Scripts\activate     # For Windows
```

### 4️⃣ Install Dependencies

```bash
pip install flask flask-cors
```

### 5️⃣ Database Initialization

> ✅ **You can skip steps 5 & 6 below if you're using the provided SQLite file or running fresh — the system will auto-generate the database file (`My_Database.db`) once you start processing data.**

> Only follow step 6 if you have a new `modified_sms_v2.xml` file and want to parse fresh data.

### 6️⃣ (Optional) Load Raw XML Data into Database

If you wish to parse new SMS data:

```bash
python scripts.py
```

This parses `modified_sms_v2.xml` and populates `My_Database.db`.

### 7️⃣ Run the Flask API Server

```bash
python app.py
```

By default, the Flask app will run at:  
`http://127.0.0.1:5000`

> ⚠ **IMPORTANT:**  
If your server starts at a different address or port (for example: `http://localhost:5001`), you need to update your frontend API URL.  
Go to:  
```bash
frontend/js/data/apiData.js
```

Inside that file, update:

```javascript
const apiUrl = 'http://127.0.0.1:5000/api/messages';
```

Replace with your actual backend URL if different.

### 8️⃣ Available API Endpoints

- `GET /api/messages` — Returns all parsed SMS transaction data

> CORS is fully enabled for frontend-backend communication.

---

## 💻 Frontend Setup

### 1️⃣ Navigate to frontend directory

```bash
cd ../frontend
```

### 2️⃣ Project Files

- `index.html` — Main entry page
- `js/components/` — Modularized JS components rendering charts, stats, and analytics.
- `js/data/` — Contains API configuration file (`apiData.js`).
- `js/utils/` — Contains helper functions.

### 3️⃣ Run Frontend

Since it's pure HTML/CSS/JS you can simply open `index.html` directly in your browser.

For best results (avoid CORS/file:// issues), serve locally using a simple server:

```bash
# Install live-server globally if not installed
npm install -g live-server

# Start local server in frontend directory
live-server
```

This will automatically open at:  
`http://127.0.0.1:8080`

---

## 📊 Data Flow Summary

1️⃣ You provide raw SMS file (`modified_sms_v2.xml`)  
2️⃣ `scripts.py` parses and extracts transaction details  
3️⃣ Data is stored inside SQLite database (`My_Database.db`)  
4️⃣ Flask backend serves data through `/api/messages`  
5️⃣ Frontend fetches and visualizes data via Axios + ApexCharts

---

## 📝 Development Notes

- Backend: **Flask + SQLite**
- Frontend: **HTML + TailwindCSS + Vanilla JS + ApexCharts**
- Clean modular component structure.
- Fully isolated backend and frontend — easy to decouple or extend.

---

## 🔧 Troubleshooting

- Ensure backend and frontend run on correct ports (`5000` for backend, `8080` for frontend).
- Update `frontend/js/data/apiData.js` if backend URL changes.
- Use browser dev tools (F12) to monitor network/API requests.

---

## 🚀 Future Improvements

- Docker support
- PostgreSQL integration
- User authentication
- Enhanced filtering/search capabilities
- Fully responsive UI for mobile

---

## 🙌 Authors

> Hycient Igweze  
> Principie Cyubahiro  
> Erica Ishimwe  
> Gaju Keane

---

✅ **This README is designed for ANY developer to clone, read, and launch the project effortlessly.**
