import axios from 'axios';
import {API, BASE_URL} from './api.types';

export const register = async data => {
  return axios(`${BASE_URL}${API.REGISTRATION_API}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    data: data,
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const login = async data => {
  return axios(`${BASE_URL}${API.LOGIN_API}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    data: data,
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const forgotpassword = async data => {
  return axios(`${BASE_URL}${API.FORGOT_PASSWORD}`, {
    method: 'POST',
    data,
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const resetpassword = async data => {
  return axios(`${BASE_URL}${API.RESET_PASSWORD}`, {
    method: 'POST',
    data,
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const userprofile = async (data, access_token) => {
  return axios(`${BASE_URL}${API.GET_USER_MASTER_DATA}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + access_token,
    },
    data: data,
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const updateuserprofile = async (data, access_token) => {
  return axios(`${BASE_URL}${API.UPDATE_USER_MASTER_DATA}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + access_token,
    },
    data: data,
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const registerStoreImage = async (data, access_token) => {
  // return axios(`${BASE_URL}${API.UPLOAD_IMAGE}`, {
    return axios(`${BASE_URL}${API.STORE_IMAGE_API}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + access_token,
    },
    data,
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const addprofile = async (data, access_token) => {
  return axios(`${BASE_URL}${API.ADD_PROFILE}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + access_token,
    },
    data,
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const getprofiles = async (data, access_token) => {
  return axios(`${BASE_URL}${API.GET_PROFILES}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + access_token,
    },
    data,
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const updateprofile = async (data, access_token) => {
  return axios(`${BASE_URL}${API.UPDATE_PROFILE}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + access_token,
    },
    data,
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const deleteprofile = async (data, access_token) => {
  return axios(`${BASE_URL}${API.DELETE_PROFILE}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + access_token,
    },
    data,
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};



export const getlocation = async (data, access_token) => {
  return axios(`${BASE_URL}${API.GET_LOCATION}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + access_token,
    },
    data,
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const uploadimage = async (data, access_token) => {
  return axios(`${BASE_URL}${API.UPLOAD_IMAGE}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + access_token,
    },
    data,
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};
export const getvendormaster = async (data, access_token) => {
  return axios(`${BASE_URL}${API.GET_VENDOR_MASTER}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + access_token,
    },
    data: data,
  })
    .then(response => response.data)
    .catch(error => {
      console.log("eroorrr of api error",error)
      throw error;
    });

};
export const getsubcategorymaster = async (data, access_token) => {
  return axios(`${BASE_URL}${API.GET_SUBCATEGORY_MASTER}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + access_token,
    },
    data: data,
  })
    .then(response => response.data)
    .catch(error => {
      console.log("eroorrr of api error",error)
      throw error;
    });

};
export const additemdata = async data => {
  return axios(`${BASE_URL}${API.ADD_UPDATE_POST}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    data: data,
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};
export const getproductlist = async (data, access_token) => {
  return axios(`${BASE_URL}${API.GET_PRODUCT_LIST}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: 'Bearer ' + access_token,
    },
    data: data,
  })
    .then(response => response.data)
    .catch(error => {
      console.log("eroorrr of api error",error)
      throw error;
    });

};
export const gethomemasterdata = async (data, access_token) => {
  return axios(`${BASE_URL}${API.GET_HOME_MASTER_DATA}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: 'Bearer ' + access_token,
    },
    data: data,
  })
    .then(response => response.data)
    .catch(error => {
      console.log("eroorrr of api error",error)
      throw error;
    });

};

