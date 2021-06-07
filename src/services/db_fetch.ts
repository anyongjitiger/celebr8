import { apiClient } from "@services";
import { Table } from "@constants";
/**
 *
 * @param table
 * @param query
 * @returns `{list,params, success, total}`
 * @example getAll: query(tableName)
 * @example page: query(tableName,{page:2,length:10})
 * @example specifyColumns: query(tableName,{page:2,length:10,columns:"name, title"})
 */
const query = (table: Table, query: QueryParams = {}) => {
  return apiClient.get(`/sync/${table}`, { params: { query } }).then(res => {
    return res;
  });
};

/**
 * 
 * @param table 
 * @param data 
 * @returns `[error,data:{list,params, success, total}]`
 */
const insert = (table: Table, data: TableData) => {
  return apiClient.post(`/sync/${table}`, data);
}

/**
 * 
 * @param table 
 * @param query
 * @param data 
 * @returns `[error,data:{list,params, success, total}]`
 * @example dbFethc.update(tablenem, id, {field01:'xxx',field2:'xxxxx'});
 */
const update = (table: Table, query: params, data: TableData) => {
  return apiClient.put(`/sync/${table}`, data, { params: { query } });
};

/**
 * 
 * @param table 
 * @param query
 * @returns `[error,data:{list,params,success,total}]`
 */
const remove = (table: Table, query: params) => {
  return apiClient.delete(`/sync/${table}`, { params: { query } })
};

// const proc = (proc: Procedure, params: []) => apiClient.post(`/sync/process`, { name: proc });

type TableData = { [param: string]: any };
type params = { [field: string]: any }
type QueryParams = {
  page?: number,
  length?: number,
  columns?: string,
  [field: string]: any,
}

export default { query, insert, update, remove  /* proc */ };
export type { QueryParams };
