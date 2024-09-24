import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { TextType } from "@/types/TextType";
import { axiosInstance } from "@/lib/axiosInstance";
import { IndexCard } from "@/components/AiIndex/IndexCard";

export default function TextAll() {
    const [texts, setTexts] = useState<TextType[]>([])

    async function getTexts() {
        try {
            const res = await axiosInstance.get<TextType[]>("/ai_texts")
            setTexts(res.data)
        } catch (e) {
            console.log(e);

        }
    }

    useEffect(() => {
        getTexts();
    }, []);

    return (
        <>

            <div className="">
                <div className="flex flex-col justify-center items-center">
                    <Link href="./ai/new" className="button-49 my-6 w-[250px] sm:w-[400px] text-xl sm:text-2xl">新しく作る</Link>
                    <h1 className="memo w-[250px] sm:w-[400px] my-3 text-xl sm:text-2xl">みんなのおもいで</h1>

                    <div className="flex flex-wrap justify-between bg-blue-50 px-[20px] py-[10px] w-[90%]">
                        {texts.map((text) => (
                            <IndexCard key={text.id} text={text} />
                        ))}
                    </div>

                </div>
            </div>
        </>
    )
}