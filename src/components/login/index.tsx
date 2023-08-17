import Cookies from "universal-cookie";
import { useEffect } from "react";
import useAxios from "../../hooks/useAxiosAuth";
import jwt from "jwt-decode";
import authInstance from "../../apis/auth";

function Login() {
  const cookies = new Cookies();
  const [loginData, loginError, loginLoading, loginOperation] = useAxios({
    axiosInstance: authInstance,
    method: "post",
    URL: "/login",
  });

  useEffect(() => {
    if (loginData?.accessToken && loginData?.refreshToken) {
      let decodedAcc = jwt<{ _id: string; role: number; exp: number }>(
        loginData?.accessToken
      );
      let decodedRef = jwt<{ _id: string; role: number; exp: number }>(
        loginData?.refreshToken
      );
      cookies.set("refreshToken", loginData.refreshToken, {
        expires: new Date(decodedRef.exp * 1000),
      });
      cookies.set("accessToken", loginData.accessToken, {
        expires: new Date(decodedAcc.exp * 1000),
      });
      window.location.reload();
    }
  }, [loginData]);

  function submitLogin(e: any) {
    e.preventDefault();
    const target = e.target;
    const formData = new FormData(target);
    const data = {
      login: formData.get("login"),
      password: formData.get("password"),
    };
    loginOperation(data);
  }

  return (
    <form onSubmit={submitLogin}>
      <input name="login" type="text" placeholder="login" />
      <input name="password" type="password" placeholder="password" />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Login;
