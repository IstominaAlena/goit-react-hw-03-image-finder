import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import styles from "./Input.module.css";

const id = nanoid();

const Input = (props) => {
  const {
    labelName,
    value,
    onChange,
    type,
    name,
    pattern,
    title,
    placeholderValue,
    autoComplete,
    autoFocus,
  } = props;

  return (
    <div
      className={
        name === "filter" ? styles.filterComponent : styles.formComponent
      }
    >
      {labelName && (
        <label htmlFor={id} className={styles.formLabel}>
          {labelName}:
        </label>
      )}
      <input
        className={styles.formInput}
        id={id}
        value={value}
        onChange={onChange}
        type={type}
        name={name}
        pattern={pattern}
        title={title}
        placeholder={placeholderValue}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
      />
    </div>
  );
};
export default Input;

Input.defaultProps = {
  type: "text",
  placeholder: undefined,
  autoFocus: false,
};

Input.propTypes = {
  labelName: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  name: PropTypes.string,
  pattern: PropTypes.string,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
};
