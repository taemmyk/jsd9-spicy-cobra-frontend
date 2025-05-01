import React from 'react'
import { Typography } from "@mui/material";

function Heading({section}) {
  return (
    <>
    <Typography
        variant="h2"
        sx={{
          fontSize: { xs: 24, md: 32 },
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        {section}
      </Typography>
    </>
  )
}

export default Heading