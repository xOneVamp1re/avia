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
    return response.json()
  },
}

/* 
const getSearchID = async (signal) => {
  try {
    const response = await fetch('https://aviasales-test-api.kata.academy/search', { signal })
    if (!response.ok) {
      const customError = new Error('Network response was not ok')
      customError.status = response.status
      throw customError
    }
    const data = await response.json()
    return { data: data.searchId, error: null }
  } catch (error) {
    return { data: null, error: { message: error.message, status: error.status || null } }
  }
}
*/
