// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false , // Definición del ambiente
  urlApi: '/api', // Url de el Backend del proyecto
  lastCommitLabel: 'Local', // Nombre del commit para cuando se hace deploy en el servidor
  lastCommitUrl: '#', // Link de commit para cuando se hace deploy en el servidor,
  deploy: '' // Link de commit para cuando se hace deploy en el servidor,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
