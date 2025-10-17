from flask import Flask, render_template, request, jsonify
from sklearn.linear_model import LinearRegression
import numpy as np

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/run-model', methods=['POST'])
def run_model():
    data = request.get_json()
    param1 = float(data.get('param1', 0.5))
    param2 = float(data.get('param2', 0.5))

    # Create a simple placeholder model with two features
    X = np.array([[1, 1], [2, 2], [3, 3], [4, 4]])
    y = np.array([2, 4, 5, 4])
    model = LinearRegression()
    model.fit(X, y)

    # Use the input parameters to make a prediction
    prediction_input = np.array([[param1 * 10, param2 * 10]])
    prediction = model.predict(prediction_input)[0]

    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)