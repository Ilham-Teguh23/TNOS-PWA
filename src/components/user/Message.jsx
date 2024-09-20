// import { Skeleton } from "@mui/material";
import React from "react";
// import { useEffect } from "react";
import { Fragment } from "react";
import { FaArrowLeft } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TitleHeader from "../utils/TitleHeader";
// import agen_tnos from "../../assets/images/agen-tnos.png";
// import rp from "../../assets/images/rp.png";
// import {
//   countUnreadMessage,
//   fetchMessageUserByIdAction,
//   readMessage,
// } from "../../redux/slices/users/UserSlices";

function Message() {
  TitleHeader("Pesan");
  // const dispatch = useDispatch();
  // const storeData = useSelector((store) => store?.users);
  // const { userInfo, message, loading, read, unread } = storeData;

  // useEffect(() => {
  //   dispatch(fetchMessageUserByIdAction(userInfo?.mmbr_code));
  //   dispatch(countUnreadMessage(userInfo?.mmbr_code));
  // }, [dispatch, userInfo, read]);

  return (
    <Fragment>
      <div className="responsive-class">
        <div className="res-class">
          <div className="nav-top-login">
            <Link to="/dashboard" className="btn nav-back-arrow">
              <FaArrowLeft className="hhagwd" />
              <h5 className="title-kasnadkw">Pesan</h5>
            </Link>
          </div>
          <div className="njwdjhwk">
            <div>Data Kosong</div>
          </div>
        </div>
      </div>
    </Fragment>
    // <Fragment>
    //   {loading ? (
    //     <div className="responsive-class">
    //       <div className="res-class">
    //         <div className="nav-top-login">
    //           <Link to="/dashboard" className="btn nav-back-arrow">
    //             <FaArrowLeft className="hhagwd" />
    //             <h5 className="title-kasnadkw">Pesan</h5>
    //           </Link>
    //         </div>
    //         <div className="njwdjhwk">
    //           <hr />
    //           <div className="pesan-hdwh mb-2">
    //             <div className="d-flex">
    //               <div className="image-dwad">
    //                 <Skeleton variant="circular" width="75px" height="75px" />
    //               </div>
    //               <div className="dwad w-100">
    //                 <Skeleton width="150px" height={32} />
    //                 <Skeleton width="250px" height={22} />
    //                 <Skeleton width="250px" height={22} />
    //                 <Skeleton width="250px" height={22} />
    //               </div>
    //             </div>
    //           </div>
    //           <div className="pesan-hdwh mb-2">
    //             <div className="d-flex">
    //               <div className="image-dwad">
    //                 <Skeleton variant="circular" width="75px" height="75px" />
    //               </div>
    //               <div className="dwad w-100">
    //                 <Skeleton width="150px" height={32} />
    //                 <Skeleton width="250px" height={22} />
    //                 <Skeleton width="250px" height={22} />
    //                 <Skeleton width="250px" height={22} />
    //               </div>
    //             </div>
    //           </div>
    //           <div className="pesan-hdwh mb-2">
    //             <div className="d-flex">
    //               <div className="image-dwad">
    //                 <Skeleton variant="circular" width="75px" height="75px" />
    //               </div>
    //               <div className="dwad w-100">
    //                 <Skeleton width="150px" height={32} />
    //                 <Skeleton width="250px" height={22} />
    //                 <Skeleton width="250px" height={22} />
    //                 <Skeleton width="250px" height={22} />
    //               </div>
    //             </div>
    //           </div>
    //           <div className="pesan-hdwh mb-2">
    //             <div className="d-flex">
    //               <div className="image-dwad">
    //                 <Skeleton variant="circular" width="75px" height="75px" />
    //               </div>
    //               <div className="dwad w-100">
    //                 <Skeleton width="150px" height={32} />
    //                 <Skeleton width="250px" height={22} />
    //                 <Skeleton width="250px" height={22} />
    //                 <Skeleton width="250px" height={22} />
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   ) : (
    //     <div className="responsive-class">
    //       <div className="res-class">
    //         <div className="nav-top-login">
    //           <Link to="/dashboard" className="btn nav-back-arrow">
    //             <FaArrowLeft className="hhagwd" />
    //             <h5 className="title-kasnadkw">Pesan</h5>
    //           </Link>
    //         </div>
    //         <div className="njwdjhwk">
    //           <hr />

    //           {unread > 0 ? (
    //             <b className="wdadhg">
    //               Unread messages:
    //               <span className="dawdaw">{unread}</span>
    //             </b>
    //           ) : (
    //             <b className="wdadhg">All messages have been read:</b>
    //           )}
    //           {message?.length > 0 ? (
    //             message?.map((row, key) => {
    //               let des = JSON.parse(row.description);
    //               return (
    //                 <div
    //                   className={`pesan-hdwh ${
    //                     row.status_message === "0" ? "unread" : ""
    //                   }  mb-2`}
    //                   onClick={() => {
    //                     if (row.status_message === "0") {
    //                       dispatch(readMessage(row?.message_id));
    //                     }
    //                   }}
    //                 >
    //                   <div className="row">
    //                     <div className="col-3">
    //                       <img src={agen_tnos} alt="" className="w-100" />
    //                     </div>
    //                     <div className="col-9">
    //                       <h5 className="title-pesan-hhada">{des?.title}</h5>
    //                       <p className="p-pesan-hhada">{des?.description}</p>
    //                       <p className="datetime-pesan-kdw">
    //                         {/* 31 Okt, 11 : 48 AM */}
    //                         {row?.created_at_message}
    //                       </p>
    //                     </div>
    //                   </div>
    //                 </div>
    //               );
    //             })
    //           ) : (
    //             <div style={{ textAlign: "center" }}> Data kosong </div>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </Fragment>
  );
}

export default Message;
