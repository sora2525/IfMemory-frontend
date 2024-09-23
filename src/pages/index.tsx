import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { LogoutButton } from '@/components/button/LogoutButton';
import { authState } from '@/atom/authAtom';

export default function Home() {
  const auth = useRecoilValue(authState);

  return (
    <>
      <Link href="/ai">フォームへ</Link>

      {!auth.isAuthenticated ? (
        <>
          <Link href="/user/sign_in">ログインする</Link>
          <Link href="/user/sign_up">新規登録</Link>
        </>
      ) : (
        <>
          {/* auth.user が null でない場合のみ name を表示 */}
          <p>ようこそ{auth.user?.name || 'ゲスト'}さん</p>
          <LogoutButton />
        </>
      )}
    </>
  );
}
