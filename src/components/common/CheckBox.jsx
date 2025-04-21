import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";

export default function ExampleCheckbox() {
  const [checked, setChecked] = useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
    console.log("สถานะของ checkbox:", event.target.checked); // true/false
  };
  return (
    <Checkbox
      sx={{
        color: "white", // ขอบตอนยังไม่ติ๊ก
        "&.Mui-checked": {
          color: "white", // ขอบตอนติ๊ก
        },
        "&.MuiCheckbox-root:hover": {
          backgroundColor: "transparent", // ปิดสี hover
        },
        "&.Mui-checked:hover": {
          backgroundColor: "transparent", // ปิดสี hover ตอน checked
        },
        borderRadius: "20%",
        mb: "4",
      }}
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled checkbox" }}
      style={{ padding: "0px", margin: "0px" }}
    />
  );
}
