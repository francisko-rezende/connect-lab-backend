FROM node:16.16.0-alpine AS build

# Set environment variables
ARG JWT_SECRET
ENV JWT_SECRET=${JWT_SECRET}
ARG DB_DIALECT
ENV DB_DIALECT=${DB_DIALECT}
ARG DB_HOST
ENV DB_HOST=${DB_HOST}
ARG DB_PORT
ENV DB_PORT=${DB_PORT}
ARG DB_USER
ENV DB_USER=${DB_USER}
ARG DB_PASS
ENV DB_PASS=${DB_PASS}
ARG DB_NAME
ENV DB_NAME=${DB_NAME}

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./

RUN npm run build && npm prune --production

FROM node:16.16.0-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules

EXPOSE 3000
ENTRYPOINT [ "node" ]
CMD [ "dist/main.js" ]
