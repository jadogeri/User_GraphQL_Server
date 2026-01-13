FROM node:lts-alpine
ENV PORT=4000
WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . .
EXPOSE 4000
CMD ["npm", "run", "dev"]