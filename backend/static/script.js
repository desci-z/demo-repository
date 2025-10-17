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