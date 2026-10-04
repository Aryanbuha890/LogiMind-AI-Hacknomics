@echo off
title PortMind AI - Simulator Backend (Port 8000)
cd /d "%~dp0Backend\what_if_simulator"
echo ====================================================
echo Starting PortMind AI Simulator Server on Port 8000
echo ====================================================
python main.py
if errorlevel 1 (
    echo.
    echo [ERROR] Server exited with an error. 
    echo If missing dependencies, run: pip install -r requirements.txt
    pause
)
