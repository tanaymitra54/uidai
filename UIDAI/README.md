# Aadhaar Biometric Analysis - Web Application

A production-ready web application for analyzing Aadhaar biometric enrollment data using machine learning models.

## Features

- **Enrollment Prediction**: Predict expected enrollment numbers for children (5-17 years) and adults (17+ years)
- **Classification**: Classify enrollment as high or low with probability scores
- **Anomaly Detection**: Identify unusual patterns in enrollment data
- **Region Clustering**: Group regions based on enrollment characteristics
- **Comprehensive Analysis**: Run all models simultaneously for complete insights
- **Interactive Dashboard**: Real-time statistics and visualizations

## Tech Stack

### Backend
- **Flask**: Lightweight Python web framework
- **scikit-learn**: Machine learning models
- **joblib**: Model serialization
- **Flask-CORS**: Cross-origin resource sharing

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **shadcn/ui**: Beautiful, accessible components
- **Tailwind CSS**: Utility-first styling
- **Recharts**: Data visualization

## ML Models

The application includes the following trained models:

1. **Random Forest Regression** (children & adults enrollment prediction)
2. **Gradient Boosting Classifier** (high/low enrollment classification)
3. **Isolation Forest** (anomaly detection)
4. **K-Means Clustering** (region segmentation)

## Installation

### Prerequisites

- Python 3.9+
- Node.js 18+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Start the Flask server:
```bash
python app.py
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Project Structure

```
UIDAI/
├── backend/
│   ├── app.py                 # Flask application with API endpoints
│   ├── requirements.txt       # Python dependencies
│   └── models/                # ML models directory
│       ├── rf_children_model.pkl
│       ├── rf_adults_model.pkl
│       ├── gb_classifier_model.pkl
│       ├── isolation_forest_model.pkl
│       ├── kmeans_model.pkl
│       ├── scaler_classification.pkl
│       ├── scaler_clustering.pkl
│       ├── label_encoder_state.pkl
│       ├── label_encoder_district.pkl
│       ├── feature_info.json
│       └── dashboard_stats.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx      # Main application page
│   │   │   ├── layout.tsx    # Root layout
│   │   │   └── globals.css   # Global styles
│   │   ├── components/
│   │   │   └── ui/           # shadcn/ui components
│   │   └── lib/
│   │       ├── api.ts        # API client
│   │       └── utils.ts      # Utility functions
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## API Endpoints

### Health Check
- `GET /api/health` - Check server status

### Data Retrieval
- `GET /api/states` - Get list of states
- `GET /api/districts` - Get list of districts
- `GET /api/stats` - Get dashboard statistics

### Predictions
- `POST /api/predict/enrollment` - Predict enrollment volumes
- `POST /api/classify/enrollment` - Classify enrollment level
- `POST /api/detect/anomaly` - Detect anomalies
- `POST /api/cluster` - Predict cluster assignment
- `POST /api/analyze` - Comprehensive analysis

## Usage

1. Open `http://localhost:3000` in your browser
2. Select a state and district from the dropdowns
3. Choose month and day
4. Enter children and adult enrollment counts (for anomaly detection)
5. Select a prediction type:
   - **Enrollment Prediction**: Get predicted enrollment numbers
   - **Classification**: Determine if enrollment is high or low
   - **Anomaly Detection**: Check for unusual patterns
   - **Comprehensive**: Run all analyses at once

## Model Performance

- **Children Enrollment**: R² = 0.9926, RMSE = 2.1278
- **Adult Enrollment**: R² = 0.9984, RMSE = 1.1578
- **Classification**: ROC-AUC Score: High accuracy

## Building for Production

### Frontend
```bash
cd frontend
npm run build
npm start
```

### Backend
For production deployment, use a production WSGI server like Gunicorn:
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## Notes

- Ensure the Flask backend is running before using the frontend
- The models require the trained encoder files to be present in the `models/` directory
- Default values are used for percentage-based features if not provided

## License

This project is for demonstration purposes.