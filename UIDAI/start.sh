#!/bin/bash

# Aadhaar Biometric Analysis - Start Script

echo "Starting Aadhaar Biometric Analysis Application..."
echo ""

# Start Backend
echo "🚀 Starting Flask Backend..."
cd backend
source venv/bin/activate
python app.py > ../backend.log 2>&1 &
BACKEND_PID=$!
echo "✅ Backend started on http://localhost:5001 (PID: $BACKEND_PID)"
echo ""

# Wait for backend to start
sleep 3

# Start Frontend
echo "🚀 Starting Next.js Frontend..."
cd ../frontend
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
echo "✅ Frontend started on http://localhost:3000 (PID: $FRONTEND_PID)"
echo ""

echo "========================================="
echo "🎉 Application is running!"
echo "========================================="
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:5001"
echo ""
echo "View logs:"
echo "  Backend:  tail -f backend/backend.log"
echo "  Frontend: tail -f frontend/frontend.log"
echo ""
echo "To stop the application:"
echo "  Press Ctrl+C or run: kill $BACKEND_PID $FRONTEND_PID"
echo "========================================="

# Wait for user to stop
wait