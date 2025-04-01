# Estágio de construção
FROM node:20-alpine AS builder

WORKDIR /app

# 1. Copia arquivos de configuração e dependências
COPY package.json package-lock.json tsconfig.json ./

# 2. Instala dependências (incluindo TypeScript como dependência de desenvolvimento)
RUN npm install -g typescript && \
    npm i

# 3. Copia o código fonte
COPY . .

# 4. Executa o build
RUN npm run build

# Estágio de produção
FROM node:20-alpine

WORKDIR /app

# Copia apenas o necessário
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json .

# Variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=3000
ENV DATABASE_URL=mongodb://mongo_db:27017/matchtrip
# ENV CLIENT_URL=CLIENT_URL

CMD ["node", "dist/app.js"]
EXPOSE 3000