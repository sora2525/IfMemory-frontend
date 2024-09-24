import Link from "next/link";
import { TextType } from "@/types/TextType";


interface IndexCardProps {
    text: TextType; // textの型を指定
}

export function IndexCard({ text }: IndexCardProps ) {
    return (

        <>
        <div className="w-[90%] sm:w-[45%] xl:w-[30%] m-3 bg-white rounded-xl ">
            <Link key={text.id} href={`./ai/${text.id}`}>
                <div className="card h-full">
                    <div className="card-body ">
                        <div className="card-actions justify-end flex flex-col border-l-4 border-blue-200 pl-4 text-gray-700">
                            <h2 className="text-xl font-semibold mb-2">{text.title}</h2>
                            <p className="">投稿者: {text.user.name.length > 12 ? `${text.user.name.slice(0, 12)}...` : text.user.name}</p> {/* ユーザー名を表示 */}
                            <p>{text.question.length > 50 ? `${text.question.slice(0, 50)}...` : text.question}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
        </>
    );
}
