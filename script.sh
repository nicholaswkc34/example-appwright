#!/bin/bash

# Script para ejecutar pruebas de Appwright con dependencia restaurada
# Uso: ./script.sh [android|ios]

# Verificar que se proporcione un argumento
if [ $# -eq 0 ]; then
    echo "Error: Debes especificar la plataforma (android o ios)"
    echo "Uso: ./script.sh android"
    echo "     ./script.sh ios"
    exit 1
fi

PLATFORM=$1

# Validar que la plataforma sea válida
if [ "$PLATFORM" != "android" ] && [ "$PLATFORM" != "ios" ]; then
    echo "Error: Plataforma no válida. Usa 'android' o 'ios'"
    exit 1
fi

echo "🔧 Preparando entorno para pruebas de Appwright en $PLATFORM..."

# Verificar si la dependencia appium-uiautomator2-driver existe en package.json
if ! grep -q '"appium-uiautomator2-driver"' package.json; then
    echo "⚠️  Dependencia appium-uiautomator2-driver no encontrada. Agregándola al package.json..."

    # Crear una copia de respaldo del package.json
    cp package.json package.json.backup

    # Agregar la dependencia directamente al package.json usando sed
    # Buscar la línea que contiene "devDependencies": { y agregar la dependencia después
    sed -i '' '/\"devDependencies\": {/a\
    "appium-uiautomator2-driver": "3.8.0",
' package.json

    if [ $? -eq 0 ]; then
        echo "✅ Dependencia appium-uiautomator2-driver: \"3.8.0\" agregada exitosamente al package.json"
    else
        echo "❌ Error al modificar package.json, restaurando backup..."
        mv package.json.backup package.json
        exit 1
    fi

    # Eliminar el backup si todo salió bien
    rm package.json.backup
else
    echo "✅ Dependencia appium-uiautomator2-driver ya existe en package.json"
fi

echo "🚀 Ejecutando pruebas de Appwright para $PLATFORM..."

# Ejecutar las pruebas de Appwright
npx appwright test --project $PLATFORM

# Capturar el código de salida
EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
    echo "✅ Pruebas completadas exitosamente"
else
    echo "❌ Las pruebas fallaron con código de salida: $EXIT_CODE"
fi

exit $EXIT_CODE