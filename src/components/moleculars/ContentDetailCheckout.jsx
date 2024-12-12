import React, { useEffect, useState } from "react";
import CheckoutHeader from "./CheckoutHeader";
import CheckoutValue from "./CheckoutValue";
import usaha from "../../assets/images/new pwa icon/usaha.svg";
import users from "../../assets/images/new pwa icon/user.svg";
import location from "../../assets/images/new pwa icon/location.svg";
import time from "../../assets/images/new pwa icon/time.svg";
import Gap from "./Gap";
import moment from "moment";
import { converterDate } from "../utils/convertDate";
import { t } from "i18next";
import { useNavigate, useParams } from "react-router-dom";
import { getParams } from "../moleculars/GetParams";
import { decode as base64_decode } from "base-64";
var CryptoJS = require("crypto-js");
const secretKey = `${process.env.REACT_APP_SECRET_KEY}`;

function ContentDetailCheckout({ layanan, data }) {
  
  const params = useParams();

  const [getP, setP] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("data")));
  const navigate = useNavigate();

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
          setP(checkP.query);
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

  useEffect(() => {
    if (getP != null) {
      checkParams();
    }
  }, []);

  const name_opsi = data?.name_badan_hukum
    ? JSON.parse(data?.name_badan_hukum)
    : "";

  let alamat = "";
  const address = data?.alamat_badan_hukum;
  const isJson = (() => {
    try {
      JSON.parse(address);
      return true;
    } catch (error) {
      return false;
    }
  })();

  alamat = isJson ? JSON.parse(address) : address;

  const saham = data?.pemegang_saham ? JSON.parse(data?.pemegang_saham) : "";
  const saham_c =
    saham &&
    saham?.map((row) => {
      return {
        field1: row.name,
        field2: row.persentase,
      };
    });

  const direksi = data?.susunan_direksi
    ? JSON.parse(data?.susunan_direksi)
    : "";
  const direksi_c =
    direksi &&
    direksi?.map((row) => {
      return {
        field1: row.name,
        field2: row.jabatan,
      };
    });

  const usaha_c = data?.bidang_usaha ? JSON.parse(data?.bidang_usaha) : "";
  const klasifikasi_c = data?.klasifikasi ? JSON.parse(data?.klasifikasi) : "";

  const [getJsonData, setJsonData] = useState([])

  useEffect(() => {
    if (layanan === "PWAN") {
      const fetchPWAN = () => {
        const convert = JSON.parse(data?.history?.json_data);
        const jsonArray = Object.entries(convert);
        setJsonData(jsonArray);
      };
      fetchPWAN();
    }
  }, [layanan, data]);

  const renderContent = () => {
    switch (layanan) {

      case t("sublayanan1"):
        return (
          <>
            <div>
              <CheckoutHeader
                image={usaha}
                title="Informasi Usaha"
                alt="Informasi Usaha"
              />
              <CheckoutValue title="Partner" value={data?.partnerdeka?.name} />
              <CheckoutValue title="Jenis Usaha" value={layanan} />
              <CheckoutValue title="Klasifikasi" value={klasifikasi_c?.label} />
              {name_opsi?.map((row, key) => {
                return (
                  <CheckoutValue
                    key={key}
                    title={`Nama Usaha opsi (${key + 1})`}
                    value={row?.opsi}
                  />
                );
              })}
              <CheckoutValue
                title="Modal Dasar Perusahaan (Fiktif)"
                value={data?.modal_dasar}
                color="var(--font-color3)"
                number={true}
              />
              <CheckoutValue
                title="Jumlah modal yang disetor (Min 25%)"
                value={data?.modal_disetor}
                color="var(--font-color3)"
                number={true}
              />
              <CheckoutValue
                title="No. Telepon / Whatsapp"
                value={data?.phone_badan_hukum}
              />
              <CheckoutValue
                title="Email dan Password"
                value={data?.email_badan_hukum}
              />
              <CheckoutValue
                title="Photo dan Dokumen"
                value={
                  <div className="image-detail-checkout-f">
                    <div className="title"></div>
                    {data?.file_document &&
                      JSON.parse(data?.file_document)?.map((file, key) => (
                        <img
                          key={key}
                          src={file.image_url}
                          alt={file.image_name}
                        />
                      ))}
                  </div>
                }
              />
            </div>
            <Gap height={15} />
            <div>
              <CheckoutHeader
                image={location}
                title="Domisili Usaha"
                alt="Domisili Usaha"
              />
              <CheckoutValue
                title="Domisili Usaha"
                value={alamat?.domisili_sekarang}
              />
              <CheckoutValue
                title="RT/RW"
                value={`${alamat?.rt}/${alamat?.rw}`}
              />
              <CheckoutValue title="Provinsi" value={alamat?.provinsi?.label} />
              <CheckoutValue
                title="Kota/Kabupaten"
                value={alamat?.kabupaten?.label}
              />
              <CheckoutValue
                title="Kecamatan"
                value={alamat?.kecamatan?.label}
              />
              <CheckoutValue
                title="Kelurahan"
                value={alamat?.kelurahan?.label}
              />
              <CheckoutValue title="Kode Pos" value={alamat?.kode_pos} />
            </div>
            <Gap height={15} />
            <div>
              <CheckoutHeader
                image={user}
                title="Informasi Pengguna"
                alt="Informasi Pengguna"
              />
              <CheckoutValue
                title="Susunan Pemegang Saham"
                value={saham_c}
                type="option"
              />
              <CheckoutValue
                opsi="direksi"
                title="Susunan Direksi"
                value={direksi_c}
                type="option"
              />
              <CheckoutValue
                title="Bidang Usaha KBLI 2020 "
                value={usaha_c}
                type="bidang"
              />
            </div>
            <Gap height={15} />
            <div>
              <CheckoutHeader
                image={users}
                title="Rincian Pembayaran"
                alt="Rincian Pembayaran"
              />
              {data?.payment_status !== "EXPIRED"
                ? data?.paid_at && (
                  <CheckoutValue
                    title="Jam Terbayar"
                    color="green"
                    value={converterDate(moment(data?.paid_at))}
                  />
                )
                : data?.expiry_date && (
                  <CheckoutValue
                    title="Jam Kadaluarsa"
                    color="red"
                    value={converterDate(moment(data?.expiry_date))}
                  />
                )}
              <CheckoutValue
                title="Biaya"
                value={data?.order_total}
                color="green"
                number={true}
              />
              <CheckoutValue
                title="Diskon"
                value="0"
                color="green"
                number={true}
              />
            </div>
          </>
        );
      case t("sublayanan2"):
        return (
          <>
            <div>
              <CheckoutHeader
                image={usaha}
                title="Informasi Usaha"
                alt="Informasi Usaha"
              />
              <CheckoutValue title="Partner" value={data?.partnerdeka?.name} />
              <CheckoutValue title="Jenis Usaha" value={layanan} />
              {name_opsi?.map((row, key) => {
                return (
                  <CheckoutValue
                    key={key}
                    title={`Nama Usaha opsi (${key + 1})`}
                    value={row?.opsi}
                  />
                );
              })}
              <CheckoutValue
                title="Modal Dasar Perusahaan (Fiktif)"
                value={data?.modal_dasar}
                color="var(--font-color3)"
                number={true}
              />
              <CheckoutValue
                title="Jumlah modal yang disetor (Min 25%)"
                value={data?.modal_disetor}
                color="var(--font-color3)"
                number={true}
              />
              <CheckoutValue
                title="No. Telepon / Whatsapp"
                value={data?.phone_badan_hukum}
              />
              <CheckoutValue
                title="Email dan Password"
                value={data?.email_badan_hukum}
              />
              <CheckoutValue
                title="Photo dan Dokumen"
                value={
                  <div className="image-detail-checkout-f">
                    <div className="title"></div>
                    {data?.file_document &&
                      JSON.parse(data?.file_document)?.map((file, key) => (
                        <img
                          key={key}
                          src={file.image_url}
                          alt={file.image_name}
                        />
                      ))}
                  </div>
                }
              />
            </div>
            <Gap height={15} />
            <div>
              <CheckoutHeader
                image={location}
                title="Domisili Usaha"
                alt="Domisili Usaha"
              />
              <CheckoutValue
                title="Domisili Usaha"
                value={alamat?.domisili_sekarang}
              />
              <CheckoutValue
                title="RT/RW"
                value={`${alamat?.rt}/${alamat?.rw}`}
              />
              <CheckoutValue title="Provinsi" value={alamat?.provinsi?.label} />
              <CheckoutValue
                title="Kota/Kabupaten"
                value={alamat?.kabupaten?.label}
              />
              <CheckoutValue
                title="Kecamatan"
                value={alamat?.kecamatan?.label}
              />
              <CheckoutValue
                title="Kelurahan"
                value={alamat?.kelurahan?.label}
              />
              <CheckoutValue title="Kode Pos" value={alamat?.kode_pos} />
            </div>
            <Gap height={15} />
            <div>
              <CheckoutHeader
                image={user}
                title="Informasi Pengguna"
                alt=""
              />
              <CheckoutValue
                title="Susunan Pemegang Saham"
                value={saham_c}
                type="option"
              />
              <CheckoutValue
                opsi="direksi"
                title="Susunan Direksi"
                value={direksi_c}
                type="option"
              />
              <CheckoutValue
                title="Bidang Usaha KBLI 2020 "
                value={usaha_c}
                type="bidang"
              />
            </div>
            <Gap height={15} />
            <div>
              <CheckoutHeader
                image={users}
                title="Rincian Pembayaran"
                alt=""
              />
              {data?.payment_status !== "EXPIRED"
                ? data?.paid_at && (
                  <CheckoutValue
                    title="Jam Terbayar"
                    color="green"
                    value={converterDate(moment(data?.paid_at))}
                  />
                )
                : data?.expiry_date && (
                  <CheckoutValue
                    title="Jam Kadaluarsa"
                    color="red"
                    value={converterDate(moment(data?.expiry_date))}
                  />
                )}
              <CheckoutValue
                title="Biaya"
                value={data?.order_total}
                color="green"
                number={true}
              />
              <CheckoutValue
                title="Diskon"
                value="0"
                color="green"
                number={true}
              />
            </div>
          </>
        );
      case t("sublayanan3"):
        return (
          <>
            <div>
              <CheckoutHeader
                image={usaha}
                title="Informasi Usaha"
                alt="Informasi Usaha"
              />
              <CheckoutValue title="Partner" value={data?.partnerdeka?.name} />
              <CheckoutValue title="Jenis Usaha" value={layanan} />
              {name_opsi?.map((row, key) => {
                return (
                  <CheckoutValue
                    key={key}
                    title={`Nama Usaha opsi (${key + 1})`}
                    value={row?.opsi}
                  />
                );
              })}
              <CheckoutValue
                title="No. Telepon / Whatsapp"
                value={data?.phone_badan_hukum}
              />
              <CheckoutValue
                title="Email dan Password"
                value={data?.email_badan_hukum}
              />
              <CheckoutValue
                title="Photo dan Dokumen"
                value={
                  <div className="image-detail-checkout-f">
                    <div className="title"></div>
                    {data?.file_document &&
                      JSON.parse(data?.file_document)?.map((file, key) => (
                        <img
                          key={key}
                          src={file.image_url}
                          alt={file.image_name}
                        />
                      ))}
                  </div>
                }
              />
            </div>
            <Gap height={15} />
            <div>
              <CheckoutHeader
                image={location}
                title="Domisili Yayasan"
                alt="Domisili Yayasan"
              />
              <CheckoutValue
                title="Domisili Yayasan"
                value={alamat?.domisili_sekarang}
              />
              <CheckoutValue
                title="RT/RW"
                value={`${alamat?.rt}/${alamat?.rw}`}
              />
              <CheckoutValue title="Provinsi" value={alamat?.provinsi?.label} />
              <CheckoutValue
                title="Kota/Kabupaten"
                value={alamat?.kabupaten?.label}
              />
              <CheckoutValue
                title="Kecamatan"
                value={alamat?.kecamatan?.label}
              />
              <CheckoutValue
                title="Kelurahan"
                value={alamat?.kelurahan?.label}
              />
              <CheckoutValue title="Kode Pos" value={alamat?.kode_pos} />
            </div>
            <Gap height={15} />
            <div>
              <CheckoutHeader
                image={user}
                title="Informasi Pengguna"
                alt=""
              />
              <CheckoutValue
                opsi="direksi"
                title="Susunan Pengurus"
                value={direksi_c}
                type="option"
              />
              <CheckoutValue
                title="Bidang Usaha KBLI 2020 "
                value={usaha_c}
                type="bidang"
              />
            </div>
            <Gap height={15} />
            <div>
              <CheckoutHeader
                image={users}
                title="Rincian Pembayaran"
                alt=""
              />
              {data?.payment_status !== "EXPIRED"
                ? data?.paid_at && (
                  <CheckoutValue
                    title="Jam Terbayar"
                    color="green"
                    value={converterDate(moment(data?.paid_at))}
                  />
                )
                : data?.expiry_date && (
                  <CheckoutValue
                    title="Jam Kadaluarsa"
                    color="red"
                    value={converterDate(moment(data?.expiry_date))}
                  />
                )}
              <CheckoutValue
                title="Biaya"
                value={data?.order_total}
                color="green"
                number={true}
              />
              <CheckoutValue
                title="Diskon"
                value="0"
                color="green"
                number={true}
              />
            </div>
          </>
        );
      case t("sublayanan4"):
        return (
          <>
            <div>
              <CheckoutHeader
                image={usaha}
                title="Informasi Usaha"
                alt="Informasi Usaha"
              />
              <CheckoutValue title="Partner" value={data?.partnerdeka?.name} />
              <CheckoutValue title="Jenis Usaha" value={layanan} />
              {name_opsi?.map((row, key) => {
                return (
                  <CheckoutValue
                    key={key}
                    title={`Nama Usaha opsi (${key + 1})`}
                    value={row?.opsi}
                  />
                );
              })}
              <CheckoutValue
                title="No. Telepon / Whatsapp"
                value={data?.phone_badan_hukum}
              />
              <CheckoutValue
                title="Email dan Password"
                value={data?.email_badan_hukum}
              />
              <CheckoutValue
                title="Photo dan Dokumen"
                value={
                  <div className="image-detail-checkout-f">
                    <div className="title"></div>
                    {data?.file_document &&
                      JSON.parse(data?.file_document)?.map((file, key) => (
                        <img
                          key={key}
                          src={file.image_url}
                          alt={file.image_name}
                        />
                      ))}
                  </div>
                }
              />
            </div>
            <Gap height={15} />
            <div>
              <CheckoutHeader
                image={location}
                title="Domisili Perkumpulan"
                alt="Domisili Perkumpulan"
              />
              <CheckoutValue
                title="Domisili Perkumpulan"
                value={alamat?.domisili_sekarang}
              />
              <CheckoutValue
                title="RT/RW"
                value={`${alamat?.rt}/${alamat?.rw}`}
              />
              <CheckoutValue title="Provinsi" value={alamat?.provinsi?.label} />
              <CheckoutValue
                title="Kota/Kabupaten"
                value={alamat?.kabupaten?.label}
              />
              <CheckoutValue
                title="Kecamatan"
                value={alamat?.kecamatan?.label}
              />
              <CheckoutValue
                title="Kelurahan"
                value={alamat?.kelurahan?.label}
              />
              <CheckoutValue title="Kode Pos" value={alamat?.kode_pos} />
            </div>
            <Gap height={15} />
            <div>
              <CheckoutHeader
                image={user}
                title="Informasi Pengguna"
                alt=""
              />
              <CheckoutValue
                opsi="direksi"
                title="Susunan Pengurus"
                value={direksi_c}
                type="option"
              />
              <CheckoutValue
                title="Bidang Usaha KBLI 2020 "
                value={usaha_c}
                type="bidang"
              />
            </div>
            <Gap height={15} />
            <div>
              <CheckoutHeader
                image={users}
                title="Rincian Pembayaran"
                alt=""
              />
              {data?.payment_status !== "EXPIRED"
                ? data?.paid_at && (
                  <CheckoutValue
                    title="Jam Terbayar"
                    color="green"
                    value={converterDate(moment(data?.paid_at))}
                  />
                )
                : data?.expiry_date && (
                  <CheckoutValue
                    title="Jam Kadaluarsa"
                    color="red"
                    value={converterDate(moment(data?.expiry_date))}
                  />
                )}
              <CheckoutValue
                title="Biaya"
                value={data?.order_total}
                color="green"
                number={true}
              />
              <CheckoutValue
                title="Diskon"
                value="0"
                color="green"
                number={true}
              />
            </div>
          </>
        );
      case t("sublayanan5"):
        return (
          <>
            <div>
              <CheckoutHeader
                image={usaha}
                title="Informasi Usaha"
                alt="Informasi Usaha"
              />
              <CheckoutValue title="Partner" value={data?.partnerdeka?.name} />
              <CheckoutValue title="Jenis Usaha" value={layanan} />
              <CheckoutValue title="Keperluan" value={data?.needs} />

              <CheckoutValue
                title="Photo dan Dokumen"
                value={
                  data?.file_document == null ? (
                    <span>Tidak Ada Dokumen atau Foto</span>
                  ) : (
                    <>
                      <div className="image-detail-checkout-f">
                        <div className="title"></div>
                        {data?.file_document &&
                          JSON.parse(data?.file_document)?.map((file, key) => (
                            <img
                              key={key}
                              src={file.image_url}
                              alt={file.image_name}
                            />
                          ))}
                      </div>
                    </>
                  )
                }
              />
            </div>
            <Gap height={15} />

            <div>
              <CheckoutHeader
                image={users}
                title="Rincian Pembayaran"
                alt=""
              />
              {data?.payment_status !== "EXPIRED"
                ? data?.paid_at && (
                  <CheckoutValue
                    title="Jam Terbayar"
                    color="green"
                    value={converterDate(moment(data?.paid_at))}
                  />
                )
                : data?.expiry_date && (
                  <CheckoutValue
                    title="Jam Kadaluarsa"
                    color="red"
                    value={converterDate(moment(data?.expiry_date))}
                  />
                )}
              <CheckoutValue
                title="Biaya"
                value={data?.order_total}
                color="green"
                number={true}
              />
              <CheckoutValue
                title="Diskon"
                value="0"
                color="green"
                number={true}
              />
            </div>
          </>
        );
      case t("sublayanan6"):
        return (
          <>
            <div>
              <CheckoutHeader
                image={usaha}
                title="Informasi Pemesanan"
                alt="Informasi Usaha"
              />
              <CheckoutValue title="Jenis Layanan" value={layanan} />
              <CheckoutValue title="Lokasi" value={data?.location} />
              <CheckoutValue
                title="Keperluan Pengamanan Untuk"
                value={data?.needs}
              />
              <CheckoutValue title="Jarak Lokasi (KM)" value={data?.jarak} />
              <CheckoutValue
                title="Jam kerja"
                value={`${data?.duration} Jam`}
              />
              <CheckoutValue
                title="Jam Mulai"
                value={converterDate(data?.time)}
              />
              <CheckoutValue
                title="Jam Berakhir"
                value={converterDate(
                  moment(data?.time).add(data?.duration, "hour")
                )}
              />

              <CheckoutValue
                title="Jumlah Tenaga Pengamanan"
                value={data?.jml_personil + " Personel"}
              />
            </div>
            <Gap height={15} />

            <div>
              <CheckoutHeader
                image={users}
                title="Rincian Pembayaran"
                alt="Rincian Pembayaran"
              />
              {data?.payment_status !== "EXPIRED"
                ? data?.paid_at && (
                  <CheckoutValue
                    title="Jam Terbayar"
                    color="green"
                    value={converterDate(moment(data?.paid_at))}
                  />
                )
                : data?.expiry_date && (
                  <CheckoutValue
                    title="Jam Kadaluarsa"
                    color="red"
                    value={converterDate(moment(data?.expiry_date))}
                  />
                )}

              <CheckoutValue
                title="Biaya Transportasi"
                value={data?.biaya_transport}
                color="green"
                number={true}
              />
              <CheckoutValue
                title="Biaya Makan"
                value={data?.biaya_makan}
                color="green"
                number={true}
              />
              <CheckoutValue
                title="Biaya Tekhnical Meeting"
                value={data?.biaya_tekhnical_meeting}
                color="green"
                number={true}
              />
              <CheckoutValue
                title="Biaya"
                value={data?.order_total}
                color="green"
                number={true}
              />
              <CheckoutValue
                title="Diskon"
                value="0"
                color="green"
                number={true}
              />
            </div>
          </>
        );
      case t("partner1"):
        return (
          <>
            <div>
              <CheckoutHeader
                image={usaha}
                title="Informasi Pemesanan"
                alt="Informasi Usaha"
              />
              <CheckoutValue
                title="Keperluan Pengamanan Untuk"
                value={data?.needs}
              />
              <CheckoutValue
                title="Nama Penanggung Jawab"
                value={data?.nama_pic}
              />
              <CheckoutValue
                title="No. HP Penanggung Jawab"
                value={data?.nomor_pic}
              />{" "}
              <hr />
              <CheckoutHeader
                image={location}
                title="Lokasi Pengamanan"
                alt="Lokasi Pengamanan"
              />
              <p style={{ fontSize: "12px" }}>{data?.location}</p> <hr />
              <CheckoutHeader image={time} title="Waktu" alt="Waktu" />
              <CheckoutValue
                title="Tanggal Mulai"
                value={data?.tanggal_mulai}
              />
              <CheckoutValue title="Jam Mulai" value={data?.jam_mulai} />
              {data?.tnos_service_id == 4 && data?.tnos_subservice_id == 1 ? (
                <>
                  <CheckoutValue
                    title="Durasi Pengamanan"
                    value={
                      parseInt(data?.durasi_pengamanan) == 12
                        ? "12 Jam"
                        : "8 Jam"
                    }
                  />
                </>
              ) : (
                <>
                  <CheckoutValue
                    title="Durasi Pengamanan"
                    value={
                      parseInt(data?.durasi_pengamanan) >= 8
                        ? "Fullday (8 jam)"
                        : parseInt(data?.durasi_pengamanan) < 4
                          ? `${data?.duration} Jam`
                          : "Halfday (4 jam)"
                    }
                  />
                </>
              )}
              <CheckoutValue
                title="Jumlah Tenaga Pengamanan"
                value={data?.jml_personil + " Orang"}
              />
              <CheckoutValue title="Jarak" value={`${data?.jarak} KM`} />
            </div>
            <Gap height={15} />
            <div>
              {data?.payment_status !== "EXPIRED"
                ? data?.paid_at && (
                  <CheckoutValue
                    title="Jam Terbayar"
                    color="green"
                    value={converterDate(moment(data?.paid_at))}
                  />
                )
                : data?.expiry_date && (
                  <CheckoutValue
                    title="Jam Kadaluarsa"
                    color="red"
                    value={converterDate(moment(data?.expiry_date))}
                  />
                )}
              {data?.tnos_subservice_id === "1" && data?.tnos_service_id === "4" ? (
                <div></div>
              ) : (
                <>
                  <CheckoutValue
                    title="Biaya Transportasi"
                    value={parseInt(data?.biaya_transport)}
                    number={true}
                  />
                  <CheckoutValue
                    title="Biaya Makan"
                    value={parseInt(data?.biaya_makan)}
                    number={true}
                  />
                </>
              )}
              <CheckoutValue
                title="Biaya Tekhnical Meeting"
                value={parseInt(data?.biaya_tekhnical_meeting)}
                number={true}
              />
              <CheckoutValue
                title="Biaya Pengamanan"
                value={parseInt(data?.biaya_pengamanan)}
                number={true}
              />{" "}
              <hr />
              <CheckoutValue
                title="Total Pembayaran"
                value={parseInt(data?.order_total)}
                number={true}
              />
            </div>
          </>
        );
      case t("partner2"):
        return (
          <>
            <div>
              <CheckoutHeader
                image={usaha}
                title="Informasi Pemesanan"
                alt="Informasi Usaha"
              />
              <CheckoutValue
                title="Keperluan Pengamanan Untuk"
                value={data?.keperluan_pengamanan}
              />
              <CheckoutValue
                title="Nama Penanggung Jawab"
                value={data?.nama_pic}
              />
              <CheckoutValue
                title="No. HP Penanggung Jawab"
                value={data?.nomor_pic}
              />{" "}
              <hr />
              <CheckoutHeader
                image={location}
                title="Lokasi Pengamanan"
                alt="Lokasi Pengamanan"
              />
              <p style={{ fontSize: "12px" }}>{data?.location}</p> <hr />
              <CheckoutHeader image={time} title="Waktu" alt="Waktu" />
              <CheckoutValue
                title="Tanggal Mulai"
                value={data?.tanggal_mulai}
              />
              <CheckoutValue title="Jam Mulai" value={data?.jam_mulai} />
              <CheckoutValue
                title="Durasi Pengamanan"
                value={
                  parseInt(data?.durasi_pengamanan) >= 8
                    ? "Fullday (8 jam)"
                    : parseInt(data?.durasi_pengamanan) < 4
                      ? `${data?.duration} Jam`
                      : "Halfday (4 jam)"
                }
              />
              <CheckoutValue
                title="Jumlah Tenaga Pengamanan"
                value={data?.jml_personil + " Orang"}
              />
              <CheckoutValue title="Jarak" value={`${data?.jarak} KM`} />
            </div>
            <Gap height={15} />
            <div>
              {data?.payment_status !== "EXPIRED"
                ? data?.paid_at && (
                  <CheckoutValue
                    title="Jam Terbayar"
                    color="green"
                    value={converterDate(moment(data?.paid_at))}
                  />
                )
                : data?.expiry_date && (
                  <CheckoutValue
                    title="Jam Kadaluarsa"
                    color="red"
                    value={converterDate(moment(data?.expiry_date))}
                  />
                )}
              <CheckoutValue
                title="Biaya Transportasi"
                value={parseInt(data?.biaya_transport)}
                number={true}
              />
              <CheckoutValue
                title="Biaya Makan"
                value={parseInt(data?.biaya_makan)}
                number={true}
              />
              <CheckoutValue
                title="Biaya Tekhnical Meeting"
                value={parseInt(data?.biaya_tekhnical_meeting)}
                number={true}
              />
              <CheckoutValue
                title="Biaya Pengamanan"
                value={parseInt(data?.biaya_pengamanan)}
                number={true}
              />{" "}
              <hr />
              <CheckoutValue
                title="Total Pembayaran"
                value={parseInt(data?.order_total)}
                number={true}
              />
            </div>
          </>
        );
      case t("layanan7"):
        return (
          <>
            <div>
              <CheckoutHeader
                image={usaha}
                title="Informasi Pesanan"
                alt="Informasi Pesanan"
              />
              <CheckoutValue title="Jenis Layanan" value={layanan} />
              <CheckoutValue title="Keperluan" value={data?.needs} />

              <CheckoutValue
                title="Photo dan Dokumen"
                value={
                  data?.file_document == null ? (
                    <span>Tidak Ada Dokumen / Foto</span>
                  ) : (
                    data?.file_document &&
                    JSON.parse(data?.file_document)?.map((file, key) => (
                      <>
                        {file.mime == "image/png" ? (
                          <div className="image-detail-checkout-f">
                            <div className="title"></div>
                            <img
                              key={key}
                              src={file.image_url}
                              alt={file.image_name}
                            />
                          </div>
                        ) : (
                          <>
                            <a target="_blank" href={file.image_url}>
                              Lihat Dokumen
                            </a>
                          </>
                        )}
                      </>
                    ))
                  )
                }
              />
            </div>
            <Gap height={15} />

            <div>
              <CheckoutHeader image={users} title="Rincian Pembayaran" alt="" />
              {data?.payment_status !== "EXPIRED"
                ? data?.paid_at && (
                  <CheckoutValue
                    title="Jam Terbayar"
                    color="green"
                    value={converterDate(moment(data?.paid_at))}
                  />
                )
                : data?.expiry_date && (
                  <CheckoutValue
                    title="Jam Kadaluarsa"
                    color="red"
                    value={converterDate(moment(data?.expiry_date))}
                  />
                )}
              <CheckoutValue
                title="Biaya"
                value={data?.order_total}
                color="green"
                number={true}
              />
              <CheckoutValue
                title="Diskon"
                value="0"
                color="green"
                number={true}
              />
            </div>
          </>
        );
      case t("sublayanan7"):
        return (
          <>
            <div>
              <CheckoutHeader
                image={usaha}
                title="Informasi Pemesanan"
                alt="Informasi Pemesanan"
              />
              <CheckoutValue title="Jenis Layanan" value={layanan} />
              <CheckoutValue title="Keperluan" value={data?.needs} />
            </div>
            <Gap height={15} />

            <div>
              <CheckoutHeader
                image={users}
                title="Rincian Pembayaran"
                alt="Rincian Pembayaran"
              />
              {data?.payment_status !== "EXPIRED"
                ? data?.paid_at && (
                  <CheckoutValue
                    title="Jam Terbayar"
                    color="green"
                    value={converterDate(moment(data?.paid_at))}
                  />
                )
                : data?.expiry_date && (
                  <CheckoutValue
                    title="Jam Kadaluarsa"
                    color="red"
                    value={converterDate(moment(data?.expiry_date))}
                  />
                )}
              <CheckoutValue
                title="Komitmen Fee"
                value={data?.order_total}
                color="green"
                number={true}
              />
              <CheckoutValue
                title="Diskon"
                value="0"
                color="green"
                number={true}
              />
            </div>
          </>
        );
      case t("sublayanan8"):
        return (
          <>
            <div>
              <CheckoutHeader
                image={usaha}
                title="Informasi Pemesanan"
                alt="Informasi Usaha"
              />
              <CheckoutValue
                title="Keperluan Pengamanan Untuk"
                value={data?.detail?.needs}
              />
              <CheckoutValue
                title="Nama Penanggung Jawab"
                value={data?.detail?.nama_pic}
              />
              <CheckoutValue
                title="No. HP Penanggung Jawab"
                value={data?.detail?.nomor_pic}
              />{" "}
              <hr />
              <CheckoutHeader
                image={location}
                title="Lokasi Pengamanan"
                alt="Lokasi Pengamanan"
              />
              <p style={{ fontSize: "12px" }}>{data?.detail?.location}</p> <hr />
              <CheckoutHeader image={time} title="Waktu" alt="Waktu" />
              <CheckoutValue
                title="Tanggal Mulai"
                value={data?.detail?.tanggal_mulai}
              />
              <CheckoutValue title="Jam Mulai" value={data?.jam_mulai} />
              {data?.tnos_service_id == 4 && data?.tnos_subservice_id == 1 ? (
                <>
                  <CheckoutValue
                    title="Durasi Pengamanan"
                    value={
                      parseInt(data?.detail?.durasi_pengamanan) == 12
                        ? "12 Jam"
                        : "8 Jam"
                    }
                  />
                </>
              ) : (
                <>
                  <CheckoutValue
                    title="Durasi Pengamanan"
                    value={
                      parseInt(data?.durasi_pengamanan) >= 8
                        ? "Fullday (8 jam)"
                        : parseInt(data?.durasi_pengamanan) < 4
                          ? `${data?.duration} Jam`
                          : "Halfday (4 jam)"
                    }
                  />
                </>
              )}
              <CheckoutValue title="Jarak" value={`${data?.detail?.jarak} KM`} />
            </div>
            <Gap height={15} />
            <div>
              {data?.detail?.payment_status !== "EXPIRED"
                ? data?.detail?.paid_at && (
                  <CheckoutValue
                    title="Jam Terbayar"
                    color="green"
                    value={converterDate(moment(data?.detail?.paid_at))}
                  />
                )
                : data?.expiry_date && (
                  <CheckoutValue
                    title="Jam Kadaluarsa"
                    color="red"
                    value={converterDate(moment(data?.detail?.expiry_date))}
                  />
                )}
              {data?.detail?.tnos_subservice_id === "1" && data?.detail?.tnos_service_id === "4" ? (
                <div></div>
              ) : (
                <>
                  <CheckoutValue
                    title="Biaya Transportasi"
                    value={parseInt(data?.detail?.biaya_transport)}
                    number={true}
                  />
                  <CheckoutValue
                    title="Biaya Makan"
                    value={parseInt(data?.detail?.biaya_makan)}
                    number={true}
                  />
                </>
              )}
              <CheckoutValue
                title="Biaya Tekhnical Meeting"
                value={parseInt(data?.detail?.biaya_tekhnical_meeting)}
                number={true}
              />
              <CheckoutValue
                title="Biaya Pengamanan"
                value={parseInt(data?.detail?.biaya_pengamanan)}
                number={true}
              />
              <hr />
              {getJsonData.map(([key, value], index) => (
                <CheckoutValue
                  key={index}
                  title={key}
                  value={value}
                />
              ))}
              <hr />
              <CheckoutValue
                title="Total Pembayaran"
                value={parseInt(data?.detail?.order_total)}
                number={true}
              />
            </div>
          </>
        );
      default:
        return;
    }
  };
  return renderContent();
}

export default ContentDetailCheckout;
