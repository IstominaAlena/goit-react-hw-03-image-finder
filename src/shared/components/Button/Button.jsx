import PropTypes from "prop-types";
import s from "./Button.module.css";

const Button = ({ type, text, onClick, className }) => {
  return (
    <button
      onClick={onClick ? onClick : undefined}
      type={type}
      className={s[className]}
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
  className: PropTypes.string,
};
