import React, { Component } from "react";
import PropTypes from "prop-types";

import Input from "../../shared/components/Input";
import Button from "../../shared/components/Button";

// import s from './Searchbar.module.css';

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
      console.log("Please, enter your request");
    }
    this.props.onSubmit(this.state.query);
    this.onInputClear();
  };

  onInputClear = () => {
    this.setState({ query: "" });
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.onFormSubmit}>
          <Input
            value={this.state.query}
            onChange={this.onInputChange}
            type="text"
            placeholder="Search images and photos"
            autoFocus={true}
            autoComplete="off"
          />

          <Button
            type="submit"
            text={<span className="button-label">Search</span>}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
