import React, { useEffect } from "react";
import { Fragment } from "react";
import HistoryDetailMenu from "../components/dashboard/HistoryDetailMenu";

function HistoryDetailPage() {
  useEffect(() => {
    window.scroll(0, 0);
    document.title = "TNOS | Detail History Page";
    // fetchDetailProduct();
  }, []);

  return (
    <Fragment>
      <HistoryDetailMenu />
    </Fragment>
  );
}

export default HistoryDetailPage;
