import React, { useEffect, useState } from "react";
import PaddingPwa from "../../moleculars/PaddingPwa";
import ButtonComponent from "../../atoms/ButtonComponent";
import Gap from "../../moleculars/Gap";
import ContentDetailCheckout from "../../moleculars/ContentDetailCheckout";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  badanHukumList,
  paymentBadanHukum,
} from "../../../redux/action/paymentAction";
import { getNameLayanan } from "../../utils/layananService";
import { useFormik } from "formik";
import HeaderCheckoutLayanan from "../../moleculars/HeaderCheckoutLayanan";
import TitleHeader from "../../utils/TitleHeader";
import ModalComponent from "../../moleculars/ModalComponent";
import Iframe from "react-iframe";
import CheckoutValue from "../../moleculars/CheckoutValue";

function DetailSolusiHukumMobile() {
  TitleHeader("Halaman rincian");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const storeData = useSelector((store) => store?.global);
  const { detail_data_layanan } = storeData;

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    dispatch(await badanHukumList(params?.id));
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
    if (detail_data_layanan?.detail?.payment_status === "ORDER") {
      return (
        <ButtonComponent
          others={
            <CheckoutValue
              title="Total Pembayaran"
              value={detail_data_layanan?.detail?.order_total}
              color="var(--font-color10)"
              number={true}
            />
          }
          title="Bayar Sekarang "
          type="submit"
        />
      );
    } else if (detail_data_layanan?.detail?.payment_status === "UNPAID") {
      return (
        <ButtonComponent
          others={
            <CheckoutValue
              title="Total Pembayaran"
              value={detail_data_layanan?.detail?.order_total}
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
            (window.location = `${process.env.REACT_APP_API_INVOICE_URL}${detail_data_layanan?.detail?.invoice_id}`)
          }
        />
      );
    } else if (detail_data_layanan?.detail?.payment_status === "EXPIRED") {
      return (
        <ButtonComponent
          others={
            <CheckoutValue
              title="Total Pembayaran"
              value={detail_data_layanan?.detail?.order_total}
              color="var(--font-color10)"
              number={true}
            />
          }
          background="var(--font-color11)"
          color="var(--bg-color7)"
          border="var(--font-color11)"
          title="Sudah Dibayar"
          type="button"
          //   onClick={() => navigate(`/account/profile/change/${id}`)}
        />
      );
    } else {
      return (
        <ButtonComponent
          others={
            <CheckoutValue
              title="Total Pembayaran"
              value={detail_data_layanan?.detail?.order_total}
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
      {/* <TopNewNav title="Ringkasan" path={"/comprehensive-Legal-solutions"} /> */}
      <div className="container-class">
        <div className="responsive-class">
          <div className="res-class">
            <div className="dashboard-container-f" style={{ marginTop: "0px" }}>
              {/* <div className="container-ketentuan-f">
                <p>
                  Dengan melakukan pemesanan, saya setuju dengan syarat dan
                  ketentuan berikut:{" "}
                  <span
                    style={{ color: "#F99F1B", cursor: "pointer" }}
                    onClick={() => setIsModalVisible(!isModalVisible)}
                  >
                    (Klik untuk membaca)
                  </span>
                </p>
              </div> */}
              <PaddingPwa padding={15}>
                <HeaderCheckoutLayanan
                  layanan={getNameLayanan(
                    detail_data_layanan?.detail?.tnos_service_id,
                    detail_data_layanan?.detail?.tnos_subservice_id
                  )}
                  payment_status={detail_data_layanan?.detail?.payment_status}
                />

                <ContentDetailCheckout
                  layanan={getNameLayanan(
                    detail_data_layanan?.detail?.tnos_service_id,
                    detail_data_layanan?.detail?.tnos_subservice_id
                  )}
                  data={detail_data_layanan?.detail}
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

export default DetailSolusiHukumMobile;
