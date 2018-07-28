
const config = {
  //home:'http://192.168.43.81:5000/api',
  //home:'http://192.168.0.10:5000/api',
  home:'https://raw.githubusercontent.com/japeto/stackPacifica/master/server/data_sample',
  //home:'http://192.168.1.56:5000/api',
 // Production settings
  version: '1.2',
  production: {
    api: 'api/1.0',
    offset: 0,
    limit: 5
  },
 // Deployment settings
  deployment: {
    api: 'api/v1',
    offset: 0,
    limit: 10
  }
};
export default config;
