import { axiosInstance } from "@/lib/axiosInstance";
import { useRouter } from "next/router";
import React, { useState } from "react";

export function Form() {
  const [question, setQuestion] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // エラーメッセージのstate
  const [errorDetails, setErrorDetails] = useState<string | null>(null); // エラー詳細のstate
  const router = useRouter();

  async function AiTextCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null); // 送信するたびにエラーメッセージをクリア
    setErrorDetails(null); // エラー詳細もクリア

    try {
      await axiosInstance.post("/ai_texts", { question });
      setQuestion("");
      router.push("/success"); // 例: 成功時にリダイレクトしたい場合
    } catch (e: any) {
      console.error(e);

      // エラーレスポンスを取得して詳細を表示
      if (e.response) {
        setErrorMessage(`エラーが発生しました (ステータスコード: ${e.response.status})`);

        // エラーメッセージが "You need to sign in or sign up before continuing." なら日本語で表示
        if (e.response.data && e.response.data.errors) {
          const errorText = e.response.data.errors[0];

          if (errorText === "You need to sign in or sign up before continuing.") {
            setErrorDetails("続行するにはログインまたは新規登録が必要です。");
          } else {
            setErrorDetails(errorText); // その他のエラーも表示
          }
        } else {
          setErrorDetails("サーバーからのエラーデータがありません。");
        }
      } else {
        setErrorMessage("ネットワークエラーが発生しました。");
        setErrorDetails("サーバーへの接続に失敗しました。");
      }
    }
  }

  return (
    <>
      <form onSubmit={AiTextCreate}>
        <div>
          <label>思い出</label>
          <textarea
            className="bg-gray-100"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <button type="submit" className="hover:text-blue-400">
          創作
        </button>
      </form>

      {/* エラーメッセージがある場合に表示 */}
      {errorMessage && (
        <div className="text-red-500 mt-2">
          <p>{errorMessage}</p>
          {errorDetails && <p>詳細: {errorDetails}</p>} {/* エラー詳細も表示 */}
        </div>
      )}
    </>
  );
}
