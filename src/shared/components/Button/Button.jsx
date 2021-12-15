import PropTypes from "prop-types";
import styles from "./Button.module.css";

const Button = ({ type, text, onClick }) => {
  return (
    <button
      onClick={onClick ? onClick : undefined}
      type={type}
      className={type === "submit" ? styles.submitBtn : styles.btn}
    >
      {text}
    </button>
  );
};
export default Button;

Button.defaultProps = {
  type: "button",
  onClick: undefined,
};

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  onClick: PropTypes.func,
};
