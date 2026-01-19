# Setup Guide - Aadhaar Biometric Analysis Web Application

## Overview

This is a production-ready web application for analyzing Aadhaar biometric enrollment data using machine learning. The application consists of:

- **Backend**: Flask API server serving ML models
- **Frontend**: Next.js + shadcn/ui web interface

## Current Status

✅ All components are configured and ready to run  
✅ Flask backend is running on **http://localhost:5001**  
✅ Next.js frontend is running on **http://localhost:3000**  

## Quick Start

Both servers are already running! You can access the application at:

**Frontend**: http://localhost:3000

## Application Features

### 1. Dashboard Statistics
- Total enrollments, states, districts, and pincodes
- High enrollment areas overview
- Interactive charts with enrollment distribution

### 2. Enrollment Prediction
- Predict expected enrollment numbers for children (5-17 years)
- Predict expected enrollment numbers for adults (17+ years)
- Total enrollment prediction

### 3. Classification
- Classify areas as high or low enrollment
- Probability scores and confidence levels

### 4. Anomaly Detection
- Identify unusual patterns in enrollment data
- Anomaly scores and status indicators

### 5. Comprehensive Analysis
- Run all models simultaneously
- Complete insights in one view

## How to Use

1. Open **http://localhost:3000** in your browser
2. Select a **state** from the dropdown
3. Select a **district** from the dropdown
4. Choose **month** and **day**
5. Enter **children** and **adult** enrollment counts (optional, for anomaly detection)
6. Choose a prediction tab:
   - **Enrollment Prediction**: Get predicted enrollment numbers
   - **Classification**: Determine if enrollment is high or low
   - **Anomaly Detection**: Check for unusual patterns
   - **Comprehensive**: Run all analyses at once

## Project Structure

```
UIDAI/
├── backend/
│   ├── app.py                 # Flask API server
│   ├── requirements.txt       # Python dependencies
│   ├── venv/               # Python virtual environment
│   └── models/             # ML models (10 files)
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx     # Main UI
│   │   │   └── layout.tsx
│   │   ├── components/ui/   # shadcn/ui components
│   │   └── lib/
│   │       └── api.ts      # API client
│   └── package.json
├── models/                 # Trained ML models
│   ├── rf_children_model.pkl
│   ├── rf_adults_model.pkl
│   ├── gb_classifier_model.pkl
│   ├── isolation_forest_model.pkl
│   ├── kmeans_model.pkl
│   ├── scaler_classification.pkl
│   ├── scaler_clustering.pkl
│   ├── label_encoder_state.pkl
│   ├── label_encoder_district.pkl
│   ├── feature_info.json
│   └── dashboard_stats.json
├── start.sh               # Start both servers
└── README.md             # Documentation
```

## Manual Start (if needed)

### Start Backend

```bash
cd backend
source venv/bin/activate
python app.py
```

Backend will run on: http://localhost:5001

### Start Frontend

```bash
cd frontend
npm run dev
```

Frontend will run on: http://localhost:3000

### Start Both (using script)

```bash
./start.sh
```

## API Endpoints

All endpoints are available at `http://localhost:5001/api/`

- `GET /health` - Health check
- `GET /states` - List of states
- `GET /districts` - List of districts
- `GET /stats` - Dashboard statistics
- `POST /predict/enrollment` - Predict enrollment
- `POST /classify/enrollment` - Classify enrollment
- `POST /detect/anomaly` - Detect anomalies
- `POST /cluster` - Predict cluster
- `POST /analyze` - Comprehensive analysis

## Tech Stack

### Backend
- Python 3.9+
- Flask 3.0.0
- scikit-learn 1.6.1
- pandas, numpy, joblib

### Frontend
- Next.js 16.1.3
- React 19
- TypeScript
- shadcn/ui
- Tailwind CSS
- Recharts

## ML Models

| Model | Type | Performance |
|-------|------|-------------|
| Random Forest (Children) | Regression | R² = 0.9926, RMSE = 2.13 |
| Random Forest (Adults) | Regression | R² = 0.9984, RMSE = 1.16 |
| Gradient Boosting | Classification | High ROC-AUC |
| Isolation Forest | Anomaly Detection | 10% contamination |
| K-Means | Clustering | 4 clusters |

## Troubleshooting

### Port 5001 is in use

```bash
lsof -ti:5001 | xargs kill -9
```

### Port 3000 is in use

```bash
lsof -ti:3000 | xargs kill -9
```

### Backend not loading models

Ensure all model files exist in the `models/` directory:
```bash
ls -la models/
```

### Frontend can't connect to backend

Check if backend is running:
```bash
curl http://localhost:5001/api/health
```

## Building for Production

### Backend

Install gunicorn:
```bash
cd backend
source venv/bin/activate
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5001 app:app
```

### Frontend

```bash
cd frontend
npm run build
npm start
```

## Next Steps

To deploy to production:
1. Set up a production server (AWS, GCP, Azure, etc.)
2. Configure a reverse proxy (Nginx, Apache)
3. Set up environment variables
4. Use a production WSGI server for Flask (Gunicorn, uWSGI)
5. Build and deploy Next.js static files or use a Node.js host
6. Set up SSL/TLS certificates
7. Configure CORS for production domains

## Support

For issues or questions, refer to:
- README.md for detailed documentation
- Backend logs: `backend/backend.log`
- Frontend logs: `frontend/frontend.log`