// import axios from "axios";
import React from "react";
import { Route, Routes } from "react-router-dom";
// import BadanUsahaOption from "../components/badan-hukum/BadanUsahaOption";
// import BadanHukumPt from "../components/badan-hukum/BadanHukumPt";
import ComingsoonPage from "../pages/ComingsoonPage";
// import DashboardPage from "../pages/DashboardPage";
// import DetailProfilPengacaraPage from "../pages/DetailProfilPengacaraPage";
// import ForgotPasswordLinkPage from "../pages/ForgotPasswordLinkPage";
// import ForgotPasswordPage from "../pages/ForgotPasswordPage";
// import FormDetailTransactionKonsulPage from "../pages/FormDetailTransactionKonsulPage";
// import FormDetailTransactionPtPage from "../pages/FormDetailTransactionPtPage";
// import FormTransactionDetailPendampinganPage from "../pages/FormTransactionDetailPendampinganPage";
// import FormTransactionDetailPeroranganPage from "../pages/FormTransactionDetailPeroranganPage";
// import FormTransactionKonsultasiPage from "../pages/FormTransactionKonsultasiPage";
// import FormTransactionPendampinganPage from "../pages/FormTransactionPendampinganPage";
// import FormTransactionPeroranganPage from "../pages/FormTransactionPeroranganPage";
// import GuardMenuPage from "../pages/GuardMenuPage";
// import HomePage from "../pages/HomePage";
// import ListPengacaraPage from "../pages/ListPengacaraPage";
import NotFoundPage from "../pages/NotFoundPage";
// import NotifSuccess from "../pages/NotifSuccess";
// import PendampinganHukumPage from "../pages/PendampinganHukumPage";
// import PengacaraPage from "../pages/PengacaraPage";
// import VerifyEmailPage from "../pages/VerifyEmailPage";
// import DetailBadanHukumPT from "../components/badan-hukum/DetailBadanHukumPT";
// import BadanHukumCv from "../components/badan-hukum/BadanHukumCv";
// import BadanHukumYayasan from "../components/badan-hukum/BadanHukumYayasan";
// import BadanHukumPerkumpulan from "../components/badan-hukum/BadanHukumPerkumpulan";
// import DetailBadanHukumCv from "../components/badan-hukum/DetailBadanHukumCv";
// import DetailBadanHukumYayasan from "../components/badan-hukum/DetailBadanHukumYayasan";
// import BadanHukumAsosiasi from "../components/badan-hukum/BadanHukumAsosiasi";
// import Register from "../components/user/Register";
// import LoginOtp from "../components/user/LoginOtp";
// import VerifyOtp from "../components/user/VerifyOtp";
// import Dashboard from "../components/dashboard/Dashboard";
import ProtectedRoute from "../navigation/ProtectedRoute";
// import Profile from "../components/user/Profile";
import IsLogin from "../navigation/IsLogin";
// import HistoryTransaction from "../components/user/HistoryTransaction";
// import DetailRiwayatTransaksi from "../components/user/DetailRiwayatTransaksi";
// import Message from "../components/user/Message";
// import UpdateProfile from "../components/user/UpdateProfile";
// import PengamananKorporat from "../components/pengamanan-korporat/PengamananKorporat";
// import DetailPengamananKorporat from "../components/pengamanan-korporat/DetailPengamananKorporat";
// import PengamananKorporatMobile from "../components/pengamanan-korporat/PengamananKorporatMobile";
// import DetailBadanHukumPerkumpulan from "../components/badan-hukum/DetailBadanHukumPerkumpulan";
// import DetailBadanHukumAsosiasi from "../components/badan-hukum/DetailBadanHukumAsosiasi";
// import DetailPengamananKorporatMobile from "../components/pengamanan-korporat/DetailPengamananKorporatMobile";
// import BadanUsahaOptionMobile from "../components/badan-hukum-mobile/BadanUsahaOptionMobile";
// import BadanHukumPtMobile from "../components/badan-hukum-mobile/BadanHukumPtMobile";
// import DetailBadanHukumPTMobile from "../components/badan-hukum-mobile/DetailBadanHukumPTMobile";
// import BadanHukumCvMobile from "../components/badan-hukum-mobile/BadanHukumCvMobile";
// import DetailBadanHukumCvMobile from "../components/badan-hukum-mobile/DetailBadanHukumCvMobile";
// import BadanHukumYayasanMobile from "../components/badan-hukum-mobile/BadanHukumYayasanMobile";
// import DetailBadanHukumYayasanMobile from "../components/badan-hukum-mobile/DetailBadanHukumYayasanMobile";
// import BadanHukumPerkumpulanMobile from "../components/badan-hukum-mobile/BadanHukumPerkumpulanMobile";
// import DetailBadanHukumPerkumpulanMobile from "../components/badan-hukum-mobile/DetailBadanHukumPerkumpulanMobile";
// import BadanHukumAsosiasiMobile from "../components/badan-hukum-mobile/BadanHukumAsosiasiMobile";
// import DetailBadanHukumAsosiasiMobile from "../components/badan-hukum-mobile/DetailBadanHukumAsosiasiMobile";
import IframeCummon from "../components/utils/IframeCummon";
// import BadanHukumLainnya from "../components/badan-hukum/BadanHukumLainnya";
// import DetailBadanHukumLainnya from "../components/badan-hukum/DetailBadanHukumLainnya";
// import SolusiHukum from "../components/solusi-hukum/SolusiHukum";
// import DetailSolusiHukum from "../components/solusi-hukum/DetailSolusiHukum";
// import BadanHukumLainnyaMobile from "../components/badan-hukum-mobile/BadanHukumLainnyaMobile";
// import DetailBadanHukumLainnyaMobile from "../components/badan-hukum-mobile/DetailBadanHukumLainnyaMobile";
// import DetailHistoryTransactionMobile from "../components/user-mobile/DetailHistoryTransactionMobile";
import TnosGems from "../components/user/TnosGems";
import DetailCheckoutTsaldo from "../components/user/DetailCheckoutTsaldo";
import DetailRincianPembayaranTsaldo from "../components/user/DetailRincianPembayaranTsaldo";
import DetailCheckoutVoucher from "../components/user-mobile/DetailCheckoutVoucher";
// import SolusiHukumMobile from "../components/solusi-hukum-mobile/SolusiHukumMobile";
// import DetailSolusiHukumMobile from "../components/solusi-hukum-mobile/DetailSolusiHukumMobile";
import PaymentOption from "../components/payment/PaymentOption";
import SuccessSendLinkOvo from "../components/notificationPayment/SuccessSendLinkOvo";
import PaymentOvo from "../components/payment/PaymentOvo";
import PaymentDana from "../components/payment/PaymentDana";
import PaymentShopeepay from "../components/payment/PaymentShopeepay";
import PaymentLinkAja from "../components/payment/PaymentLinkAja";
import PaymentMandiri from "../components/payment/PaymentMandiri";
import PaymentCheckout from "../components/payment/PaymentCheckout";
import PaymentBri from "../components/payment/PaymentBri";
import PaymentBca from "../components/payment/PaymentBca";
import PaymentBni from "../components/payment/PaymentBni";
import PaymentPermata from "../components/payment/PaymentPermata";
import PaymentSampoerna from "../components/payment/PaymentSampoerna";
import PaymentBsi from "../components/payment/PaymentBsi";
import PaymentCreditOrDebitCard from "../components/payment/PaymentCreditOrDebitCard";
import PaymentCreateChargeCreditCard from "../components/payment/PaymentCreateChargeCreditCard";
import PaymentSuccess from "../components/notif/PaymentSuccess";
import PaymentFailure from "../components/notif/PaymentFailure";
import PaymentProgress from "../components/notif/PaymentProgress";
import PaymentQrCode from "../components/payment/PaymentQrCode";
import PaymentCekStatus from "../components/payment/PaymentCekStatus";
import Payment from "../components/payment/Payment";
import PaymentAstrapay from "../components/payment/PaymentAstrapay";
import PaymentBjb from "../components/payment/PaymentBjb";
import BadanPt from "../components/more/badan-hukum/BadanPt";
import DetailBadanPt from "../components/more/badan-hukum/DetailBadanPt";
import Korporat from "../components/more/pengamanan/PengamananKorporat";
import Section from "../components/more/pengamanan/Section";
import SectionMobile from "../components/more/pengamanan/SectionMobile";
import PengamananProvider from "../components/more/pengamanan/PengamananProvider";
import DetailKorporat from "../components/more/pengamanan/DetailPengamananKorporat";
import Home from "../components/more/home/Home";
import MoreLogin from "../components/more/auth/Login";
import MoreOtp from "../components/more/auth/VerificationOtp";
import MoreRegister from "../components/more/auth/Register";
import MoreDashboard from "../components/more/afterlogin/Dashboard";
import MoreRiwayat from "../components/more/riwayat/RiwayatTransaksi";
import MoreDetailRiwayat from "../components/more/riwayat/DetailTransaksi";
import MoreAkun from "../components/more/akun/AkunUser";
import MoreAkunProfile from "../components/more/akun/Profile";
import MoreAkunEditProfile from "../components/more/akun/EditProfile";
import MoreAkunHelpCenter from "../components/more/akun/HelpCenter";
import MoreMessage from "../components/more/message/Message";
import MoreDetailMessage from "../components/more/message/DetailMessage";
import MoreBadanOption from "../components/more/badan-hukum/Option";
import MoreBadanCv from "../components/more/badan-hukum/BadanCv";
import MoreDetailBadanCv from "../components/more/badan-hukum/DetailBadanCv";
import MoreBadanYayasan from "../components/more/badan-hukum/BadanYayasan";
import MoreDetailBadanYayasan from "../components/more/badan-hukum/DetailBadanYayasan";
import MoreBadanPerkumpulan from "../components/more/badan-hukum/BadanPerkumpulan";
import MoreDetailBadanPerkumpulan from "../components/more/badan-hukum/DetailBadanPerkumpulan";
import MoreBadanLainnya from "../components/more/badan-hukum/BadanLainnya";
import MoreDetailBadanLainnya from "../components/more/badan-hukum/DetailBadanLainnya";
import MoreSolusiHukum from "../components/more/komprehensive-hukum/SolusiHukum";
import MoreSolusiHukumMobile from "../components/more/komprehensive-hukum/SolusiHukumMobile";
import MoreDetailSolusiHukum from "../components/more/komprehensive-hukum/DetailSolusiHukum";
import MoreDetailSolusiHukumMobile from "../components/more/komprehensive-hukum/DetailSolusiHukumMobile";
import MorePengamananKorporatMobile from "../components/more/pengamanan/PengamananKorporatMobile";
import MoreDetailPengamananKorporatMobile from "../components/more/pengamanan/DetailPengamananKorporatMobile";
import MorePembubaranPerseroan from "../components/more/badan-hukum/PembubaranPerseroan";
import OptionMobile from "../components/more/badan-hukum-mobile/Option";
import BadanPtMobile from "../components/more/badan-hukum-mobile/BadanPtMobile";
import DetailBadanPtMobile from "../components/more/badan-hukum-mobile/DetailBadanPtMobile";
import BadanCvMobile from "../components/more/badan-hukum-mobile/BadanCvMobile";
import DetailBadanCvMobile from "../components/more/badan-hukum-mobile/DetailBadanCvMobile";
import BadanYayasanMobile from "../components/more/badan-hukum-mobile/BadanYayasanMobile";
import DetailBadanYayasanMobile from "../components/more/badan-hukum-mobile/DetailBadanYayasanMobile";
import BadanPerkumpulanMobile from "../components/more/badan-hukum-mobile/BadanPerkumpulanMobile";
import DetailBadanPerkumpulanMobile from "../components/more/badan-hukum-mobile/DetailBadanPerkumpulanMobile";
import BadanLainnyaMobile from "../components/more/badan-hukum-mobile/BadanLainnyaMobile";
import DetailBadanLainnyaMobile from "../components/more/badan-hukum-mobile/DetailBadanLainnyaMobile";
import DetailTransaksiMobile from "../components/more/riwayat-mobile/DetailTransaksiMobile";
import ListPengamananProvider from "../components/more/pengamanan/LIstPengmananProvider.jsx";
import ListPengamananProviderMobile from "../components/more/pengamanan/ListPengamananProviderMobile.jsx";
import ListLayanan from "../components/dashboard/ListLayanan.jsx";
import ListLayananParams from "../components/dashboard/ListLayananParams.jsx";
import ListLayananParamsMobile from "../components/dashboard/ListLayananParamsMobile.jsx";
import ListLayananMobile from "../components/dashboard/ListLayananMobile.jsx";
import MoreOthers from "../components/more/others-page/Others";
import MoreDetailOthers from "../components/more/others-page/DetailOthers"
import PengamananKorporatMobileD from "../components/more/pengamanan/PengamananKorporatMobileD.jsx";
import DetailPengamananKorporatMobileD from "../components/more/pengamanan/DetailPengamananKorporatMobileD.jsx";
import BlankPage from "../components/more/pengamanan/BlankPage.jsx";
import PaymentBonn from "../components/payment/PaymentBonn.jsx";
import RingkasanSection from "../components/more/pengamanan/RingkasanSection.jsx";

