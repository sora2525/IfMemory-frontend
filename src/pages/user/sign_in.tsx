import axios from "axios";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { authState } from "@/atom/authAtom";
import { useRecoilState } from "recoil";

export default function LoginUser() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [auth,setAuth] = useRecoilState(authState);
  const router = useRouter();

  const Login = async (email: string, password: string) => {
  try {
    const response = await axios.post("http://localhost:3000/api/v1/auth/sign_in", {
      email, 
      password 
    });
    const { "access-token": accessToken, client, uid } = response.headers;
    console.log(response.headers);
    
    if (accessToken && client && uid) {
        setAuth({ accessToken, client, uid });
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
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>
        <button type="submit">ログイン</button>
      </form>
    </>
  );
}
