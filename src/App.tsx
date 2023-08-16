import Cookies from "universal-cookie";
import jwt from "jwt-decode";
import { useEffect, useState } from "react";

import useAxios from "./hooks/useAxiosAuth";
import authInstance from "./apis/auth";

import Ninjas from "./components/ninjas";
import Login from "./components/login";

function App() {
  const cookies = new Cookies();
  const [role, setRole] = useState<null | number>(null);
  const [loginData, loginError, loginLoading, loginOperation] = useAxios({
    axiosInstance: authInstance,
    method: "post",
    URL: "/login",
  });

  const [refreshData, refreshError, refreshLoading, refreshOperation] =
    useAxios({
      axiosInstance: authInstance,
      method: "post",
      URL: "/refresh",
    });

  useEffect(() => {
    if (refreshData?.accessToken && refreshData?.refreshToken) {
      let decodedAcc = jwt<{ _id: string; role: number; exp: number }>(
        refreshData?.accessToken
      );
      let decodedRef = jwt<{ _id: string; role: number; exp: number }>(
        refreshData?.refreshToken
      );
      cookies.set("refreshToken", refreshData.refreshToken, {
        expires: new Date(decodedRef.exp * 1000),
      });
      cookies.set("accessToken", refreshData.accessToken, {
        expires: new Date(decodedAcc.exp * 1000),
      });
    }
  }, [refreshData]);

  const refreshTokensFun = () => {
    let refreshToken = cookies.get("refreshToken");
    console.log(refreshToken);
    refreshOperation({ refreshToken });
  };
  let refreshToken = cookies.get("refreshToken");
  let accessToken = cookies.get("accessToken");
  if (refreshToken && accessToken && role === null) {
    let decodedJwt = jwt<{ _id: string; role: number; exp: number }>(
      accessToken
    );
    console.log(decodedJwt);

    setRole(decodedJwt.role);
  }
  if (refreshToken && !accessToken) {
    refreshTokensFun();
  }

  return (
    <div className="App">
      {role !== null && <Ninjas />}
      {role == null && <Login />}
    </div>
  );
}

export default App;
