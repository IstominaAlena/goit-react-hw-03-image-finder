import React, { Component } from "react";

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
          <ImageGalleryList fetchData={this.state.query} />
        </Section>
      </>
    );
  }
}

export default App;
