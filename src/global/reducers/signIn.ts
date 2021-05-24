import { addReducer } from 'reactn';
import { apiClient } from '@services'
import { globalInitialValue } from '@global';

const initialValue = { ...globalInitialValue };

addReducer('signIn', async (global, dispatch, { username, password }) => {
  try {
    const [err, data, response] = await apiClient.post('/api/user/login', { data: { username, password } });
    
    //   .then(res => {
    //   // console.log('登录结果', res.data);
    // });
    console.log('signin===>>', res);
    return {};

    const { params: [token], list: [user] } = res.data;
    // await apiClient.request(api.deleteNotificationsToken(global.clientId))
    console.log(' signIn token', token, 'user', user);
    return { ...global, token: token }
  } catch (error) {
    // alert.error(error)
    return initialValue
  }
});
