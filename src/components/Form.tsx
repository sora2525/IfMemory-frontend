import { axiosInstance } from "@/lib/axiosInstance";
import { useRouter } from "next/router";
import React, { useState } from "react";

export function Form() {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [ifStatement, setIfStatement] = useState("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  async function AiTextCreate(title: string, question: string, ifStatement: string) {
    setError(null);

    try {
      await axiosInstance.post("/ai_texts", { ai_text: { title, question, if_text: ifStatement } });
      setTitle("");
      setQuestion("");
      setIfStatement("");
      router.push("/ai");
    } catch (e: any) {
      if (e.response && e.response.data) {
        // バックエンドからのエラーメッセージを表示
        setError(e.response.data.messages.join(", ")); // 複数のエラーメッセージがある場合を考慮
      } else {
        setError("予期しないエラーが発生しました");
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !question || !ifStatement) {
      setError("すべてのフィールドを入力してください");
      return;
    }
    AiTextCreate(title, question, ifStatement);
  };

  return (
    <>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>
            タイトル
            <input
              type="text"
              placeholder="タイトル"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="border p-2 w-full"
            />
          </label>
        </div>
        <div>
          <label>
            あなたのストーリー
            <input
              type="text"
              placeholder="あなたのストーリーを350字以内で"
              value={question}
              onChange={e => setQuestion(e.target.value)}
              className="border p-2 w-full"
            />
          </label>
        </div>
        <div>
          <label>
            もし
            <input
              type="text"
              placeholder="IF"
              value={ifStatement}
              onChange={e => setIfStatement(e.target.value)}
              className="border p-2 w-full inline"
            />
          </label>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2">投稿</button>
      </form>
    </>
  );
}
