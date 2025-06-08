import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.neighbors import KNeighborsRegressor
from sklearn.linear_model import LogisticRegression
import joblib

# === 1. Cargar el archivo Excel ===
archivo = "dataset.xlsx"
df = pd.read_excel(archivo)

# === 2. Eliminar columnas innecesarias ===
columnas_a_eliminar = [
    'C.I.', 'Carrera', 'Celular', 'internetCelular',
    'Rendimiento', 'Departamento', 'LIN-99'
]
df = df.drop(columns=columnas_a_eliminar)

# === 3. Codificar columnas categóricas ===
columnas_categoricas = [
    'Periodo', 'Genero', 'AccesoDispositivos', 'TipoDispositivo',
    'PreferenciaClases', 'Zona', 'Observacion', 'Meet',
    'PlatformaVirtual', 'Colegio', 'Administración del Colegio'
]

encoders = {}
for col in columnas_categoricas:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    encoders[col] = le  # Guardar encoder

# === 4. Separar variables ===
X = df.drop(columns=["Nota Final", "Observacion"])
y_reg = df["Nota Final"]
y_clf = df["Observacion"]

# === 5. Escalar datos ===
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# === 6. Entrenar modelos ===
reg_model = KNeighborsRegressor(n_neighbors=5).fit(X_scaled, y_reg)
clf_model = LogisticRegression(max_iter=1000).fit(X_scaled, y_clf)

# === 7. Guardar modelos y objetos ===
joblib.dump({
    "modelo_reg": reg_model,
    "modelo_clf": clf_model,
    "scaler": scaler,
    "encoders": encoders,
    "columnas": X.columns.tolist()
}, "modelo_prediccion.pkl")

print("✅ Modelos y objetos guardados como 'modelo_prediccion.pkl'")

