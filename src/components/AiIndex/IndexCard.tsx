import Link from "next/link";
import { TextType } from "@/types/TextType";
import { Kiwi_Maru } from 'next/font/google'

const kiwi = Kiwi_Maru({
    weight: '300',
    preload: false,
  })

interface IndexCardProps {
    text: TextType; // textの型を指定
}

export function IndexCard({ text }: IndexCardProps ) {
    return (
        <>
        <div className={`${kiwi.className} w-[90%] sm:w-[45%] xl:w-[30%] m-3 bg-white rounded-xl`}>
            <Link key={text.id} href={`./memory/${text.id}`}>
                <div className="card h-full">
                    <div className="card-body ">
                        <div className="card-actions justify-end flex flex-col border-l-4 border-blue-200 pl-4 text-gray-700">
                            <h2 className="text-xl font-semibold mb-2">{text.title}</h2>
                            <p className="">投稿者: {text.user.name.length > 12 ? `${text.user.name.slice(0, 12)}...` : text.user.name}</p> {/* ユーザー名を表示 */}
                            <p className="font-semibold text-lg sm:text-xl">{text.if_text}</p>
                            <p>{text.question.length > 50 ? `${text.question.slice(0, 50)}...` : text.question}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
        </>
    );
}
