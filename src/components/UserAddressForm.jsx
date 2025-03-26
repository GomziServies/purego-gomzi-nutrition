import React from "react";

const UserAddressForm = ({ userData, handleFormSubmit }) => {
  return (
    <form onSubmit={handleFormSubmit}>
      <div className="card-body px-4 px-xl-5">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-md-6 mb-3">
                <div>
                  <div className="input-with-label d-flex align-items-center">
                    <input
                      type="text"
                      placeholder="Enter First Name"
                      name="first_name"
                      className="form-control br-10 f-14 f-pop-sembol text-black common-input"
                      required
                      defaultValue={userData.first_name}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div>
                  <div className="input-with-label d-flex align-items-center">
                    <input
                      type="text"
                      placeholder="Enter Last Name"
                      name="last_name"
                      className="form-control br-10 f-14 f-pop-sembol text-black common-input"
                      required
                      defaultValue={userData.last_name}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-3">
                <div>
                  <div className="input-with-label d-flex align-items-center">
                    <input
                      type="email"
                      placeholder="Enter Email"
                      name="email"
                      className="form-control br-10 f-14 f-pop-sembol text-black common-input"
                      required
                      defaultValue={userData.email}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 mb-3">
                <div>
                  <div className="input-with-label d-flex align-items-center">
                    <input
                      type="text"
                      placeholder="House No/Building Name/Office Name"
                      name="officeName"
                      className="form-control br-10 f-14 f-pop-sembol text-black common-input"
                      required
                      defaultValue={userData.address_line_1}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 mb-3">
                <div>
                  <div className="input-with-label d-flex align-items-center">
                    <input
                      type="text"
                      placeholder="Road Name/Area/Colony"
                      name="roadName"
                      className="form-control br-10 f-14 f-pop-sembol text-black common-input"
                      required
                      defaultValue={userData.address_line_2}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 mb-3">
                <div>
                  <div className="input-with-label d-flex align-items-center">
                    <input
                      type="text"
                      placeholder="City"
                      name="city"
                      className="form-control br-10 f-14 f-pop-sembol text-black common-input"
                      required
                      defaultValue={userData.city}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 mb-3">
                <div>
                  <div className="input-with-label d-flex align-items-center">
                    <input
                      id="state"
                      type="text"
                      placeholder="Enter State Name"
                      name="state"
                      className="form-control br-10 f-14 f-pop-sembol text-black common-input"
                      required
                      defaultValue={userData.state}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 mb-3">
                <div>
                  <div className="input-with-label d-flex align-items-center">
                    <input
                      id="country"
                      type="text"
                      placeholder="Enter Country"
                      name="country"
                      className="form-control br-10 f-14 f-pop-sembol text-black common-input"
                      required
                      defaultValue={userData.country}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 mb-3">
                <div>
                  <div className="input-with-label d-flex align-items-center">
                    <input
                      id="postalCode"
                      type="text"
                      placeholder="Postal Code"
                      name="postalCode"
                      className="form-control br-10 f-14 f-pop-sembol text-black common-input"
                      required
                      maxLength="6"
                      defaultValue={userData.pin_code}
                    />
                  </div>
                </div>
              </div>
              {/* <div className="col-12">
                <div className="common-button">
                  <button
                    type="submit"
                    className="bg-yellow my-2 py-2 text-uppercase text-white f-16 f-rob-bol checkout-add-edit-address"
                  >
                    SAVE &amp; CONTINUE
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UserAddressForm;
