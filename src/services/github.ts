import { Octokit } from 'octokit'


const octokit = new Octokit({
  auth: process.env.REACT_APP_GITHUB_TOKEN
})

// Функция для поиска репозиториев
export const searchRepositories = async (query: string, page: number = 1, perPage: number = 10, sort: string = 'stars') => {
  const response = await octokit.request(`GET /search/repositories`, {
    q: query,
    sort: sort,
    order: 'desc',
    page: page,
    per_page: perPage
  })
  return response.data
}
