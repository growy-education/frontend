import React, { useContext } from "react";
import { AlertPanelContext } from "../contexts/AlertPanelContextProvider";
import { AlertBox } from "./AlertBox";

/**
 * Page ComponentのLoadingに失敗した時に表示されるパネル。
 * General.tsxの共通部分（AppBarの下）で描画される。
 */
export const AlertPanel = () => {
  const { alert, clearAlert } = useContext(AlertPanelContext);

  return (
    <AlertBox
      severity={alert.severity}
      title={alert.title}
      description={alert.description}
      onClose={() => clearAlert()}
    />
  );
};
