import React from "react";
import TopNewNav from "../../moleculars/TopNewNav";
import PaddingPwa from "../../moleculars/PaddingPwa";
import Gap from "../../moleculars/Gap";
import homeImage from "../../../assets/images/new pwa icon/home/image-home.svg";
import ButtonCustom from "../../atoms/ButtonCustom";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../atoms/ButtonComponent";
import TitleHeader from "../../utils/TitleHeader";

function Home() {
  TitleHeader("Halaman beranda");
  const navigate = useNavigate();
  return (
    <>
      <TopNewNav type="home" />
      <div className="container-class">
        <div
          className="responsive-class"
          style={{ background: "var(--bg-color6)" }}
        >
          <div className="res-class">
            <div className="payment-container">
              <div className="container-home-f">
                <PaddingPwa padding={15}>
                  <Gap height={20} />
                  <div className="title-header-f">
                    TNOS SIAP SIAGA <br /> KAPANPUN DIMANAPUN!
                  </div>
                  <Gap height={15} />
                  <div className="image-home-f">
                    <img src={homeImage} alt="" />
                  </div>
                  <Gap height={20} />
                  <div className="description-home-f">
                    Aplikasi yang buat hidup kamu lebih aman dan nyaman, Selalu
                    siap siaga untuk pendampingan dan konsultasi segala
                    keperluan dan masalah kamu
                  </div>
                  <Gap height={200} />

                  <ButtonComponent
                    typeButton="home"
                    // onClick={() => navigate("/more/login")}
                  >
                    <div className="police-f">
                      Dengan masuk atau mendaftar, Kamu setuju dengan{" "}
                      <span style={{cursor: 'pointer'}} onClick={() => {
                        window.location.href = "https://tnosbantuan.freshdesk.com/support/solutions/articles/150000024969-syarat-dan-ketentuan-pengguna"
                      }}>Ketentuan Layanan</span> dan{" "}
                      <span style={{cursor: 'pointer'}} onClick={() => {
                        window.location.href = "https://tnosbantuan.freshdesk.com/support/solutions/articles/150000024967-kebijakan-privasi"
                      }}>Kebijakan Privasi.</span>
                    </div>
                    <Gap height={20} />
                    <div className="btn-container-home-f">
                      <div className="row">
                        <div className="col-6">
                          <ButtonCustom
                            title="Masuk"
                            background="var(--font-color9)"
                            border="1px solid transparent"
                            color="var(--font-color4)"
                            typeButton="home"
                            onClick={() => navigate("/auth/login")}
                          />
                        </div>
                        <div className="col-6">
                          <ButtonCustom
                            title="Daftar"
                            background="var(--font-color9)"
                            border="1px solid var(--font-color3)"
                            color="var(--font-color3)"
                            typeButton="home"
                            onClick={() => navigate("/auth/register")}
                          />
                        </div>
                      </div>
                    </div>
                  </ButtonComponent>
                </PaddingPwa>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
