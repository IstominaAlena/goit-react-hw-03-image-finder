import React, { Component } from "react";
import PropTypes from "prop-types";
import { galleryAPI } from "../../shared/servises/galleryAPI";
import { toast } from "react-toastify";

import Button from "../../shared/components/Button";
import ImageGalleryItem from "../ImageGalleryItem";
import Modal from "../../shared/components/Modal";
import ContentForModal from "../ContentForModal";
import Error from "../Error";
import Spinner from "../../shared/components/Spinner";

import s from "./ImageGalleryList.module.css";

class ImageGalleryList extends Component {
  state = {
    gallery: [],
    page: 1,
    totalImages: 0,
    status: "idle",
    modalOpen: false,
    modalObj: {},
    error: "",
  };

  componentDidUpdate(prevProps, _) {
    const prevQuery = prevProps.propsQuery;
    const nextQuery = this.props.propsQuery;
    if (!nextQuery) {
      return;
    }

    if (this.state.status === "pending") {
      this.searchImages();
    }

    if (prevQuery !== nextQuery) {
      this.setState({
        gallery: [],
        page: 1,
        status: "pending",
      });
    }
  }

  async searchImages() {
    try {
      const query = this.props.propsQuery;
      const { page } = this.state;

      const result = await galleryAPI.fetchQuery(query, page);
      if (!result.data.hits.length) {
        toast.error("Sorry we can't find anything(");
      }
      this.setState((prevState) => ({
        gallery: [...prevState.gallery, ...result.data.hits],
        totalImages: result.data.totalHits,
        status: "resolved",
      }));
    } catch (error) {
      this.setState({
        status: "rejected",
        error: error.message,
      });
    }
  }

  handleClick = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
      status: "pending",
    }));
  };

  showModal = (id) => {
    this.setState((prevState) => {
      const { gallery } = prevState;
      const modalObj = gallery.find((item) => item.id === id);
      return {
        modalObj,
        modalOpen: true,
      };
    });
  };

  hideModal = () => {
    this.setState({
      modalOpen: false,
    });
  };

  render() {
    const { gallery, totalImages, page, status, modalOpen, error, modalObj } =
      this.state;
    const { hideModal, showModal, handleClick } = this;
    const totalPages = Math.ceil(totalImages / 12);

    return (
      <>
        {status === "pending" && <Spinner />}

        {status === "rejected" && <Error error={error} />}

        {modalOpen && (
          <Modal closeModal={hideModal}>
            <ContentForModal {...modalObj} />
          </Modal>
        )}
        {gallery.length > 0 && (
          <ul className={s.gallery}>
            <ImageGalleryItem imageData={gallery} onClick={showModal} />
          </ul>
        )}
        {gallery.length > 0 && page < totalPages && (
          <Button
            type="button"
            text="Load more"
            onClick={handleClick}
            className={"load-more"}
          />
        )}
        {page === totalPages && (
          <p className={s.text}>
            We're sorry, but you've reached the end of search results.
          </p>
        )}
      </>
    );
  }
}

export default ImageGalleryList;

ImageGalleryList.propTypes = {
  propsQuery: PropTypes.string,
};
