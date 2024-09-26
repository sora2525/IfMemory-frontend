import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { axiosInstance } from "@/lib/axiosInstance";
import { authState } from "@/atom/authAtom";
import { Header } from "@/components/header/Header";
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  const setAuth = useSetRecoilState(authState);

  useEffect(() => {
    const Check = async () => {
      try {
        const res = await axiosInstance.get("/auth/validate_token");
        console.log(res.data.data);
        setAuth({ isAuthenticated: true, user: res.data.data });
        console.log("成功");
      } catch (e: unknown) {
        // 型ガードを使ってエラー処理を行う
        if (e instanceof Error) {
          console.error("認証チェックに失敗しました", e.message);
        } else {
          console.error("認証チェックに失敗しました", e);
        }
      }
    };

    Check(); // Check関数を呼び出す
  }, [setAuth]); // setAuthは依存配列に残す

  return <Component {...pageProps} />;
}

export default function App(props: AppProps) {
  return (
    <>
      <Head>
        <title>ifメモ</title>
        <meta property="og:title" content="ifメモ" />
        <meta property="og:description" content="ユーザーの思い出のifの世界線を見せてくれるアプリ" />
        <meta property="og:image" content="/images/metaLog.png" />
        <meta property="og:url" content="https://if-memory.vercel.app/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name='twitter:title' content='ifメモ' />
        <meta name='twitter:description' content='ユーザーの思い出のifの世界線を見せてくれるアプリ' />
        <meta name='twitter:image' content='https://if-memory.vercel.app/images/metaLog.png' />
      </Head>
      <RecoilRoot>
        <div className="bg-[#e0ffff] min-h-screen">
          <Header />
          <MyApp {...props} />
        </div>
      </RecoilRoot>
    </>
  );
}
