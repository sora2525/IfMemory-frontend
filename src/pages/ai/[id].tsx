import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { TextType } from "../../types/TextType";
import Link from "next/link";
import { axiosInstance } from "@/lib/axiosInstance";

export default function ShowAi(){
const [text,setText] = useState<TextType | null>(null);
const router = useRouter();
const {id} = router.query;

async function getAiText() {
    try{
        const res = await axiosInstance.get(`/ai_texts/${id}`)
        setText(res.data);
    }catch(e){
        console.log(e);
        
    }
}

useEffect(()=>{
    if(id){
        getAiText();
    }
},[id])
    return (
        <>
          <h1>aa</h1>

          {text ? (

          <div  key={text.id} className="bg-gray-200 mb-5">
                  <h1 className="bg-blue-100">あなたのストーリー:  {text.question}</h1>
                  <p>新たなストーリー: {text.answer}</p>
              </div>

          ):(
            <p>データを読み込み中...</p>
          )}

          <Link href="./" className="hover:text-blue-400">一覧へ戻る</Link>

        </>
    )
}
