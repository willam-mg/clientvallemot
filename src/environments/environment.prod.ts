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
    path: 'http://192.168.1.7:9191/api' //local 1
    // path:'http://192.168.0.18:9191/api' //production local
    // path: 'https://api.vallemotors.salemtm.com/api' //depoyment
  }
};
