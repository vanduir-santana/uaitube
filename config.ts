//const url = 'http://www.uaitube.com/api/resultado/random';
const baseApiUrl = String(process.env.BASE_API_URL);

export const endpoints = {
  baseApiUrl: baseApiUrl,
  video: {
    //random: `${baseApiUrl}/v/random`,
    random: `/api/v/random`,
    find: (text: string) => `/api/v/find/${text}`
  }
}

