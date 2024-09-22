import axios from "axios";
import React, { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const Login = async ( email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/auth/sign_in", {
        email: email,
        password: password,
      });

      
      setSuccess("ログインに成功しました！");
      setError(null);
    } catch (e: any) {
      setError(e.response?.data?.errors?.[0] || "ログインに失敗しました");
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
          />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">ログイン</button>
      </form>
    </>
  );
}
