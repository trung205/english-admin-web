import ConfirmPopup from "@components/confirm-popup";
import React, { createContext, useState } from "react";

export const ConfirmContext = createContext({});

export const ConfirmProvider = ({ children }: any) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmCallback, setConfirmCallback] = useState<any>(null);

  const handleConfirm = () => {
    setShowConfirm(false); // Đóng ConfirmPopup sau khi xử lý
    if (confirmCallback) {
      confirmCallback(); // Gọi hàm callback để thực hiện các xử lý tiếp theo
      setConfirmCallback(null)
    }
  };

  const handleShowConfirm = (message: string, callback: any) => {
    setShowConfirm(true);
    setConfirmMessage(message);
    setConfirmCallback(() => callback);
  };

  const handleHideConfirm = () => {
    setShowConfirm(false);
  };

  return (
    <ConfirmContext.Provider
      value={{
        showConfirm,
        confirmMessage,
        handleShowConfirm,
        handleHideConfirm,
        handleConfirm,
      }}
    >
      {children}
      <ConfirmPopup />
    </ConfirmContext.Provider>
  );
};
