import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { TextType } from "@/types/TextType";
import { axiosInstance } from "@/lib/axiosInstance";
import { ShowIndex } from "@/components/AiIndex/ShowLink";

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
         <Link href="./ai/new" className="hover:text-blue-400 ">新しく作る</Link>
         <div className="">
            <h1>みんなの思いで</h1>
           {texts.map((text)=>(
            <ShowIndex text={text}/>
           ))}
         </div>
        </>
    )
}