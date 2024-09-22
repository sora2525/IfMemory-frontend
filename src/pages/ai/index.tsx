import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { TextType } from "@/types/TextType";
import { axiosInstance } from "@/lib/axiosInstance";

export default function TextAll(){
    const [texts,setTexts] = useState<TextType[]>([])
 
    async function  getTexts() {
        try{
           const res =  await axiosInstance.get<TextType[]>("/ai_texts")
           setTexts(res.data)
        }catch(e){
            console.log(e);
            
        }
    }

    useEffect(()=>{
        getTexts();
    },[]);

    return(
        <>
       <Link href="./ai/new" className="hover:text-blue-400">新しく作る</Link>
          <h1>みんなの思いで</h1>
           {texts.map((text)=>(
            <Link  key={text.id} href={`./ai/${text.id}` }>
              <div  key={text.id} className="bg-gray-200 mb-5">
                  <h1 className="bg-blue-100">ストーリー:  {text.question}</h1>
              </div>
            </Link>
           ))}
        </>
    )
}