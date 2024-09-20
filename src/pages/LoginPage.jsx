import React, { Fragment } from "react";
import ContentLogin from "../components/auth/ContentLogin";
import { useContext } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

function LoginPage() {
  useEffect(() => {
    window.scroll(0, 0);
    document.title = "TNOS | Login Page";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (localStorage.getItem("isAuthenticated")) {
    var CryptoJS = require("crypto-js");
    const secretKey = `${process.env.REACT_APP_SECRET_KEY}`;
    var bytes = CryptoJS.AES.decrypt(
      localStorage.getItem("isAuthenticated"),
      secretKey
    );
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    if (originalText !== "1") {
      dispatch({
        type: "LOGOUT",
      });
      return <Navigate to="/login" />;
    } else {
      return <Navigate to="/dashboard" />;
    }
  }
  return (
    <Fragment>
      <ContentLogin />
    </Fragment>
  );
}

export default LoginPage;
// import React, { Component, Fragment } from "react";
// import ContentLogin from "../components/auth/ContentLogin";

// export class LoginPage extends Component {
//   componentDidMount() {
//     window.scroll(0, 0);
//     document.title = "TNOS | Login Page";
//   }

//   render() {
//     return (
//       <Fragment>
//         <ContentLogin />
//       </Fragment>
//     );
//   }
// }

// export default LoginPage;

// import React, { Fragment } from "react";
// import { useContext } from "react";
// import { useEffect } from "react";
// import { Navigate } from "react-router-dom";
// import LoginMenu from "../components/auth/LoginMenu";
//

// function LoginPage() {
//

//   useEffect(() => {
//     window.scroll(0, 0);
//     document.title = "TNOS | Login Page";
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
//   if (localStorage.getItem("isAuthenticated")) {
//     var CryptoJS = require("crypto-js");
//     const secretKey = `${process.env.REACT_APP_SECRET_KEY}`;
//     var bytes = CryptoJS.AES.decrypt(
//       localStorage.getItem("isAuthenticated"),
//       secretKey
//     );
//     var originalText = bytes.toString(CryptoJS.enc.Utf8);
//     if (originalText !== "1") {
//       dispatch({
//         type: "LOGOUT",
//       });
//       return <Navigate to="/login" />;
//     } else {
//       return <Navigate to="/dashboard" />;
//     }
//   }
//   return (
//     <Fragment>
//       <LoginMenu />
//     </Fragment>
//   );
// }

// export default LoginPage;
