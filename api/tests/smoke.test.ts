import { test, expect } from 'vitest'
import { githubRepository } from '../src/github/github.repository'
import { createGitHubService } from '../src/github/github.service'

test('deve retornar a saúde de um repositório real (facebook/react)', async () => {
  const service = createGitHubService({ github: githubRepository })
  const result = await service.getRepoHealth('facebook', 'react')

  expect(result.data.name).toBe('react')
  expect(result.data.owner).toBe('facebook')
  
  // Testando se as novas funcionalidades estão vindo
  expect(result.data.openPRs.length).toBeGreaterThan(0)
  expect(result.data.topContributors.length).toBeGreaterThan(0)
  expect(Array.isArray(result.data.staleIssues)).toBe(true)
  
  // Testando o cache
  expect(result.cache).toBeDefined()
})