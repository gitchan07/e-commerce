import Cookies from 'js-cookie';
const getHeaders = () => ({
    Authorization: `Bearer ${Cookies.get('access_token')}`,
  });
export default getHeaders;  