import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { userState } from "@/atom/userAtom";
import { axiosInstance } from "@/lib/axiosInstance";

function MyApp({ Component, pageProps }: AppProps) {
  const setUser = useSetRecoilState(userState);
  
  const Check = async ()=>{
    
    try{
      const res = await axiosInstance.get("/auth/validate_token")
      console.log(res.data.data);
      
      setUser({
        id: res.data.data.id,
        name: res.data.data.name,
      });
      console.log("成功");
      
    }catch(e:any){
      console.error("認証チェックに失敗しました", e);
    }
  }

  useEffect(() => {
    Check()
  }, []);

  return <Component {...pageProps} />;
}

export default function App(props: AppProps) {
  return (
    <RecoilRoot>
      <MyApp {...props} />
    </RecoilRoot>
  );
}
