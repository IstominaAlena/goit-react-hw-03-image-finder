import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Section from "./shared/components/Section";
import Searchbar from "./components/Searchbar";
import ImageGalleryList from "./components/ImageGalleryList";

import "./styles/App.css";

class App extends Component {
  state = {
    query: "",
  };

  formSubmitHandler = (data) => {
    this.setState({ query: data });
  };

  render() {
    return (
      <>
        <Section>
          <Searchbar onSubmit={this.formSubmitHandler} />
        </Section>

        <Section>
          <ImageGalleryList propsQuery={this.state.query} />
        </Section>
        <ToastContainer autoClose={3000} position="top-center" />
      </>
    );
  }
}

export default App;
