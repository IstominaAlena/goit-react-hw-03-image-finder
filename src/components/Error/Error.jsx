import PropTypes from "prop-types";
import s from "./Error.module.css";

const Error = ({ error }) => {
  return (
    <div className={s["error-container"]}>
      <img
        src={
          "https://icons.iconarchive.com/icons/gakuseisean/ivista-2/128/Alarm-Error-icon.png"
        }
        alt="error"
        width="50"
        className={s["error-img"]}
      />
      <p className={s["error-text"]}>
        <span>Error: </span>
        {error}
      </p>
    </div>
  );
};
export default Error;

Error.propTypes = {
  error: PropTypes.string,
};
