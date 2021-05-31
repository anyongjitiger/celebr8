
import { apiClient, dbFetch } from "@services";
import { API, Table } from "@constants";

const create = (exper) => {
  return dbFetch.insert(Table.Experience, exper);
}

const update = (id, exper) => {

}

const upsetImages = (params: Tparams) => {

  return apiClient

}
const deleteImages = (exep_id: number, user_id: number, filenames: string) => {
  return apiClient.delete(API.FILE_REMOVE,)
}

export default { create, upsetImages, deleteImages };

type Tparams = {
  expe_id: number,
  user_id: number,
  file: Blob[],
  del_files?: string
}
