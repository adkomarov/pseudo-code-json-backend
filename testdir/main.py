from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/generate', methods=['POST'])
def generate_json():
    data = request.get_json()
    print("Полученные данные:", data)
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    generated_json = {
        "status": "success",
        "architecture": data
    }
    print("Отправляемый JSON:", generated_json)
    return jsonify(generated_json), 200

if __name__ == '__main__':
    app.run(debug=True)