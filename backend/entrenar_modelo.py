import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from imblearn.over_sampling import SMOTE
from sklearn.metrics import classification_report, confusion_matrix
import joblib

# Cargar archivo
archivo = 'emocional2.xlsx'
df = pd.read_excel(archivo)

# Filtrar valores válidos
df = df[df['Estado'].notna()]
df = df[df['Estado'].astype(str).str.strip() != '']

# Preparar datos
X = df.drop(columns=['Estado']).replace(r'^\s*$', np.nan, regex=True).astype(float)
X = X.fillna(X.mean())
y = df['Estado']

# Dividir en entrenamiento y test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

# Balancear con SMOTE
smote = SMOTE(random_state=42)
X_train_bal, y_train_bal = smote.fit_resample(X_train, y_train)

# Entrenar modelo KNN con k=4
modelo = KNeighborsClassifier(n_neighbors=4)
modelo.fit(X_train_bal, y_train_bal)

# Evaluación
y_pred = modelo.predict(X_test)
print("\n=== Reporte ===")
print(classification_report(y_test, y_pred))

# Matriz de confusión
print("\n=== Matriz de Confusión ===")
print(confusion_matrix(y_test, y_pred, labels=modelo.classes_))

# Guardar modelo
joblib.dump({'modelo': modelo, 'clases': modelo.classes_}, 'modelo_emocional2.pkl')
print("\n✅ Modelo KNN (k=4) guardado como 'modelo_emocional2.pkl'")
