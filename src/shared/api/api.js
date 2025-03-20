const baseUrl = 'https://aviasales-test-api.kata.academy'
export const api = {
  /*   getSearchId: () => {
    return fetch(`${baseUrl}/search`).then((response) => response.json())
  }, */
  getSearchId: async () => {
    const response = await fetch(`${baseUrl}/search`)
    return response.json()
  },
  getTicketsData: async (searchId) => {
    const response = await fetch(`${baseUrl}/tickets?searchId=${searchId}`)
    if (!response.ok) {
      const customError = new Error(response.statusText)
      customError.status = response.status
      throw customError
    }
    return response.json()
  },
}
