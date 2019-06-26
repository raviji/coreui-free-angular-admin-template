// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyANCe3ZYPDi1Dt_gtPA9iour1DnFDPGF9Y',
    authDomain: 'ranger-shuttler.firebaseapp.com',
    databaseURL: 'https://ranger-shuttler.firebaseio.com',
    projectId: 'ranger-shuttler',
    storageBucket: 'ranger-shuttler.appspot.com',
    messagingSenderId: '537053694426',
    appId: '1:537053694426:web:4c41c554e316572a'
  }
};
