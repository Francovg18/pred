import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import r2_score

num_datos = 20
preguntas = [f"P{i}" for i in range(1, 14)]
datos = np.random.randint(0, 5, size=(num_datos, 13))  
puntajes_reales = np.dot(datos, np.random.uniform(1, 3, size=13)) + np.random.normal(0, 5, num_datos)

# Crear DataFrame
df = pd.DataFrame(datos, columns=preguntas)
df['Estrés Percibido'] = puntajes_reales

# Guardar en Excel
ruta_excel = 'Escala_Estres_Percibido.xlsx'
df.to_excel(ruta_excel, index=False)

# Cálculo de mínimos cuadrados 
X = np.c_[np.ones(num_datos), datos]  # Agregar columna de unos para el intercepto
y = puntajes_reales

# Fórmulas para coeficientes beta
X_transpuesta = X.T
beta = np.linalg.inv(X_transpuesta @ X) @ X_transpuesta @ y  # β = (XᵀX)⁻¹Xᵀy

# Predicciones
y_pred = X @ beta

# Cálculo del R^2
r2 = r2_score(y, y_pred)

# Métricas adicionales
media_y = np.mean(y)  # Media de los valores reales
media_y_pred = np.mean(y_pred)  # Media de los valores predichos
sst = np.sum((y - media_y) ** 2)  # Suma total de cuadrados
sse = np.sum((y - y_pred) ** 2)  # Suma de errores cuadráticos
ssm = np.sum((y_pred - media_y) ** 2)  # Suma de cuadrados explicada
residuos = y - y_pred  # Residuos del modelo

# Impresión de estadísticas clave
print("=== Estadísticas del Modelo ===")
print(f"Coeficiente de Determinación (R^2): {r2:.4f}")
print(f"Suma Total de Cuadrados (SST): {sst:.4f}")
print(f"Suma de Cuadrados del Modelo (SSM): {ssm:.4f}")
print(f"Suma de Errores Cuadráticos (SSE): {sse:.4f}")
print(f"Media de Puntajes Reales: {media_y:.4f}")
print(f"Media de Puntajes Predichos: {media_y_pred:.4f}")
print(f"Desviación Estándar de los Residuos: {np.std(residuos):.4f}")
print(f"Errores Promedio Absoluto (MAE): {np.mean(np.abs(residuos)):.4f}")
print()

# Graficar análisis
plt.figure(figsize=(16, 12))

# Gráfico 1: Predicción vs Real
plt.subplot(3, 2, 1)
plt.scatter(y, y_pred, color='blue', alpha=0.7)
plt.plot([min(y), max(y)], [min(y), max(y)], color='red', linestyle='--', label="Línea Ideal")
plt.title("Predicción vs Real")
plt.xlabel("Puntajes Reales")
plt.ylabel("Puntajes Predichos")
plt.legend()

# Gráfico 2: Residuos
plt.subplot(3, 2, 2)
plt.scatter(y_pred, residuos, color='purple', alpha=0.7)
plt.axhline(0, color='red', linestyle='--')
plt.title("Residuos vs Predicción")
plt.xlabel("Puntajes Predichos")
plt.ylabel("Residuos")

# Gráfico 3: Histograma de Residuos
plt.subplot(3, 2, 3)
plt.hist(residuos, bins=8, color='cyan', alpha=0.7)
plt.axvline(0, color='red', linestyle='--')
plt.title("Distribución de Residuos")
plt.xlabel("Residuos")
plt.ylabel("Frecuencia")

# Gráfico 4: Coeficientes Beta
plt.subplot(3, 2, 4)
plt.bar(range(len(beta)), beta, color='green', alpha=0.7)
plt.title("Coeficientes del Modelo")
plt.xlabel("Índice de Coeficientes")
plt.ylabel("Valor de Coeficientes")
plt.xticks(ticks=range(len(beta)), labels=['Intercepto'] + preguntas, rotation=45)

# Gráfico 5: Distribución de Puntajes Reales
plt.subplot(3, 2, 5)
plt.hist(y, bins=8, color='orange', alpha=0.7)
plt.title("Distribución de Puntajes Reales")
plt.xlabel("Puntajes Reales")
plt.ylabel("Frecuencia")

# Gráfico 6: Puntajes Predichos vs Orden
plt.subplot(3, 2, 6)
plt.plot(range(len(y_pred)), y_pred, label="Predichos", color='blue', marker='o')
plt.plot(range(len(y)), y, label="Reales", color='red', linestyle='--', marker='x')
plt.title("Puntajes Reales vs Predichos")
plt.xlabel("Índice")
plt.ylabel("Puntajes")
plt.legend()

plt.tight_layout()
plt.show()
