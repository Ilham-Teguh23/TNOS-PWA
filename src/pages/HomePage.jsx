import React, { Fragment } from "react";
import { useState } from "react";
import SliderWelcomePage from "../components/home/SliderWelcomePage";
// import ButtonWelcomePage from "../components/home/ButtonWelcomePage";
import Loader from "../components/cummon/Loader";
import { useEffect } from "react";

function HomePage() {
  const [load, setLoad] = useState(true);

  useEffect(() => {
    window.scroll(0, 0);
    document.title = "TNOS | Login Page";
    setTimeout(() => setLoad(false), 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return load === false ? (
    <Fragment>
      {/* <NavDesktop iconNav={this.state.iconNav} /> */}
      {/* <div className="margin-nav"> */}
      <SliderWelcomePage />

      {/* </div> */}
      {/* <FooterDesktop /> */}
      {/* <MenuFooter /> */}
    </Fragment>
  ) : (
    <Loader />
  );
}

export default HomePage;
// import React, { Component, Fragment } from "react";
// // import NavDesktop from "../components/cummon/NavDesktop";
// import SliderWelcomePage from "../components/home/SliderWelcomePage";
// import ButtonWelcomePage from "../components/home/ButtonWelcomePage";
// // import FooterDesktop from "../components/cummon/FooterDesktop";
// // import MenuFooter from "../components/cummon/MenuFooter";
// import Loader from "../components/cummon/Loader";
// // import MenuCategoriAbsolute from "../components/cummon/MenuCategoriAbsolute";

// export class HomePage extends Component {
//   state = {
//     loadingPage: true,
//     iconNav: "FaSignInAlt",
//   };
//   constructor() {
//     super();
//     setTimeout(() => this.setState({ loadingPage: false }), 1000);
//   }

//   componentDidMount() {
//     window.scroll(0, 0);
//     document.title = "TNOS | Welcome Home Page";
//   }
//   render() {
//     return this.state.loadingPage === false ? (
//       <Fragment>
//         {/* <NavDesktop iconNav={this.state.iconNav} /> */}
//         {/* <div className="margin-nav"> */}
//         <SliderWelcomePage />
//         <ButtonWelcomePage />
//         {/* </div> */}
//         {/* <FooterDesktop /> */}
//         {/* <MenuFooter /> */}
//       </Fragment>
//     ) : (
//       <Loader />
//     );
//   }
// }

// export default HomePage;
