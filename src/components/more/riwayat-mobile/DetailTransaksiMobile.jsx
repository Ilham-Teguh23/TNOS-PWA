import React, { useEffect, useState } from "react";
import PaddingPwa from "../../moleculars/PaddingPwa";
import ButtonComponent from "../../atoms/ButtonComponent";
import Gap from "../../moleculars/Gap";
import TitleHeader from "../../utils/TitleHeader";
import {
  badanHukumList,
  paymentBadanHukum,
} from "../../../redux/action/paymentAction";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ContentDetailCheckout from "../../moleculars/ContentDetailCheckout";
import { getNameLayanan } from "../../utils/layananService";
import HeaderCheckoutLayanan from "../../moleculars/HeaderCheckoutLayanan";
import { useFormik } from "formik";
import Iframe from "react-iframe";
import ModalComponent from "../../moleculars/ModalComponent";
import CheckoutValue from "../../moleculars/CheckoutValue";
import { getParams } from "../../moleculars/GetParams";
import { decode as base64_decode } from "base-64";
var CryptoJS = require("crypto-js");
const secretKey = `${process.env.REACT_APP_SECRET_KEY}`;

function DetailTransaksiMobile() {
  TitleHeader("Halaman rincian riwayat");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("data")));
  const params = useParams();
  const dispatch = useDispatch();
  const storeData = useSelector((store) => store?.global);
  const navigate = useNavigate();
  const { detail_data_layanan } = storeData;

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    dispatch(await badanHukumList(user?.id));
  };

  useEffect(() => {
    checkParams();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkParams = () => {
    let checkP = getParams(["query"]);

    if (!checkP) {
      console.log("params tidak ditemukan");
    } else {
      var base64regex =
        /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
      if (!base64regex.test(checkP.query)) {
        console.log("data base64 tidak cocok");
        navigate("/not-found");
      } else {
        let string = base64_decode(checkP.query);
        let cryptdata = string;
        const info2x = CryptoJS.AES.decrypt(cryptdata, secretKey).toString(
          CryptoJS.enc.Utf8
        );

        if (!info2x) {
          console.log("data base64 not match when decrypt");
        } else {
          var paramValue = JSON.parse(info2x);
          console.log(paramValue.id);
          setUser(paramValue);
          localStorage.setItem("data", JSON.stringify(paramValue));
        }
        if (!localStorage.getItem("data")) {
          if (!paramValue) {
            console.log("salah");
            navigate("/not-found");
          }
        }
      }
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      order_id: params?.id,
    },
    onSubmit: async (values) => {
      dispatch(await paymentBadanHukum(values));
    },
  });

  const renderButton = () => {
    if (detail_data_layanan?.payment_status === "ORDER") {
      return (
        <ButtonComponent
          typeButton="rincian"
          others={
            <CheckoutValue
              title="Total Pembayaran"
              value={detail_data_layanan?.order_total}
              color="var(--font-color10)"
              number={true}
            />
          }
          title="Bayar Sekarang "
          type="submit"
        />
      );
    } else if (detail_data_layanan?.payment_status === "UNPAID") {
      return (
        <ButtonComponent
          typeButton="rincian"
          others={
            <CheckoutValue
              title="Total Pembayaran"
              value={detail_data_layanan?.order_total}
              color="var(--font-color10)"
              number={true}
            />
          }
          border="#fef5e8"
          background="#fef5e8"
          color="#f99f1b"
          title="Klik untuk membayar"
          type="button"
          onClick={() =>
            (window.location = `${process.env.REACT_APP_API_INVOICE_URL}${detail_data_layanan?.invoice_id}`)
          }
        />
      );
    } else if (detail_data_layanan?.payment_status === "EXPIRED") {
      return (
        <ButtonComponent
          typeButton="rincian"
          others={
            <CheckoutValue
              title="Total Pembayaran"
              value={detail_data_layanan?.order_total}
              color="var(--font-color10)"
              number={true}
            />
          }
          background="var(--font-color11)"
          color="var(--bg-color7)"
          border="var(--font-color11)"
          title="Gagal"
          type="button"
          //   onClick={() => navigate(`/account/profile/change/${id}`)}
        />
      );
    } else {
      return (
        <ButtonComponent
          typeButton="rincian"
          others={
            <CheckoutValue
              title="Total Pembayaran"
              value={detail_data_layanan?.order_total}
              color="var(--font-color10)"
              number={true}
            />
          }
          border="var(--font-color12)"
          background="var(--font-color12)"
          color="var(--bg-color2)"
          title="Sudah Dibayar"
          type="button"
          //   onClick={() => navigate(`/account/profile/change/${id}`)}
        />
      );
    }
  };

  return (
    <>
      <div className="container-class">
        <div className="responsive-class">
          <div className="res-class">
            <div className="dashboard-container-f" style={{ marginTop: "0px" }}>
              {detail_data_layanan?.payment_status === "ORDER" ||
              detail_data_layanan?.payment_status === "UNPAID" ? (
                // <div className="container-ketentuan-f">
                //   <p>
                //     Dengan melakukan pemesanan, saya setuju dengan syarat dan
                //     ketentuan berikut:{" "}
                //     <span
                //       style={{ color: "#F99F1B", cursor: "pointer" }}
                //       onClick={() => setIsModalVisible(!isModalVisible)}
                //     >
                //       (Klik untuk membaca)
                //     </span>
                //   </p>
                // </div>
                ""
              ) : (
                ""
              )}

              <PaddingPwa padding={15}>
                <HeaderCheckoutLayanan
                  layanan={getNameLayanan(
                    detail_data_layanan?.tnos_service_id,
                    detail_data_layanan?.tnos_subservice_id
                  )}
                  payment_status={detail_data_layanan?.status_order}
                />

                <ContentDetailCheckout
                  layanan={getNameLayanan(
                    detail_data_layanan?.tnos_service_id,
                    detail_data_layanan?.tnos_subservice_id
                  )}
                  data={detail_data_layanan}
                />
              </PaddingPwa>
              <Gap height={120} />
              <form action="" onSubmit={formik.handleSubmit}>
                {renderButton()}
              </form>
            </div>
          </div>
        </div>
      </div>
      <ModalComponent
        isModalVisible={isModalVisible}
        setModalVisible={setIsModalVisible}
        // onClick={}
        type="pembatalan"
      >
        <PaddingPwa padding={5}>
          <Iframe
            url="https://tnosbantuan.freshdesk.com/support/solutions/articles/150000042230"
            width="100%"
            height="100%"
            styles={{ minHeight: "100vh" }}
            id=""
            className=""
            display="block"
            position="relative"
          />
        </PaddingPwa>
      </ModalComponent>
    </>
  );
}

export default DetailTransaksiMobile;
