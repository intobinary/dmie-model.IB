# README – DMIE Model (Diophantine Model of Informal Economy)

Version: 1.0
Author: MALALA Donatien
Developer: INTOBINARY
License: © 2025 INTOBINARY – All rights reserved
Built with ChatGPT assistance

1. Description
The DMIE Model estimates the size and dynamics of the informal economy using a Diophantine equation-based approach. It processes demographic and economic input data to compute:

- Yin: Estimated informal GDP
- Yt: Total economy (official + informal GDP)
- Yin-percent: Informal economy as a percentage of official GDP

The model is available as a Python script and can be converted into a Windows executable (.exe).

2. Requirements
For the Python version:
- Python 3.8+
- Modules: pandas, openpyxl

Install using:
pip install pandas openpyxl

For the .exe version:
- Windows 10 or higher
- No Python installation required

3. Usage
You can input data in two ways:
1. Manual input (through terminal)
2. CSV file input (named dmie_input.csv, placed in the script folder)

After processing, results are saved in the Downloads folder as an Excel file:
DMIE_Results.xlsx

4. Output Columns
The generated Excel file contains:
- Country
- Year
- Yin (in absolute value)
- Yt (in absolute value)
- Yin-percent (as a percentage, e.g. 35.76%)

All values are formatted in standard decimal notation (no scientific notation).