//Context

function AppRoutes() {
  return (
    <Routes>
      {/* <Route exact path="/login" element={<LoginOtp />} /> */}
      {/* <Route exact path="/forgot-password" element={<ForgotPasswordPage />} /> */}
      {/* <Route exact path="/solusi-hukum-m" element={<SolusiHukumMobile />} /> */}
      {/* <Route
        exact
        path="/solusi-hukum-m/:id"
        element={<DetailSolusiHukumMobile />}
      /> */}
      {/* <Route
        exact
        path="/forgot-password-link/:token"
        element={<ForgotPasswordLinkPage />}
      />
      <Route
        exact
        path="/forgot-password-link/:token"
        element={<ForgotPasswordLinkPage />}
      /> */}
      {/* <Route exact path="/auth/verify/:token" element={<VerifyEmailPage />} /> */}
      {/* <Route exact path="/dashboard" element={<Dashboard />} /> */}
      {/* <Route exact path="/guard-menu" element={<GuardMenuPage />} />
      <Route exact path="/pengacara-menu" element={<PengacaraPage />} />
      <Route exact path="/daftar-pengacara" element={<ListPengacaraPage />} />
      <Route
        exact
        path="/detail-profil-pengacara"
        element={<DetailProfilPengacaraPage />}
      />
      <Route
        exact
        path="/pendampingan-hukum"
        element={<PendampinganHukumPage />}
      />
      <Route
        exact
        path="/detail-form-transaksi-badan-pt"
        element={<FormDetailTransactionPtPage />}
      />
      <Route
        exact
        path="/form-transaksi-konsultasi-hukum"
        element={<FormTransactionKonsultasiPage />}
      />
      <Route
        exact
        path="/form-transaksi-detail-konsultasi-hukum/:id"
        element={<FormDetailTransactionKonsulPage />}
      />
      <Route
        exact
        path="/form-transaksi-detail-pendampingan-hukum/:id"
        element={<FormTransactionDetailPendampinganPage />}
      />
      <Route
        exact
        path="/form-transaksi-detail-pengamanan-perorangan/:id"
        element={<FormTransactionDetailPeroranganPage />}
      />
      <Route exact path="/transaksi/success/:id" element={<NotifSuccess />} />
      <Route
        exact
        path="/form-transaksi-pendampingan-hukum"
        element={<FormTransactionPendampinganPage />}
      />
      <Route
        exact
        path="/form-transaksi-pengamanan-perorangan"
        element={<FormTransactionPeroranganPage />}
      /> */}
      {/* payment  */}
      <Route exact path="/payment-checkout" element={<PaymentCheckout />} />
      <Route exact path="/payment" element={<Payment />} />
      <Route exact path="/payment-bonn" element={<PaymentBonn />} />
      <Route exact path="/payment-option" element={<PaymentOption />} />
      {/* payment  ewallet*/}
      <Route exact path="/payment/ovo" element={<PaymentOvo />} />
      <Route exact path="/payment/dana/:id" element={<PaymentDana />} />
      <Route
        exact
        path="/payment/shopeepay/:id"
        element={<PaymentShopeepay />}
      />
      <Route exact path="/payment/linkaja/:id" element={<PaymentLinkAja />} />
      <Route exact path="/payment/astrapay/:id" element={<PaymentAstrapay />} />
      {/* payment  virtual account*/}
      <Route
        exact
        path="/payment/bank-mandiri/:id"
        element={<PaymentMandiri />}
      />
      <Route exact path="/payment/bank-bri/:id" element={<PaymentBri />} />
      <Route exact path="/payment/bank-bca/:id" element={<PaymentBca />} />
      <Route exact path="/payment/bank-bni/:id" element={<PaymentBni />} />
      <Route
        exact
        path="/payment/bank-permata/:id"
        element={<PaymentPermata />}
      />
      <Route
        exact
        path="/payment/bank-sampoerna/:id"
        element={<PaymentSampoerna />}
      />
      <Route exact path="/payment/bank-bsi/:id" element={<PaymentBsi />} />
      <Route exact path="/payment/bank-bjb/:id" element={<PaymentBjb />} />
      {/* payment  credit or debit card*/}
      <Route
        exact
        path="/payment/credit-or-debit-card/:id"
        element={<PaymentCreditOrDebitCard />}
      />
      <Route
        exact
        path="/payment/credit-or-debit-card/charge/:id"
        element={<PaymentCreateChargeCreditCard />}
      />
      {/* payment  qr code*/}
      <Route exact path="/payment/qr-code/:id" element={<PaymentQrCode />} />
      {/* payment Check Status*/}
      <Route
        exact
        path="/payment/check-status/:id"
        element={<PaymentCekStatus />}
      />
      {/* notif payment  */}
      <Route exact path="/payment/pending/:id" element={<PaymentProgress />} />
      <Route exact path="/payment/failure/:id" element={<PaymentFailure />} />
      <Route exact path="/payment/custom/success/:id" element={<PaymentSuccess />} />
      <Route
        exact
        path="/payment/notification/send-message-to-ovo"
        element={<SuccessSendLinkOvo />}
      />
      <Route
        exact
        path="/payment/notification/success/:id"
        element={<PaymentSuccess />}
      />
      <Route
        exact
        path="/payment/notification/failure/:id"
        element={<PaymentFailure />}
      />
      <Route
        exact
        path="/payment/notification/progress/:id"
        element={<PaymentProgress />}
      />
      {/*  route menu  */}
      {/* Route not found  */}
      <Route exact path="*" element={<NotFoundPage />} />
      <Route exact path="/next-update" element={<ComingsoonPage />} />
      {/* protected auth  */}

      {/* update design  */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MoreDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/business-or-legal-entity"
        element={
          <ProtectedRoute>
            <MoreBadanOption />
          </ProtectedRoute>
        }
      />
      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <MoreRiwayat />
          </ProtectedRoute>
        }
      />
      <Route
        path="/history/:id"
        element={
          <ProtectedRoute>
            <MoreDetailRiwayat />
          </ProtectedRoute>
        }
      />
      <Route
        path="/message"
        element={
          <ProtectedRoute>
            <MoreMessage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/message/:id"
        element={
          <ProtectedRoute>
            <MoreDetailMessage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <MoreAkun />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account/profile/:id"
        element={
          <ProtectedRoute>
            <MoreAkunProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account/profile/change/:id"
        element={
          <ProtectedRoute>
            <MoreAkunEditProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account/help-center"
        element={
          <ProtectedRoute>
            <MoreAkunHelpCenter />
          </ProtectedRoute>
        }
      />
      {/* <Route
        path="/pt"
        element={
          <ProtectedRoute>
            <BadanPt />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pt/checkout/:id"
        element={
          <ProtectedRoute>
            <DetailBadanPt />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cv"
        element={
          <ProtectedRoute>
            <MoreBadanCv />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cv/checkout/:id"
        element={
          <ProtectedRoute>
            <MoreDetailBadanCv />
          </ProtectedRoute>
        }
      />
      <Route
        path="/foundation"
        element={
          <ProtectedRoute>
            <MoreBadanYayasan />
          </ProtectedRoute>
        }
      />
      <Route
        path="/foundation/checkout/:id"
        element={
          <ProtectedRoute>
            <MoreDetailBadanYayasan />
          </ProtectedRoute>
        }
      />
      <Route
        path="/association"
        element={
          <ProtectedRoute>
            <MoreBadanPerkumpulan />
          </ProtectedRoute>
        }
      />
      <Route
        path="/association/checkout/:id"
        element={
          <ProtectedRoute>
            <MoreDetailBadanPerkumpulan />
          </ProtectedRoute>
        }
      />
      <Route
        path="/others"
        element={
          <ProtectedRoute>
            <MoreBadanLainnya />
          </ProtectedRoute>
        }
      /> */}
      <Route
        path="/pembayaran-lainnya"
        element={
          <ProtectedRoute>
            <MoreOthers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/others/checkout/:id"
        element={
          <ProtectedRoute>
            <MoreDetailBadanLainnya />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pembayaran-lainnya/checkout/:id"
        element={
          <ProtectedRoute>
            <MoreDetailOthers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/limited-company-dissolution"
        element={
          <ProtectedRoute>
            <MorePembubaranPerseroan />
          </ProtectedRoute>
        }
      />
      <Route
        path="/corporate-security/:mitra"
        element={
          <ProtectedRoute>
            <Korporat />
          </ProtectedRoute>
        }
      />

      <Route
        path="/corporate-security/section/:mitra"
        element={
          <ProtectedRoute>
            <Section />
          </ProtectedRoute>
        }
      />

      <Route
        path="/corporate-security-m/section/:mitra"
        element={
          <ProtectedRoute>
            <SectionMobile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/corporate-security/section/checkout/:id"
        element={
          <ProtectedRoute>
            <RingkasanSection />
          </ProtectedRoute>
        }
      />

      <Route
        path="/corporate-security-m/:mitra"
        element={
          <PengamananKorporatMobileD />
        }
      />
      <Route
        path="/corporate-security-m/authfailed"
        element={
          <BlankPage />
        }
      />
      {/* <Route
        path="/corporate-security/:id"
        element={
          <ProtectedRoute>
            <Korporat />
          </ProtectedRoute>
        }
      /> */}
      <Route
        path="/security-provider"
        element={
          <ProtectedRoute>
            <PengamananProvider />
          </ProtectedRoute>
        }
      />
      <Route
        path="/security-providers"
        element={
          <ProtectedRoute>
            <ListPengamananProvider />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pengamanan-corporate-m"
        element={
          <ProtectedRoute>
            <ListPengamananProviderMobile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/services-list/:mitra"
        element={
          <ProtectedRoute>
            <ListLayanan />
          </ProtectedRoute>
        }
      />
      <Route
        path="/services-list/layanan/:mitra"
        element={
          <ProtectedRoute>
            <ListLayananParams />
          </ProtectedRoute>
        }
      />

      <Route
        path="/services-list-m/layanan/:mitra"
        element={
          <ProtectedRoute>
            <ListLayananParamsMobile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/services-list-m/:mitra"
        element={
          <ListLayananMobile />
        }
      />
      <Route
        path="/corporate-security/checkout/:id"
        element={
          <ProtectedRoute>
            <DetailKorporat />
          </ProtectedRoute>
        }
      />

      <Route
        path="/corporate-security-m/checkout/:id"
        element={
          <ProtectedRoute>
            <DetailPengamananKorporatMobileD />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pengamanan-korporat-m"
        element={
          <ListPengamananProviderMobile />
        }
      />
      <Route
        path="/pengamanan-korporat-m/checkout/:id"
        element={
          <MoreDetailPengamananKorporatMobile />
        }
      />
      <Route
        path="/comprehensive-Legal-solutions"
        element={
          <ProtectedRoute>
            <MoreSolusiHukum />
          </ProtectedRoute>
        }
      />

      <Route
        path="/comprehensive-Legal-solutions/checkout/:id"
        element={
          <ProtectedRoute>
            <MoreDetailSolusiHukum />
          </ProtectedRoute>
        }
      />
      <Route path="/solusi-hukum-m" element={<MoreSolusiHukumMobile />} />
      <Route
        path="/solusi-hukum-m/checkout/:id"
        element={<MoreDetailSolusiHukumMobile />}
      />

      <Route path="/badan-usaha-m" element={<OptionMobile />} />
      {/* <Route path="/badan-usaha-pt-m" element={<BadanPtMobile />} />
      <Route
        path="/badan-usaha-pt-m/checkout/:id"
        element={<DetailBadanPtMobile />}
      />
      <Route path="/badan-usaha-cv-m" element={<BadanCvMobile />} />
      <Route
        path="/badan-usaha-cv-m/checkout/:id"
        element={<DetailBadanCvMobile />}
      />
      <Route path="/badan-usaha-yayasan-m" element={<BadanYayasanMobile />} />
      <Route
        path="/badan-usaha-yayasan-m/checkout/:id"
        element={<DetailBadanYayasanMobile />}
      />
      <Route
        path="/badan-usaha-perkumpulan-m"
        element={<BadanPerkumpulanMobile />}
      />
      <Route
        path="/badan-usaha-perkumpulan-m/checkout/:id"
        element={<DetailBadanPerkumpulanMobile />}
      />
      <Route path="/badan-usaha-lainnya-m" element={<BadanLainnyaMobile />} />
      <Route
        path="/badan-usaha-lainnya-m/checkout/:id"
        element={<DetailBadanLainnyaMobile />}
      /> */}
      <Route
        path="/riwayat-transaksi-m/*"
        element={<DetailTransaksiMobile />}
      />
      {/* close update design  */}

      {/* <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      /> */}
      {/* <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      /> */}
      {/* <Route
        path="/riwayat-transaksi"
        element={
          <ProtectedRoute>
            <HistoryTransaction />
          </ProtectedRoute>
        }
      /> */}
      {/* <Route
        path="/riwayat-transaksi/:id"
        element={
          <ProtectedRoute>
            <DetailRiwayatTransaksi />
          </ProtectedRoute>
        }
      /> */}
      {/* <Route
        path="/message"
        element={
          <ProtectedRoute>
            <Message />
          </ProtectedRoute>
        }
      /> */}
      {/* <Route
        path="/profile/:id"
        element={
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        }
      /> */}
      {/* <Route
        path="/pengamanan-korporat"
        element={
          <ProtectedRoute>
            <PengamananKorporat />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pengamanan-korporat/:id"
        element={
          <ProtectedRoute>
            <DetailPengamananKorporat />
          </ProtectedRoute>
        }
      />
      <Route
        path="/badan-usaha"
        element={
          <ProtectedRoute>
            <BadanUsahaOption />
          </ProtectedRoute>
        }
      />
      <Route
        path="/badan-usaha-pt"
        element={
          <ProtectedRoute>
            <BadanHukumPt />
          </ProtectedRoute>
        }
      />
      <Route
        path="/badan-usaha-pt/:id"
        element={
          <ProtectedRoute>
            <DetailBadanHukumPT />
          </ProtectedRoute>
        }
      />
      <Route
        path="/badan-usaha-cv"
        element={
          <ProtectedRoute>
            <BadanHukumCv />
          </ProtectedRoute>
        }
      />
      <Route
        path="/badan-usaha-cv/:id"
        element={
          <ProtectedRoute>
            <DetailBadanHukumCv />
          </ProtectedRoute>
        }
      />
      <Route
        path="/badan-usaha-yayasan"
        element={
          <ProtectedRoute>
            <BadanHukumYayasan />
          </ProtectedRoute>
        }
      />
      <Route
        path="/badan-usaha-yayasan/:id"
        element={
          <ProtectedRoute>
            <DetailBadanHukumYayasan />
          </ProtectedRoute>
        }
      />
      <Route
        path="/badan-hukum-perkumpulan"
        element={
          <ProtectedRoute>
            <BadanHukumPerkumpulan />
          </ProtectedRoute>
        }
      />
      <Route
        path="/badan-hukum-perkumpulan/:id"
        element={
          <ProtectedRoute>
            <DetailBadanHukumPerkumpulan />
          </ProtectedRoute>
        }
      />
      <Route
        path="/badan-usaha-asosiasi"
        element={
          <ProtectedRoute>
            <BadanHukumAsosiasi />
          </ProtectedRoute>
        }
      />
      <Route
        path="/badan-usaha-asosiasi/:id"
        element={
          <ProtectedRoute>
            <DetailBadanHukumAsosiasi />
          </ProtectedRoute>
        }
      />
      <Route
        path="/badan-usaha-lainnya"
        element={
          <ProtectedRoute>
            <BadanHukumLainnya />
          </ProtectedRoute>
        }
      />
      <Route
        path="/badan-usaha-lainnya/:id"
        element={
          <ProtectedRoute>
            <DetailBadanHukumLainnya />
          </ProtectedRoute>
        }
      />
      <Route
        path="/solusi-hukum"
        element={
          <ProtectedRoute>
            <SolusiHukum />
          </ProtectedRoute>
        }
      />
      <Route
        path="/solusi-hukum/:id"
        element={
          <ProtectedRoute>
            <DetailSolusiHukum />
          </ProtectedRoute>
        }
      /> */}
      <Route
        path="/tnos-gems"
        element={
          <ProtectedRoute>
            <TnosGems />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tnos-gems/:id"
        element={
          <ProtectedRoute>
            <DetailCheckoutTsaldo />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tnos-gems/rincian/:id"
        element={
          <ProtectedRoute>
            <DetailRincianPembayaranTsaldo />
          </ProtectedRoute>
        }
      />
      {/* protected auth  */}
      {/* protected is login  */}
      {/* <Route
        path="/login"
        element={
          <IsLogin>
            <LoginOtp />
          </IsLogin>
        }
      />
      <Route
        path="/register"
        element={
          <IsLogin>
            <Register />
          </IsLogin>
        }
      />
      <Route
        path="/verified-otp"
        element={
          <IsLogin>
            <VerifyOtp />
          </IsLogin>
        }
      /> */}
      {/* <Route
        path="/pengamanan-korporat-m/*"
        element={
          <IsLogin>
            <PengamananKorporatMobile />
          </IsLogin>
        }
      />
      <Route
        path="/pengamanan-korporat-m/detail/:id"
        element={
          <IsLogin>
            <DetailPengamananKorporatMobile />
          </IsLogin>
        }
      /> */}
      {/* <Route
        path="/badan-usaha-m/*"
        element={
          <IsLogin>
            <BadanUsahaOptionMobile />
          </IsLogin>
        }
      />
      <Route
        path="/badan-usaha-pt-m"
        element={
          <IsLogin>
            <BadanHukumPtMobile />
          </IsLogin>
        }
      /> */}
      {/* <Route
        path="/badan-usaha-pt-m/detail/:id"
        element={
          <IsLogin>
            <DetailBadanHukumPTMobile />
          </IsLogin>
        }
      />
      <Route
        path="/badan-usaha-cv-m"
        element={
          <IsLogin>
            <BadanHukumCvMobile />
          </IsLogin>
        }
      /> */}
      {/* <Route
        path="/badan-usaha-cv-m/detail/:id"
        element={
          <IsLogin>
            <DetailBadanHukumCvMobile />
          </IsLogin>
        }
      />
      <Route
        path="/badan-usaha-yayasan-m"
        element={
          <IsLogin>
            <BadanHukumYayasanMobile />
          </IsLogin>
        }
      /> */}
      {/* <Route
        path="/badan-usaha-yayasan-m/detail/:id"
        element={
          <IsLogin>
            <DetailBadanHukumYayasanMobile />
          </IsLogin>
        }
      />
      <Route
        path="/badan-usaha-perkumpulan-m"
        element={
          <IsLogin>
            <BadanHukumPerkumpulanMobile />
          </IsLogin>
        }
      /> */}
      {/* <Route
        path="/badan-usaha-perkumpulan-m/detail/:id"
        element={
          <IsLogin>
            <DetailBadanHukumPerkumpulanMobile />
          </IsLogin>
        }
      />
      <Route
        path="/badan-usaha-asosiasi-m"
        element={
          <IsLogin>
            <BadanHukumAsosiasiMobile />
          </IsLogin>
        }
      /> */}
      {/* <Route
        path="/badan-usaha-asosiasi-m/detail/:id"
        element={
          <IsLogin>
            <DetailBadanHukumAsosiasiMobile />
          </IsLogin>
        }
      />
      <Route
        path="/badan-usaha-lainnya-m"
        element={
          <IsLogin>
            <BadanHukumLainnyaMobile />
          </IsLogin>
        }
      />
      <Route
        path="/badan-usaha-lainnya-m/detail/:id"
        element={
          <IsLogin>
            <DetailBadanHukumLainnyaMobile />
          </IsLogin>
        }
      /> */}
      <Route
        path="/iframe/pembayaran/:id"
        element={
          <IsLogin>
            <IframeCummon />
          </IsLogin>
        }
      />
      {/* <Route
        path="/riwayat-transaksi-m/*"
        element={
          <IsLogin>
            <DetailHistoryTransactionMobile />
          </IsLogin>
        }
      /> */}
      <Route
        path="/voucher-m/*"
        element={
          <IsLogin>
            <DetailCheckoutVoucher />
          </IsLogin>
        }
      />
      {/* <Route
        path="/"
        element={
          <IsLogin>
            <HomePage />
          </IsLogin>
        }
      /> */}
      {/* // update design figma */}
      <Route
        path="/"
        element={
          <IsLogin>
            <Home />
          </IsLogin>
        }
      />
      <Route
        path="/auth/login"
        element={
          <IsLogin>
            <MoreLogin />
          </IsLogin>
        }
      />
      <Route
        path="/auth/login/otp"
        element={
          <IsLogin>
            <MoreOtp />
          </IsLogin>
        }
      />
      <Route
        path="/auth/register"
        element={
          <IsLogin>
            <MoreRegister />
          </IsLogin>
        }
      />
      {/* // close design figma */}
    </Routes>
  );
}

export default AppRoutes;
