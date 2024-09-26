import { axiosInstance } from "@/lib/axiosInstance";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Image from "next/image";

export function Form() {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [ifStatement, setIfStatement] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function AiTextCreate(title: string, question: string, ifStatement: string) {
    setError(null);
    setLoading(true);

    try {
      const res = await axiosInstance.post("/ai_texts", { ai_text: { title, question, if_text: ifStatement } });
      console.log(res.data);
      const aiTextId = res.data.id;
      setTitle("");
      setQuestion("");
      setIfStatement("");
      await router.push(`/memory/${aiTextId}`);
    } catch (e: any) {
      if (e.response && e.response.data) {
        setError(e.response.data.messages.join(", "));
      } else {
        setError("予期しないエラーが発生しました");
      }
    } finally {
      setLoading(false); // 読み込み中を終了
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
      <div className="flex flex-col items-center justify-center relative">
        {loading && (
          <div className="flex-col absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white bg-opacity-50 z-10 ">
            <Image
              className="rotating block" // ここにクラスを追加
              src="/images/フェレット_-removebg-preview.png"
              alt="画像の説明"
              width={200}
              height={150}
            />
            <p className="text-2xl block font-bold">読み込み中...</p>
          </div>
        )}

        <div>
          <Image
            src="/images/IMG_1839-removebg-preview.png" 
            alt="画像の説明"
            width={250} // 幅
            height={150} // 高さ
            className="sm:w-[350px] xl:w-[400px]"
          />
        </div>
        <div className="m-10 p-10 flex flex-col justify-center bg-red-50 rounded-lg max-w-[900px] w-[90%]">
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center w-9/10">
              <div className="pb-3">
                <label className="input input-bordered flex items-center gap-2" htmlFor="title">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                  </svg>

                  <input
                    type="text"
                    id="title"
                    className="grow"
                    placeholder="タイトル"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </label>
              </div>

              <div className="pb-3">
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                    />
                  </svg>
                  <textarea
                    className="textarea textarea-bordered pl-10 w-full"
                    id="story"
                    placeholder="あなたの思い出を詳細に"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className="pb-6">
                <label className="input input-bordered flex items-center gap-2" htmlFor="if">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                  </svg>

                  <input
                    type="text"
                    id="if"
                    className="grow"
                    placeholder="もし○○だったら.."
                    value={ifStatement}
                    onChange={(e) => setIfStatement(e.target.value)}
                  />
                </label>
              </div>
              <div className="flex justify-center">
                <button type="submit" className="btn btn-active btn-accent text-white sm:text-lg xl:text-xl">投稿</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
