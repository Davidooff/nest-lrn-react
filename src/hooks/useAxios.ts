import { AxiosInstance } from "axios";
import { useState, useEffect } from "react";

interface ConfigObj {
  axiosInstance: AxiosInstance;
  method: "get" | "post" | "options" | "put";
  URL: string;
  requestConfig?: any;
}

const useAxios = (configObj: ConfigObj) => {
  const { axiosInstance, method, URL, requestConfig = {} } = configObj;

  const [responce, setResponse] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await axiosInstance[method](URL, {
          ...requestConfig,
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

    fetchData();

    // cleanup function
    // useEffect(() => controller.abort())
  }, []);

  return [responce, error, loading];
};

export default useAxios;
