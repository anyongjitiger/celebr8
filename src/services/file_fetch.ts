import { RNFetchBlob } from '@helpers';
import config from '@config';
import { Image } from '@types';
import { API } from '@constants';
import { getGlobal, apiClient } from '@services';
import { getFileName } from '@helpers';
import {
  FetchBlobResponse,
  RNFetchBlobConfig,
  StatefulPromise,
} from 'rn-fetch-blob';
const url_upload = `${config.API_URL}${API.FILE_UPLOAD}`;
const url_download = `${config.API_URL}${API.FILE_DOWNLOAD}`;

type UploadParams = {
  expe_id: number;
  file: Image[];
  del_files?: string;
  bgi_file?: string;
};

function uploadExepImgs(
  params: UploadParams,
  option?: UploadOption,
): StatefulPromise<FetchBlobResponse> {
  const { token, user } = getGlobal();
  const fileData = params.file.map((file: Image) => {
    return {
      name: 'file',
      filename: getFileName(file.path),
      type: file.mime,
      data: RNFetchBlob.wrap(file.path),
    };
  });
  const bodys: any = [
    { name: 'expe_id', data: params.expe_id },
    { name: 'user_id', data: user?.id },
    ...fileData,
  ];

  if (params.del_files) {
    bodys.push({ name: 'del_files', data: params.del_files });
  }
  if (params.bgi_file) {
    bodys.push({ name: 'bgi_file', data: params.bgi_file });
  }

  return (
    RNFetchBlob.fetch(
      'post',
      url_upload,
      {
        Token: token || '*',
        'Content-Type': 'multipart/form-data',
      },
      bodys,
    )
      // listen to upload progress event, emit every 100ms
      .uploadProgress(
        { interval: option?.interval || 100 },
        (written, total) => {
          console.log('uploaded', written / total);
          option?.progress(+(written / total) * 100);
        },
      )
  );
}

function download(filename: string, option?: DownloadOption): Promise<any> {
  const { token } = getGlobal();
  const headers = { Token: token || '*' };
  console.log('on download start!!!!');
  return (
    RNFetchBlob.config({ ...option?.config })
      .fetch('get', `${url_download}/${filename}`, headers)
      // listen to download progress event, every 10%
      .progress({ count: option?.count || 10 }, (received, total) => {
        const p = +((received / total) * 100).toFixed(0);
        console.log(
          'progress => ',
          'received',
          received,
          'total',
          total,
          'percent',
          p,
          '%',
        );
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
  );
}

function getFileList(directory: string) {
  return apiClient.get(`${API.FILE_LIST}/${directory}`);
}

type UploadOption = {
  interval?: 250;
  progress(percent: number): void;
};

type DownloadOption = {
  config: RNFetchBlobConfig;
  count?: 1;
  progress(percent: number, received?: number, total?: number): void;
};

export type { UploadOption, DownloadOption, UploadParams };
export default { uploadExepImgs, download, getFileList };
