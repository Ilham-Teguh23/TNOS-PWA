import * as Yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const notCharReg = /^[a-zA-Z\s]+$/;

  const generateNameBadanValidation = (fieldName, index) => {
    return Yup.string()
      .required(`${fieldName} ${index} wajib di isi`)
      .matches(notCharReg, `${fieldName} ${index} harus berisi karakter dan tidak boleh angka`);
  }
  
  const generateModal = (fieldName) => {
    return Yup.string()
      .required(`${fieldName} wajib di isi`)
      .matches(/^\d+$/, `${fieldName} hanya boleh berisi angka`)
      .min(0, `${fieldName} minimal harus lebih besar atau sama dengan 0`)
      .max(1000000000, `${fieldName} maximal harus lebih besar atau sama dengan 1000000000`)
  }
  
  const allowedFileFormats = ["jpg", "jpeg", "png", "svg", "pdf"]
  
  const generateFileDocument = () => {
    return Yup.array()
      .required("File/Image wajib diisi")
      .test("fileFormat", "Hanya file JPG, JPEG, PNG, SVG dan PDF yang diizinkan", (files) => {
        if (!files || files.length === 0) {
          return true;
        }
  
        const invalidFiles = files.some((file) => {
          const fileName = file.name.toLowerCase();
          const fileExtension = fileName.split(".").pop();
  
          return !allowedFileFormats.includes(fileExtension);
        });
  
        return !invalidFiles;
      })
  }

const loginSchema = Yup.object({
  captcha: Yup.string().required("Captcha wajib di isi"),
  phone: Yup.string().required("Phone number wajib di isi"),
});

const verificationOtpSchema = Yup.object({
  otp: Yup.string().required("OTP wajib di isi"),
});

const registerSchema = Yup.object({
  name: Yup.string().required("Name wajib di isi"),
  email: Yup.string()
    .email("Email is not valid")
    .required("Email wajib di isi"),
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number wajib di isi"),
});

const ptSchema = Yup.object({
  name_badan_hukum1: generateNameBadanValidation("Name Usaha", 1),
  name_badan_hukum2: generateNameBadanValidation("Name Usaha", 2),
  name_badan_hukum3: generateNameBadanValidation("Name Usaha", 3),
  partner: Yup.object().required("Partner wajib di isi"),
  klasifikasi: Yup.object().required("Klasifikasi wajib di isi"),
  file_document: generateFileDocument(),
  modal_dasar: generateModal('Modal dasar'),
  modal_disetor: generateModal("Modal disetor"),

  domisili_sekarang: Yup.string().required(
    "Domisili Sekarang usaha wajib di isi"
  ),
  jalan: Yup.string().required("Jalan wajib di isi"),
  rt: Yup.string().required("No RT wajib di isi").matches(/^\d+$/, "No RT hanya boleh berisi angka"),
  rw: Yup.string().required("No RW wajib di isi").matches(/^\d+$/, "No RW hanya boleh berisi angka"),
  provinsi: Yup.object().required("Provinsi wajib di isi"),
  kabupaten: Yup.object().required("Kabupaten wajib di isi"),
  kecamatan: Yup.object().required("Kecamatan wajib di isi"),
  kelurahan: Yup.object().required("Kelurahan wajib di isi"),
  kode_pos: Yup.string().required("Kode Pos wajib di isi").matches(/^\d{5}$/, "Kode Pos harus terdiri dari 5 digit angka"),
  susunan_direksi: Yup.array().required("Direksi wajib di isi"),
  pemegang_saham: Yup.array().required("Pemegang saham wajib di isi"),
  bidang_usaha: Yup.array().required("Bidang Usaha wajib di isi"),
  email_badan_hukum: Yup.string().required("Email badan hukum wajib di isi"),
  phone_badan_hukum: Yup.string()
    .matches(phoneRegExp, "Nomor HP badan hukum tidak valid")
    .required("Phone badan hukum wajib di isi"),
  ketentuan_cek: Yup.boolean().oneOf([true], "Ketentuan wajib diisi"),
  // bidang_usaha: Yup.string().required("Bidang usaha wajib di isi"),
  // kabupaten: Yup.object().required("Kabupaten wajib di isi"),
  // kecamatan: Yup.object().required("kecamatan wajib di isi"),
  // kelurahan: Yup.object().required("Kelurahan wajib di isi"),
  // kode_pos: Yup.number()
  //   .typeError("Kode pos must be a number")
  //   .required("Kode pos wajib di isi"),
  // detail_alamat: Yup.string().required("Detail alamat badan hukum wajib di isi"),
  // ketentuan: Yup.boolean().oneOf([true], "Ketentuan wajib di isi"),
});

