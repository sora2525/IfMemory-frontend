import Link from "next/link";
import { TextType } from "@/types/TextType";

interface ShowIndexProps {
  text: TextType; // textの型を指定
}

export function ShowIndex({ text }: ShowIndexProps) {
  return (
    <Link key={text.id} href={`./ai/${text.id}`} className="inline-block">
      <div key={text.id} className="bg-gray-200 mb-5">
        <h1 className="bg-blue-100">ストーリー: {text.title}</h1>
        <p>投稿者: {text.user.name}</p> {/* ユーザー名を表示 */}
      </div>
    </Link>
  );
}
