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
     {!auth.accessToken && <Link href="/user/sign_in">ログインする</Link>}
     {auth.accessToken && <LogoutButton/>}

   </>
  );
}
