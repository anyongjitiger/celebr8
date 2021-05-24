import { apiClient } from "@services";
import { Table } from "@constants";
/**
 *
 * @param table
 * @param params
 * @returns `{list,params, success, total}`
 * @example getAll: query(table)
 * @example getOne: query(table, {vals:id})
 * @example specified fields: query(table,{names:[field1_name, field2_name]})
 * @example specified fields string: query(table,{names:'field1_name, field2_name',types:})
 * @example paging: query(table,{page:page_index, length:page_length})
 * @example where query: query(table,{vals:[field1_value, field2_value],names:{field1, field2},types:[field1_type,field2_type]})
 */
const query = (table: Table, params?: QueryParams) => {
  let data = {};
  if (params) {
    const vals = params.vals ? Array.isArray(params.vals) ? params.vals.join(',') : params.vals : null;
    const types = params.types ? Array.isArray(params.types) ? params.types.join(',') : params.types : null;
    const names = params.names ? Array.isArray(params.names) ? params.names.join(',') : params.names : null;
    if (__DEV__) console.log("{ vals, types, names }=>>", { vals, types, names });
    data = ({ ...params, vals, types, names });
    return apiClient.get(`/sync/${table}`, { params: data });
  }
  return apiClient.get(`/sync/${table}`);
};

/**
 * 
 * @param table 
 * @param data 
 * @returns `[error,data:{list,params, success, total}]`
 */
const insert = (table: Table, data: TableData) => {
  const { id, ...rest } = data;
  return apiClient.post(`/sync/${table}`, rest);
}

/**
 * 
 * @param table 
 * @param pks 
 * @param data 
 * @returns `[error,data:{list,params, success, total}]`
 * @example dbFethc.update(tablenem, id, {field01:'xxx',field2:'xxxxx});
 */
const update = (table: Table, pks: number | PksType, data: TableData) => {
  const { id = '', ...rest } = data;
  if (Number.isInteger(pks)) {
    return apiClient.put(`/sync/${table}`, rest, { params: { vals: pks }, });
  }
  pks = <PksType>pks;
  const vals = Array.isArray(pks.vals) ? pks.vals.join(',') : pks.vals;
  const types = Array.isArray(pks.types) ? pks.types.join(',') : pks.types;
  const names = Array.isArray(pks.names) ? pks.names.join(',') : pks.names;
  if (__DEV__) console.log("{ vals, types, names }=>>", { vals, types, names });
  const params = { vals, types, names };
  console.log('q =>', params)
  return apiClient.put(`/sync/${table}`, data, { params });
};

/**
 * 
 * @param table 
 * @param id 
 * @returns `[error,data:{list,params, success, total}]`
 */
const remove = (table: Table, id: string | number) => {
  return apiClient.delete(`/sync/${table}`, {
    params: { vals: id }
  })
};

// const proc = (proc: Procedure, params: []) => apiClient.post(`/sync/process`, { name: proc });
type TableData = { id?: string | number, [param: string]: any };
type DataType = "int" | 'string' | 'boolean';
type ValType = { [prop: number]: string | number | boolean };
type PksType = { vals: ValType, names: string[], types?: DataType[] }
type QueryParams = {
  vals?: string | number | boolean | ValType,
  names?: string | string[],
  types?: DataType | DataType[],
  page?: number,
  length?: number,
}
export default { query, insert, update, remove  /* proc */ };
export type { QueryParams, DataType };
