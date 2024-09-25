// hooks/useLogin.ts
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { authState } from "@/atom/authAtom";
import { useRecoilState } from "recoil";
import { axiosInstance } from "@/lib/axiosInstance";

const useLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [auth, setAuth] = useRecoilState(authState);
  const router = useRouter();

  const handleError = (e: any) => {
    if (e.response) {
      switch (e.response.status) {
        case 401:
          setError("メールアドレスまたはパスワードが間違っています");
          break;
        case 400:
          setError("無効なリクエストです");
          break;
        default:
          setError(e.response.data?.errors?.[0] || "不明なエラーが発生しました");
      }
    } else if (e.request) {
      setError("サーバーからの応答がありません");
    } else {
      setError("エラーが発生しました");
    }
    setSuccess(null);
  };

  const login = async () => {
    try {
      const response = await axiosInstance.post("/auth/sign_in", { email, password });
      const { "access-token": accessToken, client, uid } = response.headers;

      if (accessToken && client && uid) {
        setAuth({ isAuthenticated: true, user: response.data.data });
        Cookies.set("access-token", accessToken, { expires: 7 });
        Cookies.set("client", client, { expires: 7 });
        Cookies.set("uid", uid, { expires: 7 });

        // ログイン成功時の処理
        setSuccess("ログインに成功しました！");
        setError(null);
        router.push("/");
      }
    } catch (e: any) {
      handleError(e);
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    success,
    login,
  };
};

export default useLogin;
