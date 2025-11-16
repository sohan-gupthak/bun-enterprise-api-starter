FROM oven/bun:1.3.2-alpine

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package.json bun.lock tsconfig.json tsoa.json ./
RUN bun install --frozen-lockfile

# Copy source
COPY . .

RUN bunx tsoa spec && bunx tsoa routes

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

CMD ["bun", "index.ts"]
