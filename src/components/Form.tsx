import { axiosInstance } from "@/lib/axiosInstance";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react"


export function Form(){
    const [question,setQuestion] = useState("");
    const router = useRouter();

    async function AiTextCreate(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try{
            await axiosInstance.post("/ai_texts",{question})
            setQuestion("");
        } catch(e){
            console.log(e);
            
        }
    }

  return (
    <>
      <form onSubmit={AiTextCreate}>
        <div>
            <label >思い出</label>
            <textarea className="bg-gray-100" value={question} onChange={(e)=>{setQuestion(e.target.value)}} />
        </div>
        <button type="submit" className="hover:text-blue-400">創作</button>
      </form>
    </>
  )
}