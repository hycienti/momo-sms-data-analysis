from flask import Flask, jsonify
from Db_Config import connection
from flask_cors import CORS


app = Flask(__name__)
CORS(app)  # Allow all origins for all routes

@app.route("/api/messages")
def fetch():
    conn = connection()
    sms = conn.execute("SELECT * FROM sms_messages").fetchall()
    conn.close()

    results = [dict(row) for row in sms]

    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)

