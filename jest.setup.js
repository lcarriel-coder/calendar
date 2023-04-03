// import 'whatwg-fetch';
// import 'setimmediate';


require('dotenv').config({
    path:'.env.test'
});


jest.mock('./src/helpers/getEnvVariables', () => ({
    getEnvVariables: () => ({ ...process.env })
}));