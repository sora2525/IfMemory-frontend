import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TextType } from "../../types/TextType";
import Link from "next/link";
import { axiosInstance } from "@/lib/axiosInstance";
import DeleteButton from "@/components/button/DeleteButton";
import { authState } from "@/atom/authAtom";
import { useRecoilValue } from "recoil";

export default function ShowAi() {
    const [text, setText] = useState<TextType | null>(null);
    const router = useRouter();
    const auth = useRecoilValue(authState);

    const { id } = router.query;

    async function getAiText() {
        try {
            const res = await axiosInstance.get(`/ai_texts/${id}`);
            setText(res.data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (id) {
            getAiText();
        }
    }, [id]);

    const handleDelete = () => {
        router.push("./"); // 削除後に一覧ページにリダイレクト
    };
    // Xへの共有リンクを生成する関数
    const createShareLink = () => {
        if (!text) return '';
        const baseUrl = 'https://twitter.com/intent/tweet';
        const tweetText = encodeURIComponent(`新たな思い出が出来たよ！-${text.title}`);
        const tweetUrl = encodeURIComponent(window.location.href); // 現在のURL
        return `${baseUrl}?text=${tweetText}&url=${tweetUrl}`;
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl w-full">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4">{text?.title}</h1>

                {text ? (
                    <>
                        <p className="text-gray-600 mb-2 text-center text-lg md:text-xl lg:text-2xl">語りびと: {text.user.name}</p>

                        <div key={text.id} className="mb-4">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">あなたのストーリー:</h2>
                            <p className="border-l-4 border-blue-500 pl-4 text-gray-700 text-base md:text-lg lg:text-xl">
                                {text.question}
                            </p>
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mt-4">新たなストーリー: &nbsp;&nbsp;&nbsp; {text.if_text}</h2>
                            <p className="border-l-4 border-green-500 pl-4 text-gray-700 text-base md:text-lg lg:text-xl">
                                {text.answer}
                            </p>
                        </div>
                        {auth.user && text.user.id === auth.user.id && (
                            <div className="flex ml-5 mt-4">
                                <DeleteButton id={text.id} onDelete={handleDelete} /> {/* 削除ボタン */}
                            </div>
                        )}
                        {/* Xへの共有ボタン */}
                        <div className="flex justify-center mt-4">
                            <a
                                href={createShareLink()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400"
                            >
                                Xで新たな思い出を共有
                            </a>
                        </div>
                    </>
                ) : (
                    <p className="text-gray-500 text-center text-lg md:text-xl">データを読み込み中...</p>
                )}

                <Link href="./" className="block text-center mt-6 text-blue-600 hover:text-blue-400 text-lg md:text-xl">
                    一覧へ戻る
                </Link>
            </div>
        </div>
    );
}
