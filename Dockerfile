# Imagen Base
FROM node

# Create the directory where my ap is located
WORKDIR /app

# copy package.json
COPY package*.json ./

# inatalar los node maodules
RUN npm install

#copiar archivos de mi locar al contenedor
COPY . .

#compile app
RUN npm run build

# conando de inicio de contenedore
# docker build -t drink-server-image:1.0 .
CMD ["node", "dist/src/index.js"]
# use 'docker container run -it --rm drink-server-image:1.0  bash'
# then 'ls' to check if the files were copied