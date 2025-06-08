from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib

app = Flask(__name__)
CORS(app)

# === Cargar modelo y objetos ===
data = joblib.load("modelo_prediccion.pkl")
reg_model = data["modelo_reg"]
clf_model = data["modelo_clf"]
scaler = data["scaler"]
encoders = data["encoders"]
columnas = data["columnas"]

@app.route('/predecir', methods=['POST'])
def predecir():
    try:
        entrada_json = request.json

        # Construir la entrada en el orden correcto
        entrada = [
            int(entrada_json["Gestion"]),
            encoders["Periodo"].transform([entrada_json["Periodo"]])[0],
            int(entrada_json["BIO-99"]),
            int(entrada_json["FIS-99"]),
            int(entrada_json["MAT-99"]),
            int(entrada_json["QMC-99"]),
            encoders["Genero"].transform([entrada_json["Genero"]])[0],
            encoders["Zona"].transform([entrada_json["Zona"]])[0],
            int(entrada_json["Edad"]),
            encoders["AccesoDispositivos"].transform([entrada_json["AccesoDispositivos"]])[0],
            encoders["TipoDispositivo"].transform([entrada_json["TipoDispositivo"]])[0],
            encoders["PreferenciaClases"].transform([entrada_json["PreferenciaClases"]])[0],
            encoders["PlatformaVirtual"].transform([entrada_json["PlatformaVirtual"]])[0],
            encoders["Meet"].transform([entrada_json["Meet"]])[0],
            encoders["Colegio"].transform([entrada_json["Colegio"]])[0],
            encoders["Administración del Colegio"].transform([entrada_json["Administración del Colegio"]])[0]
        ]

        df_input = pd.DataFrame([entrada], columns=columnas)
        entrada_scaled = scaler.transform(df_input)

        # Predicción
        nota = reg_model.predict(entrada_scaled)[0]
        clase = clf_model.predict(entrada_scaled)[0]
        proba = clf_model.predict_proba(entrada_scaled)[0]
        clase_str = encoders["Observacion"].inverse_transform([clase])[0]

        probabilidades = {
            encoders["Observacion"].inverse_transform([i])[0]: round(float(p), 4)
            for i, p in enumerate(proba)
        }

        return jsonify({
            "nota_estimada": round(nota, 2),
            "clasificacion": clase_str,
            "probabilidades": probabilidades
        })

    except Exception as e:
        return jsonify({"error": f"Error procesando entrada: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)

