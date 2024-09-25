import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { TextType } from "@/types/TextType";
import { axiosInstance } from "@/lib/axiosInstance";
import { IndexCard } from "@/components/AiIndex/IndexCard";
import Image from "next/image";

export default function TextAll() {
    const [texts, setTexts] = useState<TextType[]>([]);
    const [currentPage, setCurrentPage] = useState(1); // 現在のページ番号
    const [totalPages, setTotalPages] = useState(1);   // 総ページ数

    async function getTexts(page: number) {
        try {
            const res = await axiosInstance.get(`/ai_texts?page=${page}`);
            setTexts(res.data.ai_texts);
            setTotalPages(res.data.meta.total_pages); // 総ページ数を取得
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getTexts(currentPage); // 現在のページのデータを取得
    }, [currentPage]);

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <>
            <div className="">
                <div className="flex flex-col justify-center items-center">
                    <Link href="./ai/new" className="button-49 my-6 w-[250px] sm:w-[400px] text-xl sm:text-2xl">
                        新しく作る
                    </Link>

                    <div>
                        <Image
                            src="/images/IMG_1836-removebg-preview.png" 
                            alt="画像の説明"
                            width={350} // 幅
                            height={300} // 高さ
                        />
                    </div>

                    <div className="flex flex-wrap justify-between bg-blue-50 px-[20px] py-[10px] w-[90%]">
                        {texts.map((text) => (
                            <IndexCard key={text.id} text={text} />
                        ))}
                    </div>

                    {/* ページネーションコントロール */}

                    <div className="pagination-controls my-4 flex items-center justify-between w-[70%] sm:[50%]  max-w-[600px] mt-[40px] mb-[40px]">
                        <button onClick={handlePrevious} disabled={currentPage === 1} className="button-49-reverse mx-2 sm:text-lg ">
                            前へ
                        </button>
                        <span className="text-xl hidden sm:block">ページ {currentPage} / {totalPages}</span>
                        <button onClick={handleNext} disabled={currentPage === totalPages} className="button-49 mx-2 sm:text-lg">
                            次へ
                        </button>
                    </div>
                    <div className="text-xl sm:hidden sm:hiden">ページ {currentPage} / {totalPages}</div>
                </div>
            </div>
        </>
    );
}
