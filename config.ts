const baseApiUrl = String(process.env.BASE_API_URL);
const staticBaseUrl = '//s.dbit.net';

export const endpoints = {
  baseApiUrl: baseApiUrl,
  video: {
    //random: `${baseApiUrl}/v/random`,
    random: `/api/v/random`,
    find: (text: string) => `/api/v/find/${text}`
  }
};

export const staticEndpoints = {
  images1: (id: string) => `${staticBaseUrl}/i/1/${id}`,
  images2: (id: string) => `${staticBaseUrl}/i/2/${id}`,
  images3: (id: string) => `${staticBaseUrl}/i/3/${id}`,
  video: (id: string) => `${staticBaseUrl}/v/${id}`,
};
