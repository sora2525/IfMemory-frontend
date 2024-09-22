import { authState } from "@/atom/authAtom";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { RecoilRoot, useSetRecoilState } from "recoil";
import Cookies from "js-cookie";

function MyApp({ Component, pageProps }: AppProps) {
  const setAuth = useSetRecoilState(authState);

  useEffect(() => {
    const accessToken = Cookies.get("access-token");
    const client = Cookies.get("client");
    const uid = Cookies.get("uid");

    if (accessToken && client && uid) {
      setAuth({ accessToken, client, uid });
    }
  }, [setAuth]);

  return <Component {...pageProps} />;
}

export default function App(props: AppProps) {
  return (
    <RecoilRoot>
      <MyApp {...props} />
    </RecoilRoot>
  );
}
