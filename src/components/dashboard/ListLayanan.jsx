import React, { useEffect, useRef, useState } from "react";
import TopNewNav from "../moleculars/TopNewNav";
import TitleHeader from "../utils/TitleHeader";
import { t } from "i18next";
import PAS from "../../assets/images/PAS.svg"
import Trigger from "../../assets/images/TRIGGER.svg"
import {Button} from "react-bootstrap";
import { ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Drawer } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from "react-router-dom";
function ListLayanan() {
  TitleHeader("Halaman Pengamanan");
  const navigate = useNavigate();
  const searchParams = useParams();

  return (
    <>
      <TopNewNav title="List Layanan" path={`/security-providers`} />
      <div className="container-class">
        <div className="responsive-class">
          <div className="res-class">
            <div className="flexcol">
                { searchParams?.mitra === t("partner2") ?
                  <div className="flexbox">
                   <div style={{ display: 'flex', flexDirection: 'row' }}>
                     <img src={PAS} alt="pas" style={{ width: '60px', height: '60px', padding:'4px', backgroundColor:'white', borderRadius:'8px' }}/>
                     <span style={{ alignSelf: 'center', marginLeft: '24px' }}>Pengamanan Usaha dan Bisnis</span>
                   </div>
                   <Button onClick={() => navigate(`/corporate-security/${searchParams.mitra}`)} style={{ backgroundColor:'#E3E8ED', border: 0 }}> <ArrowForward style={{ color:'#777777', fontSize:'18px', fontWeight:600 }}/> </Button>
                  </div>
                  :
                  <div className="flexbox">
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <img src={Trigger} alt="pas" style={{ width: '60px', height: '60px', padding:'4px', backgroundColor:'white', borderRadius:'8px' }}/>
                      <span style={{ alignSelf: 'center', marginLeft: '24px' }}>Pengamanan Usaha dan Bisnis</span>
                    </div>
                    <Button onClick={() => navigate(`/corporate-security/${searchParams.mitra}`)} style={{ backgroundColor:'#E3E8ED', border: 0 }}> <ArrowForward style={{ color:'#777777', fontSize:'18px', fontWeight:600 }}/> </Button>
                  </div>
                }              
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default ListLayanan;
