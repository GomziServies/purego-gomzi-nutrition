function nutritionSendWhatsappMsg(text, option) {
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

  let url = `https://api.whatsapp.com/send?phone=+916354051487&text=${encodeURIComponent(
    text
  )}`;
  window.open(url, "_blank");
}

export default nutritionSendWhatsappMsg;
