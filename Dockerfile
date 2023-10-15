FROM node:hydrogen-alpine as prd
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["sleep", "10", "&&", "node", "dist/main.js"]