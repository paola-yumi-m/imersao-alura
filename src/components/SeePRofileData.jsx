import React from "react";
import { Box, Image } from "@skynexui/components";

export function SeeProfileData(props) {
  const [isOpen, setOpenState] = React.useState("");

  return (
    <Box
      styleSheet={{
        position: "relative",
      }}
    >
      <Image
        styleSheet={{
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          display: "inline-block",
          marginRight: "8px",
          cursor: "pointer",
        }}
        src={`https://github.com/${props.message.from}.png`}
        onMouseOver={() => setOpenState(!isOpen)}
        onMouseOut={() => setOpenState(!isOpen)}
      />
      {isOpen && (
        <Box
          styleSheet={{
            display: "auto",
            flexDirection: "row",
            borderRadius: "5px",
            position: "absolute",
            backgroundColor: "transparent",
            width: {
              xs: "100px",
              sm: "145px",
            },
            height: "125px",
            left: "10px",
            bottom: "25px",
            padding: "16px",
          }}
        >
          <Image
            styleSheet={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              display: "inline-block",
              marginRight: "8px",
            }}
            src={`https://github.com/${props.message.from}.png`}
          />
        </Box>
      )}
    </Box>
  );
}
