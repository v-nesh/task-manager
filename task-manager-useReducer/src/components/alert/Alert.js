import React, { useEffect } from "react";
import { FaExclamationCircle, FaTimes } from "react-icons/fa";
import "./Alert.css";

const Alert = ({ alertContent, alertClass, onCloseAlert }) => {
  useEffect(() => {
    const int = setTimeout(() => {
      onCloseAlert();
    }, 3000);

    return () => {
      clearTimeout(int);
    };  
  }, [onCloseAlert]);

  return (
    <div className={`alert ${alertClass}`}>
      <FaExclamationCircle size={16} className="icon-x" />
      <span className="msg">{alertContent}</span>
      <div className="close-btn" onClick={onCloseAlert}>
        <FaTimes size={19} className="icon-x" />
      </div>
    </div>
  );
};

export default Alert;
