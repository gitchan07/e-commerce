FROM node:21.6-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

FROM node:21.6-alpine AS production

WORKDIR /app

COPY --from=build /app .

RUN npm ci --only=production

EXPOSE 3000

CMD ["npm", "start"]