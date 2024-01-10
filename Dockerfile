FROM node:21-alpine3.18

ENV MSSQL_HOST yourhost
ENV MSSQL_DATABASE dev
ENV MSSQL_PORT 1433
ENV MSSQL_USERNAME yourusername
ENV MSSQL_PASSWORD yourpassword
ENV AZURE_OPENAI_API_KEY yourapikey
ENV AZURE_OPENAI_API_INSTANCE_NAME example-aoai-04
ENV AZURE_OPENAI_API_DEPLOYMENT_NAME gpt-4-32k
ENV AZURE_OPENAI_API_VERSION 2023-05-15

WORKDIR /app

COPY package.json .
COPY next.config.js .
COPY tsconfig.json .
COPY src ./src
RUN rm ./src/db/init.ts
COPY public ./public
COPY tailwind.config.ts .
COPY postcss.config.js .

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]