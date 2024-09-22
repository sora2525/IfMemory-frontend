import { axiosInstance } from "@/lib/axiosInstance";
import axios from "axios";
import React, { useState } from "react";


export default function CreateUser() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const SignUp = async (name: string, email: string, password: string) => {
    try {
      const response = await axiosInstance.post("/auth", {
        name: name,
        email: email,
        password: password,
        password_confirmation: password, // registration オブジェクトを使わない
      });
      setSuccess("ユーザー登録に成功しました！");
      setError(null);
    } catch (e: any) {
      setError(e.response?.data?.errors?.[0] || "登録に失敗しました");
      setSuccess(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("すべてのフィールドを入力してください");
      return;
    }
    SignUp(name, email, password);
  };

  return (
    <>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">名前</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <button type="submit">登録</button>
      </form>
    </>
  );
}
