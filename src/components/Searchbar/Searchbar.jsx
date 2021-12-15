import React, { Component } from "react";
import PropTypes from "prop-types";
import { IconContext } from "react-icons";
import { AiOutlineCompass } from "react-icons/ai";
import { toast } from "react-toastify";

import Input from "../../shared/components/Input";
import Button from "../../shared/components/Button";

import s from "./Searchbar.module.css";

class Searchbar extends Component {
  state = {
    query: "",
  };

  onInputChange = (e) => {
    this.setState({
      query: e.target.value,
    });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    if (this.state.query.trim() === "") {
      toast.warn("Please, enter your request");
    }
    this.props.onSubmit(this.state.query);
    this.onInputClear();
  };

  onInputClear = () => {
    this.setState({ query: "" });
  };

  render() {
    return (
      <form className={s.form} onSubmit={this.onFormSubmit}>
        <Input
          value={this.state.query}
          onChange={this.onInputChange}
          type="text"
          placeholderValue="Search images and photos"
          autoFocus={true}
          autoComplete="off"
        />

        <Button
          type="submit"
          text={
            <IconContext.Provider
              value={{
                color: "rgb(21, 180, 243)",
                className: "search-icon",
                size: "20px",
              }}
            >
              <span className={s["button-label"]}>
                <AiOutlineCompass />
              </span>
            </IconContext.Provider>
          }
          className="search"
        />
      </form>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
