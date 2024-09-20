import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import english from "./english";
// import indonesia from "./indonesia";

i18n.use(initReactI18next).init({
  debug: false,
  fallbackLng: localStorage.getItem("code")
    ? localStorage.getItem("code")
    : "idn",
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  // language resources
  resources: {
    en: {
      translation: {
        welcome: "Welcome to React",
        Profil: "Profile",
        Pilih_Bahasa: "Select a language",
        Pusat_Bantuan: "Help Center",
        Nilai_Aplikasi: "App Value",
        Pilih: "Choose",
        Keluar: "Log Out",
        Akun: "Account",
        Pesan: "Message",
        no_ktp: "ID card number",
        nama_lengkap: "Full Name",
        no_telepon: "Mobile Number",
        ubah: "Change",
        ubah_profil: "Change profile",
        riwayat: "History",
        beranda: "Home",
        riwayat_transaksi: "Transaction History",
        semua: "All",
        pengacara: "Lawyer",
        pengamanan: "Security",
        badan_hukum: "Legal entity",
        lanjutkan_pembayaran: "Continue Paying",

        // halaman badan hukum CV
        badan_hukum_yayasan: "Pembuatan Badan Hukum Yayasan",
        detail_badan_hukum_yayasan: "Detail Badan Hukum Yayasan",
        badan_hukum_cv: "Creation of Legal Entities CV",
        p_cv: "Create a trustworthy and fast legal entity CV with all the facilities and handled by expert teams. You can just sit back and monitor the process from home.",
        f_ktp_all_cv: "ID & Tax ID of all shareholders",
        f_name_cv: "CV Name (Enter at least 3 names)",
        f_modal_cv: "Company's Starting Capital (Fictitious)",
        f_disetor_cv: "Amount of Capital Deposited (Min. 25%)",
        f_alamat_cv:
          "CV Address (Format: Street/Number/Block (space) RT/RW (space) Village (space) District (space) City/Town (space) Province",
        f_saham_cv: "Shareholder Structure (Mr./Mrs.______ owns ___%)",
        f_direksi_cv:
          "Directors and Commissioners Structure (If there are more than 1 director and commissioner each, one of them is appointed as the main director and commissioner)",
        f_bidang_cv: "Business Field KBLI 2020 (Maximum 5, can be seen in",
        f_nomer_cv: "Phone Number of Responsible",

        // halaman badan hukum PT
        badan_usaha: "Legalitas Badan Usaha",
        badan_hukum_pt: "Creation of Legal Entities PT",
        klasifikasi_pt: "Select Classification PT",
        p_pt: "Create a trustworthy and fast legal entity PT with all the facilities and handled by expert teams. You can just sit back and monitor the process from home.",
        f_ktp_all_pt: "ID & Tax ID of all shareholders",
        f_name_pt: "PT Name (Enter at least 3 names)",
        f_modal_pt: "Company's Starting Capital (Fictitious)",
        f_disetor_pt: "Amount of Capital Deposited (Min. 25%)",
        f_alamat_pt:
          "CV Address (Format: Street/Number/Block (space) RT/RW (space) Village (space) District (space) City/Town (space) Province",
        f_saham_pt: "Shareholder Structure (Mr./Mrs.______ owns ___%)",
        f_direksi_pt:
          "Composition of Directors and Commissioners (If there are more than 1 director and commissioner respectively, one of them is appointed as director and main commissioner)",
        f_bidang_pt: "KBLI Business Sector 2020 (Maximum 5, can be seen at ",
        f_nomer_pt: "Phone Number of Responsible",

        // halaman pengamanan korporat
        detail_k: "corporate security details",
        pengamanan_k: "Security Corporate",
        p_k: "Order security and protection services according to your needs, 24 hour access to security partner services ready to carry out personal protection and protection of your assets or business property.",
        keperluan_k: "The need for legal protection",
        telepon_k: "Phone Number or What's App",
        alamat_k:
          "Enter the location for the security meet-up point by clicking",
        waktu_k: "Choose the time for the protection",
        jumlah_k: "Choose the number of security personnel",
        durasi_k: "Choose the number of hours for the protection",
        personil: "personnel",
        jam: "Hour",
        total_pembayaran: "Total Payment",
        bayar_sekarang: "Pay Now",

        // halaman konsultasi hukum
        pengacara_k: "Legal Consultation",

        // halaman pendampingan hukum
        pengacara_p: "Legal Assistance",

        // halaman pendampingan hukum
        pengamanan_p: "Individual Security",

        // halaman badan hukum CV
        detail_badan_hukum_cv: "Legal Entity Details CV",

        // halaman badan hukum PT
        detail_badan_hukum_pt: "Legal Entity Details PT",
        clasification_pt: "Clasification",

        // error text inputs //
        text_error1: "Phone number is required",
        text_error2: "Captcha is required",

        // account //
        account1: "Name",
        account2: "Email",
        account3: "Phone Number",

        // payment status //
        payment_status1: "Unpaid",
        payment_status2: "Paid",

        // order status //
        order_status1: "Waiting",
        order_status2: "Order processed",
        order_status3: "Order in progress",
        order_status4: "Getting Corporate Partners",
        order_status5: "Heading to Corporate Location",
        order_status6: "Corporate in progress",
        order_status7: "Checking Business Documents",
        order_status8: "Finished",
        order_status9: "Business Document Registration",
        order_status10: "Business Document Registration Completed",
        order_status11: "Business Document Handover",

        // day names //
        day1: "Monday",
        day2: "Tuesday",
        day3: "Wednesday",
        day4: "Thursday",
        day5: "Friday",
        day6: "Saturday",
        day7: "Sunday",

        // month names //
        month1: "January",
        month2: "February",
        month3: "March",
        month4: "April",
        month5: "May",
        month6: "June",
        month7: "July",
        month8: "August",
        month9: "September",
        month10: "October",
        month11: "November",
        month12: "December",

        // dashboard //
        service1: "Business Legalities",
        service2: "Corporate Security",
        service3: "Comprehensive Legal Solutions",
        service4: "Legal Consultation via Video Call",
        service5: "Legal Assistance",
        service6: "Personal Security",

        // business entity names //
        entity1: "PT",
        entity2: "CV",
        entity3: "Foundation",
        entity4: "Association",
        entity5: "Others",
        entity6: "Business Entity PT",
        entity7: "Business Entity CV",
        entity8: "Business Entity Foundation",
        entity9: "Business Entity Association",

        // navigation //
        nav1: "Home",
        nav2: "History",
        nav3: "Website",
        nav4: "Messages",
        nav5: "Account",

        // profile //
        profile_menu1: "Profile",
        profile_menu2: "Select Language",
        profile_menu3: "Help Center",
        profile_menu4: "Rate App",
        profile_menu5: "Logout",
        profile_menu6: "Select",
        profile_menu7: "English",
        profile_menu8: "Indonesian",

        // landing page //
        landing_page1: "TNOS always ready anytime and anywhere!",
        landing_page2:
          "An application that makes your life safer and more comfortable, always ready to accompany and consult all your needs and problems",
        landing_page3: "LOGIN",
        landing_page4: "REGISTER",
        landing_page5: "By logging in or registering, you have agreed to our",
        landing_page6: " Terms of Service",
        landing_page7: " and ",
        landing_page8: "Privacy Policy",

        // login //
        login1: "Login",
        login2: "Enter your registered phone number",
        login3: "To log in to your account or register as a new user.",
        login4: "Phone Number",
        login5: "Enter your phone number",
        login6: "Enter your phone number here",
        login7: "Remember Me",
        login8: "Forgot Password?",
        login9: "LOGIN",

        // registration //
        registration1: "Register",
        registration2: "Enter your personal information below",
        registration3: "Full Name",
        registration4: "Enter your full name",
        registration5: "Email",
        registration6: "Enter your email address",
        registration7: "Password",
        registration8: "Enter your password",
        registration9: "Confirm Password",
        registration10: "Re-enter your password",
        registration11: "REGISTER",

        // home //
        home1: "Welcome to TNOS!",
        home2: "Select a service to get started",
        home3: "Services",
        home4: "Notifications",
        home5: "No notifications",
        home6: "See all",
        home7: "Quick Menu",
        home8: "Contact Us",

        // history //
        history1: "History",
        history2: "Filter by date",
        history3: "Order Status",
        history4: "Payment Status",

        // website //
        website1: "Website",
        website2: "Visit our website for more information",
        website3: "Visit Website",

        // messages //
        messages1: "Messages",
        messages2: "No messages yet",
        messages3: "Send a message",
        messages4: "Type a message...",
        messages5: "Send",

        // account page //
        account_page1: "My Account",
        account_page2: "Edit",
        account_page3: "Save",
        account_page4: "Cancel",
        account_page5: "Change Password",
        account_page6: "Current Password",
        account_page7: "Enter your current password",
        account_page8: "New Password",
        account_page9: "Enter your new password",
        account_page10: "Confirm New Password",
        account_page11: "Re-enter your new password",
        account_page12: "SAVE CHANGES",
        account_page13: "Cancel",
      },
    },

    idn: {
      translation: {
        welcome: "Selamat datang di React",
        Profil: "Profil",
        Pilih_Bahasa: "Pilih Bahasa",
        Pusat_Bantuan: "Pusat Bantuan",
        Nilai_Aplikasi: "Nilai Aplikasi",
        Pilih: "Pilih",
        Keluar: "Keluar",
        Akun: "Akun",
        Pesan: "Pesan",
        no_ktp: "Nomer ktp",
        nama_lengkap: "Nama Lengkap",
        no_telepon: "Nomer Handphone",
        ubah: "Ubah",
        ubah_profil: "Ubah profil",
        riwayat: "Riwayat",
        beranda: "Beranda",
        riwayat_transaksi: "Riwayat Transaksi",
        semua: "Semua",
        pengacara: "Pengacara",
        pengamanan: "Pengamanan",
        badan_hukum: "badan Hukum",
        lanjutkan_pembayaran: "Lanjutkan Membayar",

        // halaman badan hukum CV
        badan_hukum_yayasan: "Pembuatan Badan Hukum Yayasan",
        detail_badan_hukum_yayasan: "Detail Badan hukum Yayasan",
        csh: "Pembuatan Badan Hukum CV",
        badan_hukum_cv: "Pembuatan Badan Usaha CV",
        p_cv: "Buat legalitas badan CV terpercaya dan cepat dengan segala kemudahan serta ditangani oleh para tim ahli. Terima beres hanya pantau proses nya dari rumah.",
        f_ktp_all_cv: "KTP & NPWP Seluruh pemegang saham",
        f_name_cv: "Nama CV (Minimal masukan 3 nama)",
        f_modal_cv: "Modal Dasar Perusahaan (Fiktif)",
        f_disetor_cv: "Jumlah modal yang disetor (Min.25%)",
        f_alamat_cv:
          "Alamat CV (format penulisan alamat) Jalan/Nomor/Blok (spasi) RT/RW (spasi) Kelurahan (spasi) Kecamatan (spasi) Kota/Kabupaten (spasi) Provinsi",
        f_saham_cv: "Susunan Pemegang Saham(Tuan/Nyonya ______ sebanyak ___ %)",
        f_direksi_cv:
          "Susunan Direksi dan Komisaris (Apabila terdapat lebih dari 1 direktur dan komisaris masing-masing, salah satunya diangkat menjadi direktur dan komisaris utama)",
        f_bidang_cv: "Bidang Usaha KBLI 2020 (Maksimal 5, dapat dilihat di",
        f_nomer_cv: "Nomer HP Penanggung Jawab",

        // halaman badan hukum PT
        badan_usaha: "Legalitas Badan Usaha",
        badan_hukum_pt: "Pembuatan Badan Usaha PT",
        klasifikasi_pt: "Pilih Klasifikasi PT",
        p_pt: "Buat legalitas badan PT terpercaya dan cepat dengan segala kemudahan serta ditangani oleh para tim ahli. Terima beres hanya pantau proses nya dari rumah.",
        f_ktp_all_pt: "KTP & NPWP Seluruh pemegang saham",
        f_name_pt: "Nama PT (Minimal masukan 3 nama)",
        f_modal_pt: "Modal Dasar Perusahaan (Fiktif)",
        f_disetor_pt: "Jumlah modal yang disetor (Min.25%)",
        f_alamat_pt:
          "Alamat CV (format penulisan alamat) Jalan/Nomor/Blok (spasi) RT/RW (spasi) Kelurahan (spasi) Kecamatan (spasi) Kota/Kabupaten (spasi) Provinsi",
        f_saham_pt: "Susunan Pemegang Saham(Tuan/Nyonya ______ sebanyak ___ %)",
        f_direksi_pt:
          "Susunan Direksi dan Komisaris (Apabila terdapat lebih dari 1 direktur dan komisaris masing-masing, salah satunya diangkat menjadi direktur dan komisaris utama)",
        f_bidang_pt: "Bidang Usaha KBLI 2020 (Maksimal 5, dapat dilihat di",
        f_nomer_pt: "Nomer HP Penanggung Jawab",

        // halaman pengamanan korporat
        detail_k: "Detail Pengamanan Korporat",
        pengamanan_k: "Pengamanan Korporat",
        p_k: "Pesan mitra pengamanan dan pengawalan sesuai kebutuhan mu, akses layanan 24 jam mitra pengamanan siap siaga melakukan pengawalan dan pengamanan pribadi serta aset atau property usaha mu.",
        keperluan_k: "Keperluan pengamanan hukum",
        telepon_k: "No. Telephone / Whats App",
        alamat_k: "Masukan alamat titik temu pengamanan klik",
        waktu_k: "Pilih waktu pengamanan",
        jumlah_k: "Jumlah Tenaga Pengamanan",
        durasi_k: "Pilih Durasi Jam",
        personil: "Personil",
        jam: "Jam",
        total_pembayaran: "Total Pembayaran",
        bayar_sekarang: "Bayar Sekarang",

        // halaman konsultasi hukum
        pengacara_k: "Konsultasi Hukum",

        // halaman pendampingan hukum
        pengacara_p: "Pendampingan Hukum",

        // halaman pendampingan hukum
        pengamanan_p: "Pengamanan Perorangan",

        // halaman badan hukum CV
        detail_badan_hukum_cv: "Detail Badan Usaha CV",

        // halaman badan hukum PT
        detail_badan_hukum_pt: "Detail Badan Usaha PT",
        clasification_pt: "Klasifikasi",

        // error text inputs //
        text_error1: "Phone number is required",
        text_error2: "Captcha is required",

        // account //
        account1: "Name",
        account2: "Email",
        account3: "Phone Number",

        // payment status //
        payment_status1: "Unpaid",
        payment_status2: "Paid",

        // order status //
        order_status1: "Waiting",
        order_status2: "Order processed",
        order_status3: "Order in progress",
        order_status4: "Getting Corporate Partners",
        order_status5: "Heading to Corporate Location",
        order_status6: "Corporate in progress",
        order_status7: "Checking Business Documents",
        order_status8: "Finished",
        order_status9: "Business Document Registration",
        order_status10: "Business Document Registration Completed",
        order_status11: "Business Document Handover",

        // day names //
        day1: "Monday",
        day2: "Tuesday",
        day3: "Wednesday",
        day4: "Thursday",
        day5: "Friday",
        day6: "Saturday",
        day7: "Sunday",

        // month names //
        month1: "January",
        month2: "February",
        month3: "March",
        month4: "April",
        month5: "May",
        month6: "June",
        month7: "July",
        month8: "August",
        month9: "September",
        month10: "October",
        month11: "November",
        month12: "December",

        // dashboard //
        service1: "Business Legalities",
        service2: "Corporate Security",
        service3: "Comprehensive Legal Solutions",
        service4: "Legal Consultation via Video Call",
        service5: "Legal Assistance",
        service6: "Personal Security",

        // business entity names //
        entity1: "PT",
        entity2: "CV",
        entity3: "Foundation",
        entity4: "Association",
        entity5: "Others",
        entity6: "Business Entity PT",
        entity7: "Business Entity CV",
        entity8: "Business Entity Foundation",
        entity9: "Business Entity Association",

        // navigation //
        nav1: "Home",
        nav2: "History",
        nav3: "Website",
        nav4: "Messages",
        nav5: "Account",

        // profile //
        profile_menu1: "Profile",
        profile_menu2: "Select Language",
        profile_menu3: "Help Center",
        profile_menu4: "Rate App",
        profile_menu5: "Logout",
        profile_menu6: "Select",
        profile_menu7: "English",
        profile_menu8: "Indonesian",

        // landing page //
        landing_page1: "TNOS always ready anytime and anywhere!",
        landing_page2:
          "An application that makes your life safer and more comfortable, always ready to accompany and consult all your needs and problems",
        landing_page3: "LOGIN",
        landing_page4: "REGISTER",
        landing_page5: "By logging in or registering, you have agreed to our",
        landing_page6: " Terms of Service",
        landing_page7: " and ",
        landing_page8: "Privacy Policy",

        // login //
        login1: "Login",
        login2: "Enter your registered phone number",
        login3: "To log in to your account or register as a new user.",
        login4: "Phone Number",
        login5: "Enter your phone number",
        login6: "Enter your phone number here",
        login7: "Remember Me",
        login8: "Forgot Password?",
        login9: "LOGIN",

        // registration //
        registration1: "Register",
        registration2: "Enter your personal information below",
        registration3: "Full Name",
        registration4: "Enter your full name",
        registration5: "Email",
        registration6: "Enter your email address",
        registration7: "Password",
        registration8: "Enter your password",
        registration9: "Confirm Password",
        registration10: "Re-enter your password",
        registration11: "REGISTER",

        // home //
        home1: "Welcome to TNOS!",
        home2: "Select a service to get started",
        home3: "Services",
        home4: "Notifications",
        home5: "No notifications",
        home6: "See all",
        home7: "Quick Menu",
        home8: "Contact Us",

        // history //
        history1: "History",
        history2: "Filter by date",
        history3: "Order Status",
        history4: "Payment Status",

        // website //
        website1: "Website",
        website2: "Visit our website for more information",
        website3: "Visit Website",

        // messages //
        messages1: "Messages",
        messages2: "No messages yet",
        messages3: "Send a message",
        messages4: "Type a message...",
        messages5: "Send",

        // account page //
        account_page1: "My Account",
        account_page2: "Edit",
        account_page3: "Save",
        account_page4: "Cancel",
        account_page5: "Change Password",
        account_page6: "Current Password",
        account_page7: "Enter your current password",
        account_page8: "New Password",
        account_page9: "Enter your new password",
        account_page10: "Confirm New Password",
        account_page11: "Re-enter your new password",
        account_page12: "SAVE CHANGES",
        account_page13: "Cancel",
      },
    },
  },
});

export default i18n;