const cvSchema = Yup.object({
  name_badan_hukum1: generateNameBadanValidation("Nama Usaha", 1),
  name_badan_hukum2: generateNameBadanValidation("Nama Usaha", 2),
  name_badan_hukum3: generateNameBadanValidation("Nama Usaha", 3),
  partner: Yup.object().required("Partner wajib di isi"),
  file_document: generateFileDocument(),
  modal_dasar: Yup.number().required("Modal dasar wajib di isi"),
  modal_disetor: Yup.number().required("Modal disetor wajib di isi"),

  domisili_sekarang: Yup.string().required(
    "Domisili Sekarang usaha wajib di isi"
  ),
  jalan: Yup.string().required("Jalan wajib di isi"),
  rt: Yup.string().required("No RT wajib di isi").matches(/^\d+$/, "No RT hanya boleh berisi angka"),
  rw: Yup.string().required("No RW wajib di isi").matches(/^\d+$/, "No RW hanya boleh berisi angka"),
  provinsi: Yup.object().required("Provinsi wajib di isi"),
  kabupaten: Yup.object().required("Kabupaten wajib di isi"),
  kecamatan: Yup.object().required("Kecamatan wajib di isi"),
  kelurahan: Yup.object().required("Kelurahan wajib di isi"),
  kode_pos: Yup.string().required("Kode Pos wajib di isi").matches(/^\d{5}$/, "Kode Pos harus terdiri dari 5 digit angka"),
  susunan_direksi: Yup.array().required("Direksi wajib di isi"),
  pemegang_saham: Yup.array().required("Pemegang saham wajib di isi"),
  bidang_usaha: Yup.array().required("Bidang Usaha wajib di isi"),
  email_badan_hukum: Yup.string().required("Email badan hukum wajib di isi"),
  phone_badan_hukum: Yup.string()
    .matches(phoneRegExp, "Nomor HP badan hukum tidak valid")
    .required("Phone badan hukum wajib di isi"),
  ketentuan_cek: Yup.boolean().oneOf([true], "Ketentuan wajib di isi"),
});

const yayasanSchema = Yup.object({
  name_badan_hukum1: generateNameBadanValidation("Nama Yayasan", 1),
  name_badan_hukum2: generateNameBadanValidation("Nama Yayasan", 2),
  name_badan_hukum3: generateNameBadanValidation("Nama Yayasan", 3),
  partner: Yup.object().required("Partner wajib di isi"),
  file_document: generateFileDocument(),
  domisili_sekarang: Yup.string().required(
    "Domisili Sekarang usaha wajib di isi"
  ),
  jalan: Yup.string().required("Jalan wajib di isi"),
  rt: Yup.string().required("No RT wajib di isi").matches(/^\d+$/, "No RT hanya boleh berisi angka"),
  rw: Yup.string().required("No RW wajib di isi").matches(/^\d+$/, "No RW hanya boleh berisi angka"),
  provinsi: Yup.object().required("Provinsi wajib di isi"),
  kabupaten: Yup.object().required("Kabupaten wajib di isi"),
  kecamatan: Yup.object().required("Kecamatan wajib di isi"),
  kelurahan: Yup.object().required("Kelurahan wajib di isi"),
  kode_pos: Yup.string().required("Kode Pos wajib di isi").matches(/^\d{5}$/, "Kode Pos harus terdiri dari 5 digit angka"),
  susunan_direksi: Yup.array().required("Direksi wajib di isi"),
  bidang_usaha: Yup.array().required("Bidang Usaha wajib di isi"),
  email_badan_hukum: Yup.string().required("Email badan hukum wajib di isi"),
  phone_badan_hukum: Yup.string()
    .matches(phoneRegExp, "Nomor HP badan hukum tidak valid")
    .required("Phone badan hukum wajib di isi"),
  ketentuan_cek: Yup.boolean().oneOf([true], "Ketentuan wajib di isi"),
});

