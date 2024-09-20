import React from "react";
import "../../assets/css/modal.css";
import { useDispatch } from "react-redux";
import { logoutController } from "../../redux/controller/AuthController";

function ModalComponent({
  children,
  isModalVisible,
  setModalVisible,
  onClick,
  type,
}) {
  const dispatch = useDispatch();
  //   const [isModalVisible, setModalVisible] = useState(false);
  const toogleMode = () => {
    if (onClick) {
      dispatch(logoutController());
    }
    setModalVisible(!isModalVisible);
  };

  const renderContent = () => {
    switch (type) {
      case "top":
        return (
          <div>
            {isModalVisible && (
              <div className="modal-overlay">
                <div className="modal-content top">{children}</div>
              </div>
            )}
          </div>
        );
      case "kententuan":
        return (
          <div>
            {isModalVisible && (
              <div className="modal-overlay">
                <div className="modal-content top">
                  <div className="body-modal-fjwdj">{children}</div>
                  <div className="btn-modal-list">
                    <button className="btn-modal-accept" onClick={toogleMode}>
                      KELUAR
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case "pembatalan":
        return (
          <div>
            {isModalVisible && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <div className="body-modal-fjwdj" style={{ height: "500px" }}>
                    {children}
                  </div>
                  <div className="btn-modal-list">
                    <button className="btn-modal-accept" onClick={toogleMode}>
                      KELUAR
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case "bottom":
        return (
          <div>
            {isModalVisible && (
              <div className="modal-overlay">
                <div className="modal-content top">
                  {children}
                  <div className="btn-modal-list">
                    <button
                      className="btn-modal-cancel"
                      onClick={() => setModalVisible(!isModalVisible)}
                    >
                      BATAL
                    </button>
                    <button className="btn-modal-accept" onClick={toogleMode}>
                      PILIH
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case "language":
        return (
          <div>
            {isModalVisible && (
              <div className="modal-overlay">
                <div className="modal-content top">{children}</div>
              </div>
            )}
          </div>
        );

      default:
        return (
          <div>
            {isModalVisible && (
              <div className="modal-overlay">
                <div className="modal-content">
                  {children}
                  <div className="btn-modal-list">
                    <button
                      className="btn-modal-cancel"
                      onClick={() => setModalVisible(!isModalVisible)}
                    >
                      BATAL
                    </button>
                    <button className="btn-modal-accept" onClick={toogleMode}>
                      KELUAR
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  return renderContent();
}

export default ModalComponent;
