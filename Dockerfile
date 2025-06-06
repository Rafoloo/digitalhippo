# 1. Estágio de Build
FROM node:18-alpine AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de gerenciamento de pacotes
COPY package.json yarn.lock ./

# Instala as dependências de produção e desenvolvimento
# --frozen-lockfile garante que as mesmas versões do yarn.lock sejam usadas
RUN yarn install --frozen-lockfile

# Copia todo o código da aplicação
COPY . .

# Variáveis de ambiente para o build
# O NEXT_TELEMETRY_DISABLED desabilita a telemetria do Next.js
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1
# Adicione outras variáveis de ambiente necessárias para o build aqui
# Ex: ENV PAYLOAD_SECRET=your_secret

# Roda o script de build
RUN yarn build

# 2. Estágio de Produção
FROM node:18-alpine AS runner

WORKDIR /app

# Copia as dependências de produção do estágio de build
# --production garante que apenas as dependências de produção sejam instaladas
COPY --from=builder /app/node_modules ./node_modules
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

# Copia os artefatos de build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/src/payload.config.ts ./src/payload.config.ts
COPY --from=builder /app/src/collections ./src/collections
COPY --from=builder /app/src/media ./src/media


# Variáveis de ambiente para produção
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1
# A porta em que a aplicação vai rodar
ENV PORT=3000
# Adicione outras variáveis de ambiente de produção aqui
# Ex: ENV DATABASE_URI=mongodb://...
# Ex: ENV PAYLOAD_SECRET=your_secret
# Ex: ENV NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Expõe a porta
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/server.js"] 