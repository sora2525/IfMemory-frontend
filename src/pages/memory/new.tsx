import { useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { authState } from "@/atom/authAtom"; 
import { Form } from "../../components/Form";

export default function CreateAi() {
    const router = useRouter();
    const auth = useRecoilValue(authState); 

    useEffect(() => {
        if (!auth.isAuthenticated) {
            // 未認証の場合はログインページへ
            router.push("/sign_in");
        }
    }, [auth.isAuthenticated, router]);

    // 認証されている場合は表示
    return (
        <>
            {auth.isAuthenticated && <Form />}
        </>
    );
}
