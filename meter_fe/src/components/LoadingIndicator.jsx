import React from 'react';
import { BounceLoader } from "react-spinners";

const LoadingIndicator = ({ loading = true, color = "#ffffff", size = 20 }) => {
  const config = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <div>
      <BounceLoader
        color={color}
        loading={loading}
        cssOverride={config}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default LoadingIndicator;