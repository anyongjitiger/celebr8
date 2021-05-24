import { addReducer } from 'reactn';
import { globalInitialValue } from '@global';

addReducer('signOut', async (global, dispatch, params) => {
  try {
    // await apiClient.request(api.deleteNotificationsToken(global.clientId))
    // console.log(' logout global', global);
    return globalInitialValue;
  } catch (error) {
    // alert.error(error)
    return globalInitialValue
  }
})
