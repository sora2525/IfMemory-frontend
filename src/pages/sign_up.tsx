import { axiosInstance } from "@/lib/axiosInstance";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useRecoilState } from "recoil";
import { authState } from "@/atom/authAtom";
import Image from "next/image";

export default function CreateUser() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>(""); 
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();
  const [auth, setAuth] = useRecoilState(authState);

  const SignUp = async (name: string, email: string, password: string) => {
    try {
      const response = await axiosInstance.post("/auth", {
        name: name,
        email: email,
        password: password,
        password_confirmation: password,
      });

      // サーバーからの認証情報を取得
      const { "access-token": accessToken, client, uid } = response.headers;

      if (accessToken && client && uid) {
        // クッキーに保存
        Cookies.set("access-token", accessToken, { expires: 7 });
        Cookies.set("client", client, { expires: 7 });
        Cookies.set("uid", uid, { expires: 7 });

        // ログイン状態を更新
        setAuth({ isAuthenticated: true, user: response.data.data });

        setSuccess("ユーザー登録に成功しました！");
        setError(null);

        // ホームページへリダイレクト
        router.push("/");
      }
    } catch (e: any) {
      setError(e.response?.data?.errors?.[0] || "登録に失敗しました");
      setSuccess(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !passwordConfirmation) {
      setError("すべてのフィールドを入力してください");
      return;
    }
    if (password !== passwordConfirmation) {
      setError("パスワードが一致しません");
      return;
    }
    if (password.length < 6) {
      setError("パスワードは6文字以上である必要があります");
      return;
    }
    SignUp(name, email, password);
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div>
        <Image
          src="/images/IMG_1838-removebg-preview.png" // public/images/IMG_1836.jpgへのパス
          alt="画像の説明"
          width={250} // 幅
          height={150} // 高さ
          className="sm:w-[350px] xl:w-[400px]"
        />
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
              <div className="pb-3">
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                      d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                  </svg>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    className="grow"
                    placeholder="Username"
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
              </div>
              <div className="pb-3">
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
                    id="passwordConfirmation"
                    className="grow"
                    placeholder="Confirm Password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                  />
                </label>
              </div>
              <div className="flex justify-center">
                <button type="submit" className="btn btn-active btn-accent text-white sm:text-lg xl:text-xl">登録</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
