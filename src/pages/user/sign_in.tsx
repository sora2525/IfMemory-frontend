import axios from "axios";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { authState } from "@/atom/authAtom";
import { useRecoilState } from "recoil";
import { axiosInstance } from "@/lib/axiosInstance";

export default function LoginUser() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [auth,setAuth] = useRecoilState(authState);
  const router = useRouter();

  const Login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/auth/sign_in", {
      email: email,
      password: password,
    });
    const { "access-token": accessToken, client, uid } = response.headers;
    console.log(response.headers);
    
    if (accessToken && client && uid) {
        setAuth({ isAuthenticated: true, user: response.data.data });
        Cookies.set("access-token", accessToken, { expires: 7 });
        Cookies.set("client", client, { expires: 7 });
        Cookies.set("uid", uid, { expires: 7 });
    }
    setSuccess("ログインに成功しました！");
    setError(null);
    router.push("/")
    setEmail("");
    setPassword("");
  }catch (e: any) {
    // エラーの内容を詳細にチェック
    if (e.response) {
      if (e.response.status === 401) {
        setError("メールアドレスまたはパスワードが間違っています");
      } else if (e.response.status === 400) {
        setError("無効なリクエストです");
      } else {
        setError(e.response.data?.errors?.[0] || "不明なエラーが発生しました");
      }
    } else if (e.request) {
      setError("サーバーからの応答がありません");
    } else {
      // それ以外のエラー
      setError("エラーが発生しました");
    }
    setSuccess(null);
  }
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ( !email || !password) {
      setError("すべてのフィールドを入力してください");
      return;
    }
    Login(email, password);
  };

  return (
    <>

    <div className="flex flex-col items-center justify-center">
      <div className="text-[30px] sm:text-[40px] xl:text-[50px] my-10 ">
        <h1 >ログイン</h1>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <div className="m-10 p-10 flex flex-col justify-center bg-red-50 rounded-lg max-w-[900px] w-[90%]">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center w-9/10">
            <div className="pb-3">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70">
                  <path
                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path
                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="email"
                  id="email"
                  className="grow"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>
           
            <div className="pb-6">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70">
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd" />
                </svg>
                <input
                  type="password"
                  id="password"
                  className="grow"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
            
            <div className="flex justify-center">
              <button type="submit" className="btn btn-active btn-accent text-white">ログイン</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
