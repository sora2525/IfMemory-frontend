// components/DeleteButton.tsx

import React from "react";
import { axiosInstance } from "@/lib/axiosInstance";

interface DeleteButtonProps {
  id: number; // 削除するAIテキストのID
  onDelete: () => void; // 削除後に実行されるコールバック
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ id, onDelete }) => {
  const handleDelete = async () => {
    const confirmDelete = window.confirm("このAIテキストを削除してもよろしいですか？");
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/ai_texts/${id}`); // 削除リクエストを送信
      onDelete(); // 削除後にコールバックを呼び出す
    } catch (error) {
      console.error("削除中にエラーが発生しました:", error);
      alert("削除に失敗しました。");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
    >
      削除
    </button>
  );
};

export default DeleteButton;
