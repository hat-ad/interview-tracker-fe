import { AxiosError } from "axios";
import instance from "./apiService";

import { QueryParamsType } from "../utils/interface";
import { store } from "../store";

const getService = async (
  url: string,
  params: QueryParamsType = {
    limit: 10,
    page: 1,
  }
) => {
  try {
    const response = await instance.get(url, {
      params,
    });
    if (response.data.status) {
      return {
        status: response?.data?.code,
        data: response?.data?.result,
        message: response?.data?.message,
      };
    } else {
      return {
        status: response?.data?.code,
        data: response?.data?.result,
        message: response?.data?.message,
        error: response?.data?.error,
      };
    }
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      return {
        status: false,
        data: null,
        message: e?.response?.data?.message,
      };
    }
    return {
      status: false,
      data: null,
      message: "Something went wrong, please try again later",
    };
  }
};

const getServiceWithToken = async (
  url: string,
  params: QueryParamsType = {
    limit: 10,
    page: 1,
  }
) => {
  const { clientToken } = store.getState().auth;
  try {
    const response = await instance.get(url, {
      headers: {
        Authorization: `Bearer ${clientToken}`,
      },
      params,
    });
    if (response.data.status) {
      return {
        status: response?.data?.code,
        data: response?.data?.result,
        message: response?.data?.message,
      };
    } else {
      return {
        status: response?.data?.code,
        data: response?.data?.result,
        message: response?.data?.message,
        error: response?.data?.error,
      };
    }
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      return {
        status: false,
        data: null,
        message: e?.response?.data?.message,
      };
    }
    return {
      status: false,
      data: null,
      message: "Something went wrong, please try again later",
    };
  }
};

const postServiceWithToken = async (url: string, data: unknown) => {
  const { clientToken } = store.getState().auth;
  try {
    const response = await instance.post(url, data, {
      headers: {
        Authorization: `Bearer ${clientToken}`,
      },
    });
    if (response.data.status) {
      return {
        status: response?.data?.code,
        data: response?.data?.result,
        message: response?.data?.message,
      };
    } else {
      return {
        status: response?.data?.code,
        data: response?.data?.result,
        message: response?.data?.message,
      };
    }
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      return {
        status: false,
        data: null,
        message: e?.response?.data?.message,
      };
    }
    return {
      status: false,
      data: null,
      message: "Something went wrong, please try again later",
    };
  }
};

const deleteServiceWithToken = async (url: string) => {
  const { clientToken } = store.getState().auth;
  try {
    const response = await instance.delete(url, {
      headers: {
        Authorization: `Bearer ${clientToken}`,
      },
    });
    if (response.data.status) {
      return {
        status: response?.data?.code,
        data: response?.data?.result,
        message: response?.data?.message,
      };
    } else {
      return {
        status: response?.data?.code,
        data: response?.data?.result,
        message: response?.data?.message,
      };
    }
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      return {
        status: false,
        data: null,
        message: e?.response?.data?.message,
      };
    }
    return {
      status: false,
      data: null,
      message: "Something went wrong, please try again later",
    };
  }
};

const putServiceWithToken = async (url: string, data: unknown) => {
  try {
    const { clientToken } = store.getState().auth;
    const response = await instance.put(url, data, {
      headers: {
        Authorization: `Bearer ${clientToken}`,
      },
    });
    if (response.data.status) {
      return {
        status: response?.data?.code,
        data: response?.data?.result,
        message: response?.data?.message,
      };
    } else {
      return {
        status: response?.data?.code,
        data: response?.data?.result,
        message: response?.data?.message,
      };
    }
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      return {
        status: false,
        data: null,
        message: e?.response?.data?.message,
      };
    }
    return {
      status: false,
      data: null,
      message: "Something went wrong, please try again later",
    };
  }
};

export {
  getService,
  getServiceWithToken,
  postServiceWithToken,
  deleteServiceWithToken,
  putServiceWithToken,
};
