# Usar una imagen base de Node.js
FROM node:18-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos
COPY . .

# Exponer el puerto que usa tu aplicación
EXPOSE 5050

# Comando para iniciar la aplicación
ENV HOST=0.0.0.0
CMD ["npm", "start"]
