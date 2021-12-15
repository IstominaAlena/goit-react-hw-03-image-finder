import PropTypes from "prop-types";

import s from "./ContentForModal.module.css";

const ContetnForModal = ({ largeImageURL, tags }) => {
  return (
    <>
      <img src={largeImageURL} alt={tags} className={s["modal-img"]} />
    </>
  );
};

export default ContetnForModal;

ContetnForModal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
