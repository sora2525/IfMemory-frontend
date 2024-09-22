import axios from "axios"
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import { authState } from "@/atom/authAtom";
import { useRecoilState } from "recoil";

export function LogoutButton(){
    const[auth,setAuth] = useRecoilState(authState);
    const [error,setError] = useState<string | null>(null);
    const router = useRouter();

    const Logout = async()=>{
        try{
            await axios.delete("http://localhost:3000/api/v1/auth/sign_out",{
                headers: {
                    "access-token": auth.accessToken,
                    "client": auth.client,
                    "uid": auth.uid
                  },
            });

            Cookies.remove("access-token");
            Cookies.remove("client");
            Cookies.remove("uid");
            Cookies.remove("username");
            setAuth({ accessToken: '', client: '', uid: '' ,username: ''})
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