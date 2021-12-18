import { SpinnerDotted } from "spinners-react";

const Spinner = () => {
  return (
    <SpinnerDotted
      style={{
        color: "rgb(21, 180, 243)",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export default Spinner;
