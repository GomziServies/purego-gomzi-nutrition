import React from "react";

function sendToWhatsApp(text, option) {
  if (!text) {
    text = `Hi, I have come across ${window.location.href}. Can you provide more information about this?`;
  }

  if (option) {
    if (option.pageRef) {
      text += `\n\nI found your contact details from ${
        window.location.origin + window.location.pathname
      }`;
    }
  }

  let url = `https://api.whatsapp.com/send?phone=+918866842520&text=${encodeURIComponent(
    text
  )}`;
  window.open(url, "_blank");
}

function WhatsAppAnchor({ message, options }) {
  const handleClick = () => {
    sendToWhatsApp(message, options);
  };

  return (
    <button
      style={{ fontSize: "16px" }}
      onClick={handleClick}
      className="btn btn-started mt-2"
    >
      <i
        className="fab fa-whatsapp mr-2"
        style={{ color: "#00d146", fontSize: "16px" }}
      ></i>
      WhatsApp
    </button>
  );
}

export default WhatsAppAnchor;
