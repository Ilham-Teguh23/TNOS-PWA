import React from "react";
import { Fragment } from "react";
import MenuFooter from "../components/cummon/MenuFooter";
import UpdateProfileMenu from "../components/dashboard/UpdateProfileMenu";

function UpdateProfilePage() {
  return (
    <Fragment>
      <UpdateProfileMenu />
      <MenuFooter footer={false} />
    </Fragment>
  );
}

export default UpdateProfilePage;
