import React, { useEffect, useState } from "react";
import TopNewNav from "../../moleculars/TopNewNav";
import NavigateButtomNew from "../../moleculars/NavigateButtomNew";
import PaddingPwa from "../../moleculars/PaddingPwa";
import Gap from "../../moleculars/Gap";
import LabelComponent from "../../atoms/LabelComponent";
import TitleHeader from "../../utils/TitleHeader";
import { useNavigate } from "react-router-dom";
import ContentTitleValue from "../../moleculars/ContentTitleValue";
import { useDispatch, useSelector } from "react-redux";
import { UserHistoryTransaction } from "../../../redux/action/paymentAction";
import { converterDate } from "../../utils/convertDate";
import {
  getNameLayanan,
  getStatusOrder,
  getStatusPayment,
  getTypeStatusPayment,
} from "../../utils/layananService";
import Select from "react-select";
import NoTransactionComponent from "../../moleculars/NoTransactionComponent";
import { useTranslation } from "react-i18next";
import { icon } from "../../utils/IconLayananService";
import P1 from "../../../assets/images/P1-NEW.png";
import axios from "axios";

function RiwayatTransaksi() {
  TitleHeader("Halaman riwayat");
  var user = JSON.parse(localStorage.getItem("userInfo"));
  const dispatch = useDispatch();
  const storeData = useSelector((store) => store?.global);
  const { list_history_by_user } = storeData;
  const { t } = useTranslation();
  const type = "tnos";

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    dispatch(await UserHistoryTransaction(user?.mmbr_code, type));
  };

  const HaveTransaction = ({ list_history_by_user, user }) => {
    const navigate = useNavigate();

    const [layananId, setLayananId] = useState("");

    const [options, setOptions] = useState([
      { value: "", label: t("history4") },
      { value: "1", label: t("history7") },
      { value: "2", label: t("layanan7") },
      { value: "3", label: "Guard" },
    ]);

    // useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       const response = await axios.get(
    //         `${process.env.REACT_APP_API_PWA}/dashboard/pwa-revamp/provider`
    //       );

    //       let filteredData = [];

    //       filteredData = response.data.data.provider.filter(
    //         (item) => item.status === "1"
    //       );

    //       const dynamicOptions = filteredData.map((item) => ({
    //         value: item.id,
    //         label: item.name_sc,
    //       }));

    //       setOptions((prevOptions) => [...prevOptions, ...dynamicOptions]);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };

    //   fetchData();
    // }, []);

    let renderData = "";
    if (list_history_by_user) {

      renderData = !layananId
        ? list_history_by_user &&
          list_history_by_user?.map((row, key) => {
            const width =
              (row?.tnos_service_id === "3" &&
                row?.tnos_subservice_id === "8") ||
              (row?.tnos_service_id === "6" && row?.tnos_subservice_id === "1")
                ? { width: "55px" }
                : { width: "" };

            return (
              <div
                key={key}
                className="content-hhg"
                onClick={() => navigate(`/history/${row?.id}`)}
              >
                <img
                  src={
                    row?.tnos_service_id === "6" &&
                    row?.tnos_subservice_id === "1"
                      ? P1
                      : icon(
                          getNameLayanan(
                            row?.tnos_service_id,
                            row?.tnos_subservice_id
                          )
                        )
                  }
                  alt=""
                  style={width}
                />
                <div className="container-info-s">
                  <ContentTitleValue
                    type="title"
                    title={getNameLayanan(
                      row?.tnos_service_id,
                      row?.tnos_subservice_id
                    )}
                    value={`Rp ${row?.order_total?.toLocaleString()}`}
                  />
                  <ContentTitleValue
                    type={getTypeStatusPayment(row.payment_status)}
                    title={`${t("history8")}:`}
                    value={getStatusPayment(row.payment_status)}
                  />
                  <ContentTitleValue
                    type={
                      row.status_order == "001"
                        ? "menunggu"
                        : row.status_order == "RUN"
                        ? "waiting"
                        : "success"
                    }
                    title={`${t("history9")}:`}
                    value={getStatusOrder(row.status_order)}
                  />
                  <ContentTitleValue
                    title={`${t("history10")}:`}
                    value={converterDate(row.created_at)}
                  />
                  <ContentTitleValue
                    title={`${t("history11")}:`}
                    value={
                      row.expiry_date ? converterDate(row.expiry_date) : "-"
                    }
                  />
                </div>
              </div>
            );
          })
        : list_history_by_user &&
          list_history_by_user
            ?.filter((row) => {
              if (layananId === "") {
                return true;
              } else if (layananId === "1") {
                return (
                  row.tnos_service_id === "3" && row.tnos_subservice_id === "7"
                );
              } else if (layananId === "2") {
                return (
                  row.tnos_service_id === "3" && row.tnos_subservice_id === "8"
                );
              } else if (layananId === "3") {
                return (
                  row.tnos_service_id === "6" && row.tnos_subservice_id === "1"
                );
              } else {
                return false;
              }
            })
            .map((row, key) => {
              const width =
                (row?.tnos_service_id === "3" && row?.tnos_subservice_id === "8") ||
                (row?.tnos_service_id === "6" && row?.tnos_subservice_id === "1")
                  ? { width: "55px" }
                  : { width: "" };

              return (
                <div
                  key={key}
                  className="content-hhg"
                  onClick={() => navigate(`/history/${row?.id}`)}
                >
                  <img
                    src={icon(
                      getNameLayanan(
                        row?.tnos_service_id,
                        row?.tnos_subservice_id
                      )
                    )}
                    alt=""
                    style={width}
                  />
                  <div className="container-info-s">
                    <ContentTitleValue
                      type="title"
                      title={getNameLayanan(
                        row?.tnos_service_id,
                        row?.tnos_subservice_id
                      )}
                      value={`Rp ${row?.order_total?.toLocaleString()}`}
                    />
                    <ContentTitleValue
                      type={getTypeStatusPayment(row.payment_status)}
                      title={`${t("history8")}:`}
                      value={getStatusPayment(row.payment_status)}
                    />
                    <ContentTitleValue
                      type={
                        row.status_order == "001"
                          ? "menunggu"
                          : row.status_order == "RUN"
                          ? "waiting"
                          : "success"
                      }
                      title={`${t("history9")}:`}
                      value={getStatusOrder(row.status_order)}
                    />
                    <ContentTitleValue
                      title={`${t("history10")}:`}
                      value={converterDate(row.created_at)}
                    />
                    <ContentTitleValue
                      title={`${t("history11")}:`}
                      value={
                        row.expiry_date ? converterDate(row.expiry_date) : "-"
                      }
                    />
                  </div>
                </div>
              );
            });
    }
    return (
      <div className="have-transaction-container">
        <div className="form-group mb-2">
          <LabelComponent label={t("history3")} />
          <Select
            onChange={(e) => setLayananId(e.value)}
            options={options}
            value={
              options.find((option) => {
                return option.value === layananId;
              }) || null
            }
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                // borderColor: state.isFocused ? "grey" : "red",
                padding: "0.18rem",
                fontSize: "0.9rem",
              }),
            }}
          />
        </div>
        <div className="container-transaction-f-g">{renderData}</div>
      </div>
    );
  };

  return (
    <>
      <TopNewNav
        path={`/dashboard`}
        type="noNav"
        background="transparent"
        title={t("history1")}
      />
      <div className="container-class">
        <div className="responsive-class">
          <div className="res-class">
            <div
              className="dashboard-container-f"
              style={{ marginTop: "60px" }}
            >
              <PaddingPwa padding={15}>
                {list_history_by_user.length > 0 ? (
                  <HaveTransaction
                    user={user}
                    list_history_by_user={list_history_by_user}
                  />
                ) : (
                  <NoTransactionComponent title={t("history2")} />
                )}
                {/* <NoTransactionComponent title="Belum ada transaksi" /> */}
              </PaddingPwa>
            </div>
            <Gap height={80} />
            <NavigateButtomNew />
          </div>
        </div>
      </div>
    </>
  );
}

export default RiwayatTransaksi;
