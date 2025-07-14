import os
import pandas as pd
import math

def display_intro():
    print("© 2025 INTOBINARY - All rights reserved - Designed with ChatGPT assistance.")
    print("INTOBINARY presents DMIE Model - Diophantine Model of Informal Economy.")
    print("From a paper written by MALALA Donatien\n")

def get_input_method():
    print("Choose input method:")
    print("1. Manual input")
    print("2. Load from CSV file (dmie_input.csv in the same directory)")
    choice = input("Enter 1 or 2: ")
    return choice

def manual_input():
    n = int(input("How many entries do you want to input? "))
    data = []
    for _ in range(n):
        print("\nEnter data for a new record:")
        country = input("Country: ")
        year = int(input("Year: "))
        WF = float(input("WF (Working population): "))
        FW = float(input("FW (Formal workers): "))
        IW = float(input("IW (Informal workers): "))
        Yof = float(input("Yof (Official GDP): "))
        FP = float(input("FP (Formal productivity): "))
        IP = float(input("IP (Informal productivity): "))
        OL = float(input("OL (Tax pressure): "))
        data.append({
            "Country": country,
            "Year": year,
            "WF": WF,
            "FW": FW,
            "IW": IW,
            "Yof": Yof,
            "FP": FP,
            "IP": IP,
            "OL": OL
        })
    return pd.DataFrame(data)

def load_csv():
    try:
        return pd.read_csv("dmie_input.csv")
    except FileNotFoundError:
        print("CSV file not found. Please make sure 'dmie_input.csv' exists in the script's directory.")
        return pd.DataFrame()

def process_dmie(df):
    results = []
    for _, row in df.iterrows():
        WF = row['WF']
        FW = row['FW']
        IW = row['IW']
        Yof = row['Yof']
        FP = row['FP']
        IP = row['IP']
        OL = row['OL']
        LPG = FP / IP
        a = round(LPG * (WF / IW))
        b = 1
        C = OL * (WF / FW) * Yof
        Xo = -C
        Yo = (-a + 1) * C
        K = ((abs(a) * Yo) + (b * Xo)) / (a ** 2 + b ** 2)
        X = Xo - K
        Y = Yo - abs(a) * K
        Yin = abs(X)
        Yt = Yin + Yof
        Yin_percent = (Yin / Yof) * 100 # Convert to percentage
        results.append({
            "Country": row['Country'],
            "Year": row['Year'],
            "Yin": round(Yin, 2),
            "Yt": round(Yt, 2),
            "Yin-percent": round(Yin_percent, 2)
        })
    return pd.DataFrame(results)

def save_to_excel(df_results):
#    downloads_path = "/storage/emulated/0/Download" # Correct Android path
#    output_path = os.path.join(downloads_path, "DMIE_Results.xlsx")
    output_path = r'c:\SANDBOX\Github\dmie-model.IB\output_file.xlsx'

    # Save with styled formatting
    with pd.ExcelWriter(output_path, engine='openpyxl') as writer:
        df_results.to_excel(writer, index=False, sheet_name="DMIE Results")

        # Format worksheet (no scientific notation + percentage)
        workbook = writer.book
        worksheet = writer.sheets["DMIE Results"]

        # Apply column formatting
        for col in worksheet.iter_cols(min_row=2, max_row=worksheet.max_row):
            for cell in col:
                if isinstance(cell.value, float):
                    cell.number_format = '#,##0.00' # 2 decimal places

        # Format the Yin-percent column (last column) as percentage
        for row in worksheet.iter_rows(min_row=2, min_col=worksheet.max_column, max_col=worksheet.max_column):
            for cell in row:
                cell.number_format = '0.00'

    print(f"\nResults saved to: {output_path}")

def main():
    display_intro()
    method = get_input_method()
    if method == '1':
        df_input = manual_input()
    elif method == '2':
        df_input = load_csv()
        if df_input.empty:
            return
    else:
        print("Invalid input method.")
        return

    df_results = process_dmie(df_input)
    print("\nComputation completed. Summary:")
    print(df_results)
    save_to_excel(df_results)

if __name__ == "__main__":
    main()