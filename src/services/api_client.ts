import axios from 'axios';
import config from '@config';
import qs from "qs";
import { getGlobal } from "@services";
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "@types";

const requestConfig = {
  baseURL: config.API_URL,
  timeout: config.API_REQUEST_TIMEOUT,
  responseType: 'json',
  responseEncoding: 'utf8',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
}

const client = axios.create(<AxiosRequestConfig>requestConfig);
export const apiRequest = client.request;

client.interceptors.request.use((preRequestConfig: AxiosRequestConfig) => {
  console.log('request', preRequestConfig);

  const { token } = getGlobal();
  preRequestConfig.headers['Token'] = token;
  const contentType = preRequestConfig.headers['Content-Type'] + '';
  if (contentType.includes('application/x-www-form-urlencoded') && preRequestConfig.data) {
    const _d = qs.stringify(preRequestConfig.data);
    preRequestConfig.data = _d
  }
  return preRequestConfig
})

client.interceptors.response.use((response: AxiosResponse): any => {
  // if (!data.success) {
  //   return [data.error, null, response];
  // }A
  // return [null, data, response];
  return response;
},
  async (axiosError: AxiosError) => {
    // Handle UNAUTHORIZED error.W
    // if (get(error, 'response.status') === httpCodes.UNAUTHORIZED) {
    //   return await refreshToken(error.config)
    // }

    // // Send report about error to bug tracker.
    // sentry.captureException(error, {
    //   tags: {
    //     api_url: get(error, 'config.url'),
    //     api_status: get(error, 'response.status'),
    //     // screen: navigation.getCurrentRouteName(),
    //   },
    //   extra: {
    //     request: error.request,
    //     response: error.response,
    //   },
    // })
    console.error(axiosError.response)
    const { error = "unknow error" } = axiosError.response?.data;
    return Promise.reject([decodeURIComponent(error), null, axiosError.response])
  }
)

// const refreshToken = async (originalRequest: AxiosRequestConfig) => {
//   try {
//     const session = await Auth.currentSession()
//     const newToken = session.getAccessToken().getJwtToken()
//     const newClientId = session.getIdToken().payload.sub
//     setGlobal({ [globals.token]: newToken, [globals.CLIENT_ID]: newClientId })
//     originalRequest.headers['Authorization'] = `Bearer ${newToken}`
//     return axios(originalRequest)
//   } catch (error) {
//     getDispatch().logout()
//     console.log('Unable to refresh Token')
//   }
// }

const promiseify = function (api: Function) {
  return (...params: any) =>
    api(...params).then((response: AxiosResponse) => {
      const { data } = response;
      if (data.success) {
        return [null, data, response];
      }
      return [data.error, null, response];
    }, (error: any) => {
      return error
    });
}

const apiClient = {
  ins: client,
  all: promiseify(axios.all),
  get: promiseify(client.get),
  put: promiseify(client.put),
  head: promiseify(client.head),
  post: promiseify(client.post),
  delete: promiseify(client.delete),
  request: promiseify(client.request),
}

export default apiClient;
