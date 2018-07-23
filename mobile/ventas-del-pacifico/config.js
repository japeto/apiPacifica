
const config = {
  home:'http://192.168.0.10:5000/api',
 // Production settings
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
