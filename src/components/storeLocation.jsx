import React from "react";
const StoreLocation = () => {
  return (
    <>
      <section className="prdouct-video-main bg-white pt-5">
        <div className="container-fluid mb-4 w-80">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.7793497738116!2d72.76631687503644!3d21.2009225804918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04d50ff8d5aeb%3A0x98c1a4ffed8f3505!2sGomzi%20Nutrition%20Store%20%7C%20Best%20Supplement%20Store%20in%20Surat!5e0!3m2!1sen!2sin!4v1728471094806!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: "0", borderRadius: "10px" }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="store location"
          ></iframe>
        </div>
      </section>
    </>
  );
};

export default StoreLocation;