const perkumpulanSchema = Yup.object({
  name_badan_hukum1: generateNameBadanValidation("Nama Usaha", 1),
  name_badan_hukum2: generateNameBadanValidation("Nama Usaha", 2),
  name_badan_hukum3: generateNameBadanValidation("Nama Usaha", 3),
  partner: Yup.object().required("Partner wajib di isi"),
  file_document: generateFileDocument(),
  domisili_sekarang: Yup.string().required(
    "Domisili Sekarang usaha wajib di isi"
  ),
  jalan: Yup.string().required("Jalan wajib di isi"),
  rt: Yup.string().required("No RT wajib di isi").matches(/^\d+$/, "No RT hanya boleh berisi angka"),
  rw: Yup.string().required("No RW wajib di isi").matches(/^\d+$/, "No RW hanya boleh berisi angka"),
  provinsi: Yup.object().required("Provinsi wajib di isi"),
  kabupaten: Yup.object().required("Kabupaten wajib di isi"),
  kecamatan: Yup.object().required("Kecamatan wajib di isi"),
  kelurahan: Yup.object().required("Kelurahan wajib di isi"),
  kode_pos: Yup.string().required("Kode Pos wajib di isi").matches(/^\d{5}$/, "Kode Pos harus terdiri dari 5 digit angka"),
  susunan_direksi: Yup.array().required("Direksi wajib di isi"),
  bidang_usaha: Yup.array().required("Bidang Usaha wajib di isi"),
  email_badan_hukum: Yup.string().required("Email badan hukum wajib di isi"),
  phone_badan_hukum: Yup.string()
    .matches(phoneRegExp, "Nomor HP badan hukum tidak valid")
    .required("Phone badan hukum wajib di isi"),
  ketentuan_cek: Yup.boolean().oneOf([true], "Ketentuan wajib di isi"),
});

const lainnyaSchema = Yup.object({
  needs: Yup.string().required("Keperluan wajib di isi"),
  partner: Yup.object().required("Partner wajib di isi"),
  harga_total: Yup.number()
    .positive()
    .min(1, "Harga total harus lebih besar atau sama dengan 1")
    .typeError("Nominal pembayaran must be a number")
    .required("Nominal pembayaran wajib di isi"),
  // file_document: Yup.array().required("File/Image wajib di isi"),
  ketentuan_cek: Yup.boolean().oneOf([true], "Ketentuan wajib di isi"),
});

const othersSchema = Yup.object({
  needs: Yup.string().required("Keperluan wajib di isi"),
  harga_total: Yup.number()
    .positive()
    .min(1, "Harga total harus lebih besar atau sama dengan 1")
    .typeError("Nominal pembayaran must be a number")
    .required("Nominal pembayaran wajib di isi"),
  ketentuan_cek: Yup.boolean().oneOf([true], "Ketentuan wajib di isi"),
});

const solusiHukumSchema = Yup.object({
  needs: Yup.string().required("Keperluan wajib di isi"),
  ketentuan_cek: Yup.boolean().oneOf([true], "Ketentuan wajib di isi"),
});

export {
  loginSchema,
  verificationOtpSchema,
  registerSchema,
  ptSchema,
  cvSchema,
  yayasanSchema,
  perkumpulanSchema,
  lainnyaSchema,
  solusiHukumSchema,
  othersSchema
};
