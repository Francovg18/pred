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
        if len(respuestas) != 7:
            return jsonify({'error': "Por favor, responde las 7 preguntas."}), 400
        if any(r < 1 or r > 5 for r in respuestas):
            return jsonify({'error': "Las respuestas deben estar entre 1 y 5."}), 400

        datos = np.array([respuestas])
        prediccion = modelo.predict(datos)[0]

        # Añadir emojis a la respuesta
        estado_con_emoji = {
            "Feliz": "Feliz 😄",
            "Neutral": "Neutral 😐",
            "Decepcionado": "Decepcionado 😟",
            "Frustrado": "Frustrado 😞"
        }

        recomendaciones = {
            "Feliz": [
                "Explora nuestras ofertas especiales, ¡tal vez encuentres algo que te encante!",
                "Aprovecha tu buen ánimo para dejar una reseña positiva en tus productos favoritos."
            ],
            "Neutral": [
                "Revisa nuestras recomendaciones personalizadas, podrían interesarte.",
                "Activa las notificaciones para no perderte promociones especiales."
            ],
            "Decepcionado": [
                "¿Tuviste una mala experiencia? Nuestro equipo de soporte está aquí para ayudarte.",
                "Explora productos con altas valoraciones, podrían mejorar tu experiencia."
            ],
            "Frustrado": [
                "¿Buscas algo específico? Usa nuestros filtros o el chat de ayuda.",
                "Tal vez nuestros productos más vendidos te den una mejor experiencia de compra."
            ]
        }


        return jsonify({
            'estado_emocional': estado_con_emoji.get(prediccion, prediccion),
            'recomendaciones': recomendaciones.get(prediccion, [])
        })

    except Exception as e:
        return jsonify({'error': f"Error en el procesamiento: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
