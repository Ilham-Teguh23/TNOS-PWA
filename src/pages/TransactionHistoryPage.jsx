import React from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import MenuFooter from "../components/cummon/MenuFooter";
import TransactionHistoryMenu from "../components/dashboard/TransactionHistoryMenu";

import { Navigate } from "react-router-dom";

function TransactionHistoryPage() {
  useEffect(() => {
    window.scroll(0, 0);
    document.title = "TNOS | Transaction History Page";
    // fetchDetailProduct();
  }, []);

  if (!localStorage.getItem("isAuthenticated")) {
    return <Navigate to="/login" />;
  }

  return (
    <Fragment>
      <TransactionHistoryMenu />
      <MenuFooter footer={false} />
    </Fragment>
  );
}

export default TransactionHistoryPage;
