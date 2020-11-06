export const environment = {
  production: true,
  store: {
    userId: '>=Ch5N',
    userToken: 'A26d>n',
    userData: 'Ft36d-n',
  },
  apiConfig: {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      // 'Cache-Control':'no-cache',
      // 'Accept-Encoding':'gzip, deflate, br',
      // 'Connection':'keep-alive'
    },
    headersFormData: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      // 'Cache-Control': 'no-cache',
    },
    path:'https://apivallemotors.develop:8443/api' //local
    // path: 'https://server.testing.dronebolivia.com/api' //depoyment
  }
};
