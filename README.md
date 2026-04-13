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