import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TextType } from "../../types/TextType";
import Link from "next/link";
import { axiosInstance } from "@/lib/axiosInstance";
import DeleteButton from "@/components/button/DeleteButton";
import { authState } from "@/atom/authAtom";
import { useRecoilValue } from "recoil";
import { Kiwi_Maru } from 'next/font/google';
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";

const kiwi = Kiwi_Maru({
    weight: '300',
    preload: false,
});

export default function ShowAi() {
    const [text, setText] = useState<TextType | null>(null);
    const router = useRouter();
    const auth = useRecoilValue(authState);
    const { id } = router.query;

    useEffect(() => {
        const getAiText = async () => {
            if (!id) return; // idが未定義の場合は早期リターン
            try {
                const res = await axiosInstance.get(`/ai_texts/${id}`);
                setText(res.data);
            } catch (e) {
                console.log(e);
            }
        };
        
        getAiText(); // getAiText関数を呼び出す
    }, [id]); // idを依存配列に追加

    const handleDelete = () => {
        router.push("./"); // 削除後に一覧ページにリダイレクト
    };

    // Xへの共有リンクを生成する関数
    const createShareLink = () => {
        if (!text) return '';
        const baseUrl = 'https://twitter.com/intent/tweet';
        const tweetText = encodeURIComponent(`新たな思い出が出来たよ！-${text.title}-${text.if_text}`);
        const tweetUrl = encodeURIComponent(window.location.href); // 現在のURL
        return `${baseUrl}?text=${tweetText}&url=${tweetUrl}`;
    };

    return (
        <>
            <div className={kiwi.className}></div>
            <div className="flex flex-col items-center justify-center p-4 mt-[35px]">
                <div className="mr-[50%]">
                    <Image
                        src="/images/みてるフェレット.webp"
                        alt="画像の説明"
                        width={200}
                        height={150}
                    />
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl w-full">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4">{text?.title}</h1>

                    {text ? (
                        <>
                            <p className="text-gray-600 mb-2 text-center text-lg md:text-xl lg:text-2xl">語りびと: {text.user.name}</p>
                            <div key={text.id} className={`${kiwi.className} mb-4`}>
                                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">{text.user.name}のストーリー:</h2>
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
                                    <DeleteButton id={text.id} onDelete={handleDelete} />
                                </div>
                            )}
                            <div className="flex justify-center mt-4">
                                <a
                                    href={createShareLink()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 flex items-center"
                                >
                                    <FaXTwitter className="inline text-[22px]" /><span className="text-lg">で新たな思い出を共有</span>
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
        </>
    );
}
