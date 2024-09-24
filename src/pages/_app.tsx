import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { axiosInstance } from "@/lib/axiosInstance";
import { authState } from "@/atom/authAtom";
import { Header } from "@/components/header/Header";

function MyApp({ Component, pageProps }: AppProps) {
  const setAuth = useSetRecoilState(authState);

  const Check = async () => {

    try {
      const res = await axiosInstance.get("/auth/validate_token")
      console.log(res.data.data);
      setAuth({ isAuthenticated: true, user: res.data.data });

      console.log("成功");

    } catch (e: any) {
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
      <div className="bg-[#e0ffff] min-h-screen">
      <Header/>
        <MyApp {...props} />
      </div>
    </RecoilRoot>
  );
}
