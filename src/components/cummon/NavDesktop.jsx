import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo_tenos.png";

import { Fragment } from "react";
import { useSelector } from "react-redux";

// import logo from "../../assets/images/android-chrome-192x192.png";

function NavDesktop() {
  const storeData = useSelector((store) => store?.users);
  const { userInfo } = storeData;

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg fixed-top navbar-relative">
        <div className="nav-desktop">
          <div className="nav-navigation-top">
            <div className="profile-dwd">
              {userInfo?.mmbr_name ? userInfo.mmbr_name : ""}
            </div>
            <div className="navbar-brand">
              <Link className="" to="/">
                <img src={logo} alt="" className="logo-tnos-dajda" />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
}

export default NavDesktop;
// import React, { Component, Fragment } from "react";
// import { Link } from "react-router-dom";
// import logo from "../../assets/images/logo_tenos.png";
// import { FaQuestion, FaSearch, FaTimesCircle } from "react-icons/fa";

// export class NavDesktop extends Component {
//   constructor() {
//     super();
//     this.state = {
//       searchAction: "hide-content",
//       iconButton: "FaSearch",
//     };
//   }
//   scroll(element) {
//     const section = document.querySelector(element);
//     section.scrollIntoView({ behavior: "smooth", block: "start" });
//   }
//   searchHandler = () => {
//     this.searchOpenClose();
//   };
//   searchOpenClose = () => {
//     let searchAction = this.state.searchAction;
//     let iconButton = this.state.iconButton;

//     if (searchAction === "hide-content") {
//       this.setState({
//         searchAction: "",
//       });
//     } else {
//       this.setState({
//         searchAction: "hide-content",
//       });
//     }
//     if (iconButton === "FaSearch") {
//       this.setState({
//         iconButton: "FaTimesCircle",
//       });
//     } else {
//       this.setState({
//         iconButton: "FaSearch",
//       });
//     }
//   };
//   render() {
//     let icon, iconNav;
//     if (this.state.iconButton === "FaSearch") {
//       icon = <FaSearch />;
//     } else {
//       icon = <FaTimesCircle />;
//     }
//     if (this.props.iconNav === "FaSignInAlt") {
//       iconNav = (
//         <button
//           onClick={() => window.location.replace("/#login-menu")}
//           className="btn btn-search-action"
//         >
//           <FaQuestion />
//         </button>
//       );
//     } else {
//       iconNav = (
//         <button onClick={this.searchHandler} className="btn btn-search-action">
//           {icon}
//         </button>
//       );
//     }
//     return (
//       <Fragment>
//         <nav className="navbar navbar-expand-lg fixed-top navbar-relative">
//           <div className="nav-desktop">
//             <div className="nav-navigation-top">
//               <div className="navbar-brand">
//                 <Link className="" to="/">
//                   <img src={logo} alt="" />
//                 </Link>
//               </div>
//               <div className="search-logo ">{iconNav}</div>
//             </div>
//             <div className={`search-action ${this.state.searchAction}`}>
//               <input
//                 placeholder="Masukan pencarian....."
//                 className="input-search form-control "
//                 type="text"
//               />
//               <button className="btn btn-search-action-submit">
//                 <FaSearch />
//               </button>
//             </div>
//           </div>
//         </nav>
//       </Fragment>
//     );
//   }
// }

// export default NavDesktop;
