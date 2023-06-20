FROM node:18-alpine
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
EXPOSE 1337
CMD ["yarn", "dev"]

# # builder
# FROM node:18 AS builder

# WORKDIR /app

# COPY package.json ./

# RUN yarn install 

# COPY . .

# RUN yarn build

# # hosting

# FROM node:18-alpine

# WORKDIR /app

# COPY package.json ./

# RUN yarn install --production

# COPY --from=builder /app/build ./build

# EXPOSE 1337

# CMD ["node", "./build/src/app.js"]
