// components/LoginUser.tsx
import React from "react";
import useLogin from "@/hooks/useLogin";
import Image from "next/image";

export default function LoginUser() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    setError,
    success,
    loading, // 追加
    login,
  } = useLogin();



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("すべてのフィールドを入力してください")
      return;
    }
    login();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <Image
          src="/images/ログイン.webp"
          alt="画像の説明"
          width={250}
          height={150}
          className="sm:w-[350px] xl:w-[400px]"
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      {loading && <div className="flex-col absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white bg-opacity-50 z-10 ">
        <Image
          className="rotating block" // ここにクラスを追加
          src="/images/回るフェレット.webp"
          alt="画像の説明"
          width={200}
          height={150}
        />
        <p className="text-2xl block font-bold">ログイン中...</p>
      </div>} {/* 読み込み中メッセージ */}
      <div className="m-10 p-10 flex flex-col justify-center bg-red-50 rounded-lg max-w-[900px] w-[90%]">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center w-9/10">
            <div className="pb-3">
              <label className="input input-bordered flex items-center gap-2">
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
              <button type="submit" className="btn btn-active btn-accent text-white sm:text-lg xl:text-xl">
                ログイン
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
