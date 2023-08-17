import { AxiosInstance } from "axios";
import { useState, useEffect } from "react";
import { NinjaInterface } from "../types/Ninja";

interface ConfigObj {
  axiosInstance: AxiosInstance;
  method: "post";
  URL: string;
  requestConfig?: any;
}

const useAxios = (configObj: ConfigObj) => {
  const { axiosInstance, method, URL, requestConfig = {} } = configObj;

  const [responce, setResponse] = useState<NinjaInterface | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  const controller = new AbortController();

  const fetchData = async (data: any) => {
    try {
      const res = await axiosInstance[method](URL, {
        ...requestConfig,
        ...data,
        signal: controller.signal,
      });
      console.log(res);
      setResponse(res.data);
    } catch (err: any) {
      console.log(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // cleanup function
  // useEffect(() => controller.abort())
  // }, []);

  return [responce, error, loading, fetchData] as const;
};

export default useAxios;
