from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# Cargar modelo entrenado
data = joblib.load('modelo_emocional2.pkl')
modelo = data['modelo']
clases = data['clases']

@app.route('/predecir', methods=['POST'])
def predecir():
    try:
        respuestas = request.json.get('respuestas', [])
        if len(respuestas) != 15:
            return jsonify({'error': "Por favor, responde las 15 preguntas."}), 400
        if any(r < 1 or r > 5 for r in respuestas):
            return jsonify({'error': "Las respuestas deben estar entre 1 y 5."}), 400

        datos = np.array([respuestas])
        prediccion = modelo.predict(datos)[0]

        # Añadir emojis a la respuesta
        estado_con_emoji = {
            "Feliz": "Feliz 😄",
            "Neutral": "Neutral 😐",
            "Preocupado": "Preocupado 😟",
            "Desmotivado": "Desmotivado 😞"
        }

        recomendaciones = {
            "Feliz": ["Sigue así, mantén tus hábitos positivos.", "Comparte tu estado con otros, puede inspirarlos."],
            "Neutral": ["Considera incluir actividades nuevas en tu rutina.", "Reflexiona sobre lo que te da bienestar."],
            "Preocupado": ["Practica técnicas de relajación.", "Habla con alguien de confianza."],
            "Desmotivado": ["Establece metas pequeñas y alcanzables.", "Busca apoyo emocional en tu entorno."]
        }

        return jsonify({
            'estado_emocional': estado_con_emoji.get(prediccion, prediccion),
            'recomendaciones': recomendaciones.get(prediccion, [])
        })

    except Exception as e:
        return jsonify({'error': f"Error en el procesamiento: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
