import React, { useEffect, useState } from "react"
import TitleHeader from "../utils/TitleHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { decode as base64_decode } from "base-64";
import axios from "axios";
import PAS from "../../assets/images/PAS.svg";
import { Alert, Button, Modal } from "react-bootstrap";
import { ArrowForward } from "@mui/icons-material";
import { getParams } from "../moleculars/GetParams";
var CryptoJS = require("crypto-js");
const secretKey = `${process.env.REACT_APP_SECRET_KEY}`;

function ListLayananParamsMobile() {
    TitleHeader("Halaman Pengamanan");
    const navigate = useNavigate();
    const location = useLocation();
    const pathParts = location.pathname.split("/")
    const id = pathParts[pathParts.length - 1]

    const [getP, setP] = useState(null);
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("userInfo"))
    );

    const [getDataLayananById, setDataLayananById] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [selectedLayanan, setSelectedLayanan] = useState(null)
    const [getDurasi, setDurasi] = useState([])
    const [selectedDurasi, setSelectedDurasi] = useState(null)
    const [loading, setLoading] = useState(true)

    const getProviderById = async (id) => {

        setLoading(true)

        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_PWA}/dashboard/pwa-revamp/layanan/${id}`
            );
    
            setDataLayananById(response.data.data.layanan);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false)
        }
    };

    const handleShowModal = async (layanan) => {
        setSelectedLayanan(layanan);

        const response = await axios.get(
            `${process.env.REACT_APP_API_PWA}/dashboard/pwa-revamp/durasi/${layanan.id}`
        )

        let filtered = []

        filtered = response.data.data.filter(item => item.status === 1)

        setDurasi(filtered)
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setDurasi([])
        setSelectedDurasi(null)
        setSelectedLayanan(null);
    };

    const handleDurasiClick = (durasi) => {
        setSelectedDurasi(durasi)
    };

    useEffect(() => {
        getProviderById(id);
        checkParams()
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
                    console.log(paramValue);
                    setUser(paramValue);
                    setP(checkP.query);
                    localStorage.setItem("data", JSON.stringify(paramValue));
                }
                if (!localStorage.getItem("data")) {
                    if (!paramValue.user_id) {
                        console.log("salah");
                        navigate("/not-found");
                    }
                }
            }
        }
    };

    return (
        <>
            <div className="container-class">
                <div className="responsive-class">
                    <div className="res-class">
                        <div className="flexcol" style={{ margin: '20px 12px 24px 12px' }}>
                            {loading ? (
                                <div>
                                    Loading...
                                </div>
                            ) : (
                                <>
                                    {getDataLayananById.length > 0 ? (
                                getDataLayananById.map((layanan, id) => (
                                    <div key={id} className="flexbox">
                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                            <img
                                                src={layanan?.providers?.image}
                                                alt={layanan?.providers?.name_sc}
                                                style={{
                                                    width: "60px",
                                                    height: "60px",
                                                    padding: "4px",
                                                    backgroundColor: "white",
                                                    borderRadius: "8px",
                                                }}
                                            />
                                            <span style={{ alignSelf: "center", marginLeft: "24px" }}>
                                                {layanan?.name}
                                            </span>
                                        </div>
                                        <Button
                                            onClick={() => handleShowModal(layanan)}
                                            style={{ backgroundColor: "#E3E8ED", border: 0 }}
                                        >
                                            {" "}
                                            <ArrowForward
                                                style={{
                                                    color: "#777777",
                                                    fontSize: "18px",
                                                    fontWeight: 600,
                                                }}
                                            />{" "}
                                        </Button>
                                    </div>
                                ))
                            ) : (
                                <Alert variant="danger" className="text-center">Layanan Tidak Tersedia</Alert>
                            )}
                                </>
                            ) }
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                show={showModal}
                onHide={handleCloseModal}
                className="custom-modal"
                centered
                animation={false}
            >
                <div className="modal-content-slide-up">
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedLayanan?.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5 className="text-center fw-bold">
                            Pilih Durasi
                        </h5>
                        {getDurasi.length > 0 ? (
                            getDurasi.map((durasi, index) => (
                                <div key={index}>
                                    <Button
                                        variant={selectedDurasi?.id === durasi.id ? "success" : "secondary"}
                                        className="btn-sm fw-bold"
                                        style={{ width: '100%' }}
                                        onClick={() => handleDurasiClick(durasi)}
                                    >
                                        {durasi.durasi} Jam
                                    </Button>
                                </div>
                            ))
                        ) : (
                            <Alert variant="danger" className="text-center">Durasi Tidak Tersedia</Alert>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" className="btn-sm" onClick={handleCloseModal}>
                            Kembali
                        </Button>
                        {selectedDurasi && (
                            <Button
                                variant="primary"
                                className="btn-sm"
                                onClick={() => navigate(`/corporate-security-m/section/${selectedLayanan?.id}/${selectedDurasi?.id}?query=${getP}`)}>
                                Lanjutkan
                            </Button>
                        )}
                    </Modal.Footer>
                </div>
            </Modal>
        </>
    )
}

export default ListLayananParamsMobile