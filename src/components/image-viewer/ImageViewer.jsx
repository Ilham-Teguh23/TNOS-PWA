import { useState, useEffect } from "react";

const ImageViewer = ({ fileUrl }) => {
    const [imageSrc, setImageSrc] = useState("");

    useEffect(() => {
        if (!fileUrl) return;

        fetch(fileUrl, { mode: "cors" }) // Mode CORS biar bisa bypass
            .then((response) => response.blob()) // Ubah response jadi blob
            .then((blob) => {
                const imgUrl = URL.createObjectURL(blob); // Bikin URL lokal dari blob
                setImageSrc(imgUrl);
            })
            .catch((error) => console.error("Error fetching image:", error));
    }, [fileUrl]);

    return (
        <div>
            {imageSrc ? (
                <img src={imageSrc} alt="Dokumen" style={{ width: "100%" }} />
            ) : (
                <p>Gambar tidak bisa dimuat</p>
            )}
        </div>
    );
};

export default ImageViewer;
