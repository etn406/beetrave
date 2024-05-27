# backend/Dockerfile

# Utilise une image de Node.js comme base
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier le fichier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code source
COPY . .

# Construire l'application Nest.js
RUN npm run build

# Exposer le port
EXPOSE 3001

# Démarrer l'application
CMD ["npm", "run", "start:prod"]