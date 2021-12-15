import React, { Component } from "react";
// import PropTypes from "prop-types";
import { galleryAPI } from "../../shared/servises/galleryAPI";

import Button from "../../shared/components/Button";
import ImageGalleryItem from "../ImageGalleryItem";
import s from "./ImageGalleryList.module.css";

class ImageGalleryList extends Component {
  state = {
    gallery: [],
    page: 1,
    totalImages: 0,
    status: "idle",
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.fetchData;
    const nextQuery = this.props.fetchData;
    const prevPage = prevState.page;
    const page = this.state.page;
    // console.log("prev page", prevPage);

    if (prevQuery !== nextQuery) {
      this.setState({
        gallery: [],
        page: 1,
        status: "pending",
      });
      this.searchImages(nextQuery, this.state.page);
      return;
    }
    if (prevQuery === nextQuery && prevPage !== page) {
      this.setState({
        status: "pending",
      });
      this.searchImages(prevQuery, page);
      return;
    }

    // console.log("prev Query", prevQuery);
    // console.log("next Query", nextQuery);
    // console.log("next page", page);
    // console.log("gallery", this.state.gallery);
  }

  async searchImages(query, page) {
    try {
      const result = await galleryAPI.fetchQuery(query, page);
      if (result.data.hits.length === 0) {
        console.log("Sorry we can't find anything(");
      }
      this.setState((prevState) => ({
        gallery: [...prevState.gallery, ...result.data.hits],
        totalImages: result.data.totalHits,
        status: "resolved",
      }));
    } catch (error) {
      this.setState({
        status: "rejected",
      });
      console.log(error);
    }
  }

  handleClick = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
      status: "pending",
    }));
  };

  render() {
    const { gallery, totalImages, page, status } = this.state;
    const totalPages = Math.ceil(totalImages / 12);

    return (
      <>
        {status === "idle" && <p>"idle"</p>}
        {status === "pending" && <p>'pending'</p>}
        {status === "resolved" && <p>'resolved'</p>}
        {status === "rejected" && <p>'rejected'</p>}

        {gallery.length > 0 && (
          <ul className={s.gallery}>
            <ImageGalleryItem imageData={gallery} />
          </ul>
        )}

        {gallery.length > 0 && page < totalPages && (
          <Button type="button" text="Load more" onClick={this.handleClick} />
        )}
        {page === totalPages && <p>The end of the Internet</p>}
      </>
    );
  }
}

export default ImageGalleryList;
