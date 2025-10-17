document.getElementById('predict-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const features = [
        parseFloat(form.sl.value),
        parseFloat(form.sw.value),
        parseFloat(form.pl.value),
        parseFloat(form.pw.value)
    ];
    const resDiv = document.getElementById('result');
    resDiv.textContent = 'Running…';
    try {
        const resp = await fetch('/predict', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({features})
        });
        const data = await resp.json();
        if (resp.ok) {
            resDiv.innerHTML = `
                <strong>Prediction:</strong> Iris-class ${data.prediction}<br>
                <strong>Probabilities:</strong> ${data.probabilities.map((p, i) => `Class ${i}: ${(p*100).toFixed(1)}%`).join(', ')}
            `;
        } else {
            resDiv.textContent = 'Error: ' + data.error;
        }
    } catch (err) {
        resDiv.textContent = 'Network error: ' + err;
    }
document.addEventListener('DOMContentLoaded', () => {
    const runModelBtn = document.getElementById('run-model-btn');
    const modelForm = document.getElementById('model-form');
    const resultsSection = document.getElementById('results');

    runModelBtn.addEventListener('click', async () => {
        const formData = new FormData(modelForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/run-model', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            resultsSection.innerHTML = `<h2>Results</h2><p>Prediction: ${result.prediction}</p>`;
        } catch (error) {
            resultsSection.innerHTML = `<h2>Results</h2><p>Error: ${error.message}</p>`;
        }
    });
});