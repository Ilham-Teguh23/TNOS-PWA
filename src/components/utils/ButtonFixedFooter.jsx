import React from "react";

function ButtonFixedFooter({ loading, button, cssCustom, type }) {
  return (
    <>
      <div className="jdawdi-dawda">
        {loading ? (
          <button type="button" className={cssCustom}>
            Loading...
          </button>
        ) : (
          <button type={type} className={cssCustom}>
            {button}
          </button>
        )}
      </div>
    </>
  );
}

export default ButtonFixedFooter;
