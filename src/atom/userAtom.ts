import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    id: null,
    name: null,
  } as { id: number | null; name: string | null }, // 型の指定
});
