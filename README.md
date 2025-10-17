![Auto Assign](https://github.com/desci-z/demo-repository/actions/workflows/auto-assign.yml/badge.svg)

![Proof HTML](https://github.com/desci-z/demo-repository/actions/workflows/proof-html.yml/badge.svg)

# Welcome to your organization's demo respository
This code repository (or "repo") is designed to demonstrate the best GitHub has to offer with the least amount of noise.

The repo includes an `index.html` file (so it can render a web page), two GitHub Actions workflows, and a CSS stylesheet dependency.

## Monitoring

This project includes a real-time monitoring dashboard using `sampler`. To run the dashboard, execute the following command:

```bash
./run_dashboard.sh
```

This will start the Flask application and the `sampler` dashboard, which displays the following metrics:

- **API Response Time**: A runchart showing the response time of the `/predict` endpoint.
- **CPU Usage**: A sparkline tracking the overall CPU usage.
- **Free Memory**: Sparklines for monitoring free memory on both Linux and macOS.

**Note:** The `run_dashboard.sh` script will check if `sampler` is installed and provide instructions if it is not found.