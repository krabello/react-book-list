import React from "react";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export default function Loader(props) {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ClipLoader
        css={override}
        size={135}
        color={props.color}
        loading={props.loading}
      />
    </div>
  );
}
