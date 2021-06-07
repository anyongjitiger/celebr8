import { apiClient, dbFetch, fileFetch } from '@services';
import { API, Table } from '@constants';
import { getGlobal } from '@services';
import { DownloadOption, UploadParams } from '../file_fetch';
import { TExperience } from '@types';
import branch from 'react-native-branch';

const create = (expe: TExperience) => {
  return dbFetch.insert(Table.Experience, expe);
};

const update = (id, expe) => {
  return dbFetch.update(Table.Experience, { id }, expe);
};

const detail = async (expe_id: number) => {
  const [err1, exep] = await dbFetch.query(Table.Experience, { id: expe_id });
  const [err2, images] = await dbFetch.query(Table.File, { expe_id });
  const [err3, members] = await dbFetch.query(Table.Member, { expe_id });
  const [err4, invites] = await dbFetch.query(Table.Invite, { expid: expe_id });
  const error = err1 || err2 || err3 || err4;
  return [error, { exep, images, members, invites }];
};

const setCover = (expe_id: number, bgi_file: string) => {
  const { user } = getGlobal();
  return apiClient.post(API.SET_BG_IMAGE, {
    expe_id,
    user_id: user?.id,
    bgi_file,
  });
};

const upsetImages = (params: UploadParams) => {
  return fileFetch.uploadExepImgs(params);
};

const download = (filename, option: DownloadOption) => {
  return fileFetch.download(filename, option);
};

/**
 *
 * @param exep_id
 * @param filenames
 * @returns
 * @example deleteImages(1,'file1.jpg, file2.jpg');
 */
const deleteImages = (exep_id: number, filenames: string) => {
  const { user } = getGlobal();
  return apiClient.delete(API.FILE_REMOVE, {
    exep_id,
    user_id: user?.id,
    filenames,
  });
};

const invite = async (exep_id, contacts) => {
  //create short link
  // only canonicalIdentifier is required
  let branchUniversalObject = await branch.createBranchUniversalObject(
    'canonicalIdentifier',
    {
      locallyIndex: true,
      title: 'Cool Content!',
      contentDescription: 'Cool Content Description',
      contentMetadata: {
        ratingAverage: 4.2,
        customMetadata: {
          method: 'invite',
          content: 'exep_id',
        },
      },
    },
  );

  console.log('branchUniversalObject==>>', branchUniversalObject);

  let linkProperties = {
    feature: 'invite',
    content: 'exep_id',
  };

  let controlParams = {
    $android_url: 'celebr8://feature',
    $ios_url: 'celebr8://feature',
  };

  const { url } = await branchUniversalObject.generateShortUrl(
    linkProperties,
    controlParams,
  );

  console.log('deep link url', url);

  // 
};

function getInviteList(expid: number) {
  return dbFetch.query(Table.Invite, { expid });
}

const confirm = (expe_id: number) => {
  const { user } = getGlobal();
  //get phone
  const phone = user?.phone;
  return apiClient.post(API.EXPE.CONFIRM, { expe_id, tell: phone });
};

const getList = (page: number, length: number) => {
  const { user } = getGlobal();
  return apiClient.post(API.EXPE.GET_LIST, { page, length, user_id: user?.id });
};

export default {
  create,
  update,
  upsetImages,
  deleteImages,
  setCover,
  download,
  detail,
  invite,
  confirm,
  getList,
  getInviteList
};
