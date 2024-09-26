import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { axiosInstance } from "@/lib/axiosInstance";
import { authState } from "@/atom/authAtom";

export function LogoutButton() {
    const [, setAuth] = useRecoilState(authState); // authを未使用のため、配列の最初の要素を無視
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const Logout = async () => {
        try {
            await axiosInstance.delete("/auth/sign_out");
            Cookies.remove("access-token");
            Cookies.remove("client");
            Cookies.remove("uid");
            Cookies.remove("username");
            setAuth({ isAuthenticated: false, user: null });
            router.push("/");
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(`ログアウトに失敗しました: ${e.message}`);
            } else {
                setError("ログアウトに失敗しました");
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        Logout();
    };

    return (
        <>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button onClick={handleSubmit} className="hover:text-blue-400 text-base sm:text-xl lg:text-2xl">ログアウト</button>
        </>
    );
}
