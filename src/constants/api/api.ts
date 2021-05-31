
const api = Object.freeze({
  /**
   * method:post
   * data:{phone}
   */
  USER_LOGIN: "/user/login",
  /**
   * method:post
   * data:{phone,username}
   */
  USER_REGIST: "/user/regist",
  /**
   * method:post,
   * data:[file]
   */
  FILE_UPLOAD: "/file/upload",
  /**
   * method:post
   * eg:'/file/download/'+fn
   */
  FILE_DOWNLOAD: "/file/download",
  /**
   * method:post
   * data:{filenames:[f1,f2]}
   */
  FILE_REMOVE: "/file/remove",
  /**
   * method:get,
   * params: folder
   * eg:get(url + '/file/filenames/<folder>')
   */
  FILE_LIST: "/file/filenames",
  /**
   * set experience master image
   * method:post,
   * params:{expe_id, user_id, file:[],del_files:""}
   */
  SET_BG_IMAGE: "/file/set/bgi",
  /**
   * 
   */
  DELETE_IMAGE: "/file/remove",
  /**
   * method:post
   * data:{phone}
   */
  SNED_VERIFY_CODE: "/send/verify/code",
  /**
   * method:get
   */
  GET_UTC_TIME: "/utc/time"
});

export default api;
