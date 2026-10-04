@echo off
title PortMind AI - Maritime RAG Backend (Port 8001)
cd /d "%~dp0Backend\RAG"
echo ====================================================
echo Starting PortMind AI Maritime RAG Server on Port 8001
echo ====================================================
python -m src.main serve
if errorlevel 1 (
    echo.
    echo [ERROR] Server exited with an error. 
    echo If missing dependencies, run: pip install -r requirements.txt
    pause
)
