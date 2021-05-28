import { RNFetchBlob } from '@helpers';
import config from '@config';
import { ImageOrVideo } from '@types';
import { API } from '@constants';
import { getGlobal, apiClient } from '@services';
import { getFileName } from '@helpers';
import { RNFetchBlobConfig } from 'rn-fetch-blob';

const url_upload = `${config.API_URL}${API.FILE_UPLOAD}`;
const url_download = `${config.API_URL}${API.FILE_DOWNLOAD}`;

type TFile = {
  id?: number;
  user_id: number;
  expe_id: number;
  file_name: string;
  uploda_date: number;
}

function upload(
  files: ImageOrVideo | ImageOrVideo[] | any,
  option?: UploadOption,
) {
  const { token } = getGlobal();

  const data = files.map((file: ImageOrVideo) => {
    return {
      name: 'file',
      filename: getFileName(file.path),
      type: file.mime,
      data: RNFetchBlob.wrap(file.path),
    };
  });

  return (
    RNFetchBlob.fetch(
      'post',
      url_upload,
      {
        Token: token || '*',
        'Content-Type': 'multipart/form-data',
      },
      data,
    )
      // listen to upload progress event, emit every 100ms
      .uploadProgress({ interval: option?.interval || 100 }, (written, total) => {
        console.log('uploaded', written / total);
        option?.progress(+(written / total) * 100);
      })
      .then(res => {
        const { data } = res;
        console.log('upload response', res);
        return res;
      })
      .catch(error => {
        console.error('file uplaod error', error);
        return [error, null];
      })
  );
}

function download(filename: string, option?: DownloadOption) {
  const { token } = getGlobal();
  const headers = { Token: token || '*' };
  console.log('on download start!!!!');

  return RNFetchBlob
    .config({ ...option?.config })
    .fetch('get', `${url_download}/${filename}`, headers)
    // listen to download progress event, every 10%
    .progress({ count: option?.count || 10 }, (received, total) => {
      const p = +(((received / total) * 100).toFixed(0));
      console.log('progress => ', 'received', received, 'total', total, 'percent', p, '%');
      option?.progress(p, received, total);
    })
    .then(res => {
      const state = res.info().status;
      const {
        data,
        respInfo: { status },
      } = res;

      if (status === 200) {
        return [null, data, res];
      }
      const { error } = data;
      return [error, null, res];
    })
    .catch((errorMessage: any) => {
      console.error('file donwlaod error', errorMessage);
      return [errorMessage, null];
    })
}

function remove() {
  return apiClient.post(API.FILE_REMOVE);
}

function getFileList(directory: string) {
  return apiClient.get(`${API.FILE_LIST}/${directory}`);
}

type UploadOption = {
  interval?: 250;
  progress(percent: number): void;
};

type DownloadOption = {
  config: RNFetchBlobConfig,
  count?: 1;
  progress(percent: number, received?: number, total?: number): void;
  [params: string]: any
};

export type { UploadOption, DownloadOption };

export default { upload, download, remove, getFileList };
