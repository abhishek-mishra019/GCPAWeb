// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
  },
  useEmulators: true,
  recaptcha: {
    siteKey: '6LfhqpQfAAAAAMojn2xDl8B3GJ56WtdZf9Vbaq9m',
  },
  endpoint : "http://34.175.137.94/wp-json/wp/v2/posts/",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.