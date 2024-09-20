import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";

function InputCreatetableSelectComponent({ onChange, onBlur, value, id }) {
  const [selected, setSelected] = useState([]);
  let colour = [
    {
      value: "Perdagangan Umum",
      label: "Perdagangan Umum",
    },
    {
      value: "Kehutanan",
      label: "Kehutanan",
    },
    {
      value: "Perikanan",
      label: "Perikanan",
    },
    {
      value: "Penggalian",
      label: "Penggalian",
    },
    {
      value: "Pertambangan",
      label: "Pertambangan",
    },
    {
      value: "Industri Pengolahan",
      label: "Industri Pengolahan",
    },
    {
      value: "Pengadaan Listrik",
      label: "Pengadaan Listrik",
    },
    {
      value: "Pengadaan Gas",
      label: "Pengadaan Gas",
    },
    {
      value: "Pengadaan Uap/Air Panas Dan Udara Dingin",
      label: "Pengadaan Uap/Air Panas Dan Udara Dingin",
    },
    {
      value: "Treatment Air",
      label: "Treatment Air",
    },
    {
      value: "Treatment Air Limbah",
      label: "Treatment Air Limbah",
    },
    {
      value: "Treatment dan Pemulihan Material Sampah",
      label: "Treatment dan Pemulihan Material Sampah",
    },
    {
      value: "Aktivitas Remediasi",
      label: "Aktivitas Remediasi",
    },
    {
      value: "Konstruksi",
      label: "Konstruksi",
    },
    {
      value: "Perdagangan Besar Dan Eceran",
      label: "Perdagangan Besar Dan Eceran",
    },
    {
      value: "Reparasi Dan Perawatan Mobil Dan Sepeda Motor",
      label: "Reparasi Dan Perawatan Mobil Dan Sepeda Motor",
    },
    {
      value: "Pengangkutan",
      label: "Pengangkutan",
    },
    {
      value: "Pergudangan",
      label: "Pergudangan",
    },
    {
      value: "Penyediaan Akomodasi",
      label: "Penyediaan Akomodasi",
    },
    {
      value: "Penyediaan Makan Minum",
      label: "Penyediaan Makan Minum",
    },
    {
      value: "Informasi Dan Komunikasi",
      label: "Informasi Dan Komunikasi",
    },
    {
      value: "Aktivitas Keuangan dan Asuransi",
      label: "Aktivitas Keuangan dan Asuransi",
    },
    {
      value: "Real Estat",
      label: "Real Estat",
    },
    {
      value: "Aktivitas Profesional",
      label: "Aktivitas Profesional",
    },
    {
      value: "Aktivitas Penyewaan dan Sewa Guna Usaha Tanpa Hak Opsi",
      label: "Aktivitas Penyewaan dan Sewa Guna Usaha Tanpa Hak Opsi",
    },
    {
      value: "Ketenagakerjaan",
      label: "Ketenagakerjaan",
    },
    {
      value: "Agen Perjalanan dan Penunjang Usaha Lainnya",
      label: "Agen Perjalanan dan Penunjang Usaha Lainnya",
    },
  ];

  const handleChange = (cek) => {
    setSelected(cek);
    onChange(id, cek);
  };

  //   console.log({ selected });

  // handle blur
  const handleBlur = () => {
    onBlur(id, true);
  };

  return (
    <CreatableSelect
      isMulti
      isValidNewOption={() => (selected.length > 5 ? false : true)}
      options={selected.length > 5 ? [] : colour}
      onChange={handleChange}
      value={value?.label}
      id={id}
      onBlur={handleBlur}
      menuPortalTarget={document.body}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          // borderColor: state.isFocused ? "grey" : "red",
          padding: "0.18rem",
          fontSize: "0.9rem",
        }),
        menuPortal: (base) => ({ ...base, zIndex: 1001 }),
      }}
    />
  );
}

export default InputCreatetableSelectComponent;
