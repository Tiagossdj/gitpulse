# GitPulse

Dashboard de saúde de repositórios GitHub com cache Redis.

## Estrutura

- `api/`: API Node.js (Fastify + TypeScript)
- `web/`: Frontend Next.js
- `docker-compose.yml`: Redis (cache)

## Como começar

Subir o Redis:

```bash
docker compose up -d
```

Instalar dependências (monorepo):

```bash
pnpm install
```

Em um terminal, API (porta **3000**):

```bash
pnpm --filter @gitpulse/api dev
```

Em outro, frontend (porta **3001**):

```bash
pnpm --filter @gitpulse/web dev
```

O `web/.env.local` pode definir `NEXT_PUBLIC_API_BASE_URL=http://localhost:3000` (é o padrão se omitido).