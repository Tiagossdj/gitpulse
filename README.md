# 🚀 GitPulse — GitHub Repository Health Monitor

> A real-time monitoring dashboard that analyzes repository health, contributor activity, and issue velocity for public repositories.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![Fastify](https://img.shields.io/badge/Fastify-5.x-black?logo=fastify)](https://fastify.dev/)
[![Redis](https://img.shields.io/badge/Redis-Cache-red?logo=redis)](https://redis.io/)
[![Biome](https://img.shields.io/badge/Biome-Lint-60a5fa?logo=biome)](https://biomejs.dev/)

---

## 📑 Table of Contents
- [About](#about)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Environment Variables](#environment-variables)
- [Future Improvements](#future-improvements)

---

## About

**GitPulse** is a diagnostic tool for developers. It transforms raw GitHub data into actionable insights, calculating "Health Scores" based on PR turnover and issue resolution time. 

Currently, the tool is optimized for **Public Repositories**, providing a "Pulse Check" on community engagement and project maintenance.

---

## Key Features

- **Health Score Algorithm:** Logic based on open vs. closed issues/PRs ratio.
- **Activity Monitoring:** Tracks the latest contributions and issue velocity.
- **Smart Caching:** Utilizes Redis to optimize GitHub API rate limits.
- **Modern UI:** Built with Tailwind CSS v4 and Framer Motion for smooth interactions.

---

## Tech Stack

### Backend (API)
| Tech | Role |
|---|---|
| **Fastify** | High-performance API layer. |
| **Redis** | Server-side caching (TTL-based). |
| **Native Fetch** | Direct integration with GitHub REST API. |
| **Biome** | Fast linting and formatting. |

### Frontend (Web)
| Tech | Role |
|---|---|
| **Next.js 15** | App Router & Server Components. |
| **TanStack Query** | State management and caching. |
| **Tailwind CSS v4** | Next-gen utility-first styling. |
| **Lucide React** | Clean, consistent iconography. |

---

## Architecture

O fluxo de dados prioriza a performance através do padrão **Cache-Aside**, garantindo que as chamadas à API do GitHub sejam otimizadas.

```mermaid
---
config:
  layout: dagre
  theme: mc
  look: neo
---
flowchart TD
    User["User"] -- HTTP Request --> Web["Web App"]
    Web -- GET /repo/:owner/:name --> API["Fastify API"]
    API --> Redis[("Redis Cache")]
    Redis -- HIT --> API
    Redis -- MISS --> GitHub["GitHub API"]
    GitHub -- response --> API
    API -- RepoHealth JSON --> Web

    style User fill:#7af6ae,stroke:#00C853
    style Web fill:#fffcde,stroke:#FFF9C4
    style API fill:#fffcde,stroke:#FFF9C4
    style Redis fill:#fdafaf,stroke:#D50000
    style GitHub fill:#c8e6ff,stroke:#BBDEFB
```

## Environment Variables

### API (`/api/.env`)
```env
PORT=3000
GITHUB_ACCESS_TOKEN=your_token_here
REDIS_URL=your_redis_url
```

---

## Future Improvements

- [ ] Private Repository Support: Implement OAuth2 flow to access user-authorized private data.
- [ ] Data Visualization: Integration of charts for historical health tracking.
- [ ] Webhook Integration: Real-time updates instead of polling.

---

⭐ If this tool helped you, leave a star!

