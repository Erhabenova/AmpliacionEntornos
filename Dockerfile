# Dockerfile
FROM node:20-alpine

# Establecer el directorio de trabajo especificado
WORKDIR /usr/proyecto_integrador

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm install --only=production

# Copiar el código fuente
COPY src ./src

# Exponer el puerto 3000
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
