import { apiClient } from '@services';
import { API } from '@constants';

function getUTCTime() {
  return apiClient.get(API.GET_UTC_TIME).then((res: any) => {
    const [error, data, resp] = res;
    if (!error) {
      const {
        list: { utc_time },
      } = data;
      return [null, utc_time, resp];
    }
    return res;
  });
}

export { getUTCTime };
export { default as Experience } from './experience';
