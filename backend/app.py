from flask import Flask, render_template, request, jsonify
import joblib
import numpy as np

app = Flask(__name__, template_folder='templates', static_folder='static')

# ---------- load placeholder model ----------
try:
    model = joblib.load('model/placeholder_model.pkl')
except FileNotFoundError:
    # first run: train and save
    from sklearn.datasets import load_iris
    from sklearn.linear_model import LogisticRegression
    X, y = load_iris(return_X_y=True)
    model = LogisticRegression(max_iter=200)
    model.fit(X, y)
    joblib.dump(model, 'model/placeholder_model.pkl')

# ---------- routes ----------
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()          # list of 4 floats
        X = np.array(data['features']).reshape(1, -1)
        proba = model.predict_proba(X)[0].tolist()
        pred = int(model.predict(X)[0])
        return jsonify({'prediction': pred, 'probabilities': proba})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/run-model', methods=['POST'])
def run_model():
    data = request.get_json()
    param1 = float(data.get('param1', 0.5))
    param2 = float(data.get('param2', 0.5))

    # Create a simple placeholder model with two features
    from sklearn.linear_model import LinearRegression
    X = np.array([[1, 1], [2, 2], [3, 3], [4, 4]])
    y = np.array([2, 4, 5, 4])
    model = LinearRegression()
    model.fit(X, y)

    # Use the input parameters to make a prediction
    prediction_input = np.array([[param1 * 10, param2 * 10]])
    prediction = model.predict(prediction_input)[0]

    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
