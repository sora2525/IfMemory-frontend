// types/TextType.ts
export interface UserType {
    id: number;
    name: string;
}

export interface TextType {
    id: number;
    title: string;
    question: string;
    answer: string | null;
    if_text: string;
    user: UserType; // ユーザー情報を追加
}
