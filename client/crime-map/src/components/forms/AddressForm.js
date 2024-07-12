import React from "react";

const AddressForm = ({ address, setAddress, handleSubmit, buttonName, error }) => {
  return (
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="text"
          name="address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          placeholder="Enter Address or Post Code"
        />
        <button type="submit">{buttonName}</button>
      </form>
  );
};

export default AddressForm;
