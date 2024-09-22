import Link from "next/link";
import { useRecoilValue } from 'recoil';
import { LogoutButton } from "@/components/button/LogoutButton";
import { userState } from "@/atom/userAtom";

export default function Home() {
  const user = useRecoilValue(userState);
  console.log("Current user in Home:", user);
  return (
   <>
     <Link href="/ai">
      フォームへ
     </Link>

     {!user.id ? (
  <>
    <Link href="/user/sign_in">ログインする</Link>
    <Link href="/user/sign_up">新規登録</Link>
  </>
) : (
  <>
    <p>ようこそ{user.name}さん</p>
    <LogoutButton />
  </>
)}

   </>
  );
}
