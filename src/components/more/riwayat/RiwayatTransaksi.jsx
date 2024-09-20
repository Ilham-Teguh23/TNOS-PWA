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

    const options = [
      { value: "", label: t("history4") },
      { value: "1", label: t("history5") },
      { value: "2", label: t("history6") },
      { value: "3", label: t("history7") },
    ];

    let renderData = "";
    if (list_history_by_user) {
      // console.log(list_history_by_user)
      renderData = !layananId
        ? list_history_by_user &&
          list_history_by_user?.map((row, key) => {
            const width = row?.tnos_service_id == 3 && row?.tnos_subservice_id == 8 ? { width: '55px' } : {width: ''};
           
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
                    type={row.status_order == "001" ? 'menunggu' : row.status_order == "RUN" ? "waiting" : "success" }
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
            ?.filter((row) => row.tnos_service_id === layananId)
            .map((row, key) => {
              const width = row?.tnos_service_id == 3 && row?.tnos_subservice_id == 8 ? { width: '55px' } : {width: ''};

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
                      type={row.status_order == "001" ? 'menunggu' : row.status_order == "RUN" ? "waiting" : "success" }
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
            value={layananId?.label}
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
