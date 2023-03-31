#Node build stage
FROM node:lts-bullseye-slim as builder

# Change working directory
WORKDIR /build

COPY . .

# Install npm packages
RUN npm install

# Complie typescript and build dist package
RUN npm run build

# Node production stage
# New node image to run the built package in production
FROM node:lts-bullseye-slim

ENV NODE_ENV production

# Change working directory
WORKDIR /server

COPY package.json .

# Install npm packages
RUN npm install rxjs --save-prod
RUN npm install --omit-dev


# copy all required files to production image
COPY --from=builder /build/dist /server/dist
COPY --from=builder /build/.env /server

EXPOSE 5000

# Start the backend service
CMD ["node", "dist/index.js"]