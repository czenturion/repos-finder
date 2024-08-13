import axios from 'axios'

const GITHUB_API_URL = 'https://api.github.com'


// Функция для поиска репозиториев
export const searchRepositories = async (query: string, page: number = 1, perPage: number = 10) => {
  const response = await axios.get(`${GITHUB_API_URL}/search/repositories`, {
    params: {
      q: query,
      sort: 'stars',
      order: 'desc',
      page: page,
      per_page: perPage,
    },
    headers: {
      Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
    }
  })
  return response.data
}

// Функция для получения деталей репозитория
export const getRepositoryDetails = async (owner: string, repo: string) => {
  const response = await axios.get(`${GITHUB_API_URL}/repos/${owner}/${repo}`)
  return response.data
}