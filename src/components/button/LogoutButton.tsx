import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { axiosInstance } from "@/lib/axiosInstance";
import { authState } from "@/atom/authAtom";


export function LogoutButton(){
    const[auth,setAuth] = useRecoilState(authState);
    console.log("Current user in LogoutButton:", );
    const [error,setError] = useState<string | null>(null);
    const router = useRouter();

    const Logout = async()=>{
        try{
            await axiosInstance.delete("/auth/sign_out");
            Cookies.remove("access-token");
            Cookies.remove("client");
            Cookies.remove("uid");
            Cookies.remove("username");
           setAuth({isAuthenticated: false, user:null})
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
        <button onClick={handleSubmit} className="hover:text-blue-400 ext-base sm:text-xl lg:text-2xl">ログアウト</button>
        </>
    )
}
