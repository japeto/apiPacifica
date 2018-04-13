
const config = {
  home:'http://10.124.0.95:8907/api/1.0',
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
