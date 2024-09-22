import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { axiosInstance } from "@/lib/axiosInstance";
import { userState } from "@/atom/userAtom";

export function LogoutButton(){
    const[user,setUser] = useRecoilState(userState);
    console.log("Current user in LogoutButton:", user);
    const [error,setError] = useState<string | null>(null);
    const router = useRouter();

    const Logout = async()=>{
        try{
            await axiosInstance.delete("/auth/sign_out");
            Cookies.remove("access-token");
            Cookies.remove("client");
            Cookies.remove("uid");
            Cookies.remove("username");
           setUser({id: null,name: null})
            router.push("/");
        }catch(e:any){
            setError("ログアウトに失敗しました:");
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
       Logout()
      };
    return (
        <>
         {error && <p style={{ color: "red" }}>{error}</p>}
        <button onClick={handleSubmit}>ログアウト</button>
        </>
    )
}