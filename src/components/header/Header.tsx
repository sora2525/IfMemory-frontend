import Image from "next/image";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { authState } from "@/atom/authAtom";
import { LogoutButton } from "../button/LogoutButton";

export function Header() {
    const auth = useRecoilValue(authState);

    return (
        <header className="bg-red-50">
            <div className="  flex justify-between items-center py-4 px-6">
                {/* ロゴ */}
                <Link href="/">
                    <Image
                        src="/images/ifメモ_logo_horizontal-full_800X306_colored-removebg-preview.png"
                        alt="Logo"
                        width={150}
                        height={0}
                        className="cursor-pointer lg:w-[200px]"
                    />
                </Link>

                {/* リンクとか */}
                <div className="flex items-center space-x-4 ">
                    {!auth.isAuthenticated ? (
                        <>
                            <Link href="/user/sign_in" className="hover:text-blue-400 text-base sm:text-xl lg:text-2xl">
                                ログイン
                            </Link>
                            <Link href="/user/sign_up" className="hover:text-blue-400 text-base sm:text-xl lg:text-2xl">
                                新規登録
                            </Link>
                        </>
                    ) : (
                        <>
                            {/* 名前の表示とログアウトボタン */}
                            <p className="text-gray-800 hidden sm:block">
                                ようこそ <span className="font-semibold text-base sm:text-xl lg:text-2xl">
                                    {auth.user?.name && auth.user.name.length > 8
                                        ? `${auth.user.name.slice(0, 8)}...`
                                        : auth.user?.name || 'ゲスト'}
                                </span> さん
                            </p>
                            <LogoutButton />
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
