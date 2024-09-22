import Link from "next/link";
import { useRecoilValue } from 'recoil';
import { authState } from "@/atom/authAtom";
import { LogoutButton } from "@/components/button/LogoutButton";

export default function Home() {
  const auth = useRecoilValue(authState);

  return (
   <>
     <Link href="/ai">
      フォームへ
     </Link>

     {!auth.accessToken && 
    <>
     <Link href="/user/sign_in">ログインする</Link>
     <Link href="user/sign_up">新規登録</Link>
    </>
     }

     {auth.accessToken &&
     <>
     <p>ようこそ{auth.username}さん</p>
     <LogoutButton/>
     </>}

   </>
  );
}
