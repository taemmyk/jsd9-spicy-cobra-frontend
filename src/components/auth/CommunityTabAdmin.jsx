import React from "react";
import FormTextField from "../common/FormTextField";

function CommunityTabAdmin() {
  return (
    <>
      <FormTextField
        id="username"
        name="username"
        label="username"
        type="text"
        placeholder="invite@mail.com"
      />
    </>
  );
}

export default CommunityTabAdmin;
