import React from "react";

function ContentTitleValue({ title, value, type }) {
  const renderContent = () => {
    switch (type) {
      case "order":
        return (
          <div className="info-s">
            <div className="title">{title}</div>
            <div className="value order fw-bold">{value}</div>
          </div>
        );
      case "menunggu":
        return (
          <div className="info-s">
            <div className="title">{title}</div>
            <div className="value order fw-bold bg-yellow" style={{backgroundColor: 'yellow'}}>{value}</div>
          </div>
        );
      case "cart":
        return (
          <div className="info-s">
            <div className="title">{title}</div>
            <div className="value cart fw-bold">{value}</div>
          </div>
        );
      case "waiting":
        return (
          <div className="info-s">
            <div className="title">{title}</div>
            <div className="value waiting fw-bold">{value}</div>
          </div>
        );
      case "cancel":
        return (
          <div className="info-s">
            <div className="title">{title}</div>
            <div className="value cancel fw-bold">{value}</div>
          </div>
        );
      case "success":
        return (
          <div className="info-s">
            <div className="title">{title}</div>
            <div className="value success fw-bold">{value}</div>
          </div>
        );
      case "title":
        return (
          <div className="info-s">
            <div className="title skc">{title}</div>
            <div className="value skc fw-bold">{value}</div>
          </div>
        );
      default:
        return (
          <div className="info-s">
            <div className="title">{title}</div>
            <div className="value fw-bold">{value}</div>
          </div>
        );
    }
  };
  return renderContent();
}

export default ContentTitleValue;
