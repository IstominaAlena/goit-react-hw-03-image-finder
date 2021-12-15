import React, { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import Button from "../Button";

import s from "./Modal.module.css";

const modalRoot = document.getElementById("modal-root");

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.close);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.close);
  }

  close = (e) => {
    if (e.code === "Escape") {
      return this.props.closeModal();
    }
    if (e.currentTarget === e.target) {
      this.props.closeModal();
    }
  };

  render() {
    const { children } = this.props;

    return createPortal(
      <div className={s.overlay} onClick={this.close}>
        <div className={s.modal}>
          <Button
            type="button"
            text="&#128473;"
            onClick={this.close}
            className="modal-close"
          />
          {children}
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
  children: PropTypes.node,
  closeModal: PropTypes.func.isRequired,
};
