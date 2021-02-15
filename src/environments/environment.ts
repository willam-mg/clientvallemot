// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  store: {
    userId: '>=Ch5N',
    userToken: 'A26d>n',
    userData: 'Ft36d-n',
  },
  apiConfig: {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Cache-Control': 'no-cache',
      // 'Accept-Encoding':'gzip, deflate, br',
      // 'Connection':'keep-alive'
    },
    // headersFormData: {
    //   'Content-Type': 'application/x-www-form-urlencoded',
    //   'Accept': 'application/json',
    //   // 'Cache-Control': 'no-cache',
    // },
    path: 'http://192.168.1.7:9191/api' // Localhost
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
