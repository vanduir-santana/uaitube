FROM oven/bun:1.2.18-alpine AS base
#RUN apk add --no-cache tzdata

# Instala dependencias somente quando necessario
FROM base AS deps
WORKDIR /app
# Instala dependencias
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Rebuilda o codigo fonte somente quando necessario
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY .env.production .env.production

# Next.js coleta de forma completamente anonima telemetria de uso geral.
# Saiba mais em: https://nextjs.org/telemetry
# Desabilita telemetria durante o build
ENV NEXT_TELEMETRY_DISABLED 1
RUN bun run build

# Imagem de producao, copia todos os arquivos e executa o next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
# seta timezone e instala pacote
ENV TZ America/Sao_Paulo
RUN apk --no-cache add tzdata
# Desabilita telemetria
ENV NEXT_TELEMETRY_DISABLED 1
RUN adduser --system --uid 1001 nextjs
RUN mkdir .next
RUN chown nextjs:bun .next

COPY --from=builder --chown=nextjs:bun /app/.next/standalone ./
COPY --from=builder --chown=nextjs:bun /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:bun /app/public ./public

USER nextjs
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
CMD ["bun", "--bun", "server.js"]
