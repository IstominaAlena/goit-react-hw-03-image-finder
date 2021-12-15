import React, { Component } from "react";
import { SpinnerDotted } from "spinners-react";
import PropTypes from "prop-types";
import { galleryAPI } from "../../shared/servises/galleryAPI";
import { toast } from "react-toastify";

import Button from "../../shared/components/Button";
import ImageGalleryItem from "../ImageGalleryItem";
import Modal from "../../shared/components/Modal";
import ContentForModal from "../ContentForModal";

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
      if (result.data.hits.length === 0) {
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
    const { gallery, totalImages, page, status, modalOpen, error } = this.state;
    const totalPages = Math.ceil(totalImages / 12);

    return (
      <>
        {status === "pending" && (
          <SpinnerDotted
            style={{
              zIndex: "999",
              color: "rgb(21, 180, 243)",
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        )}

        {status === "rejected" && (
          <div className={s["error-container"]}>
            <img
              src={
                "https://icons.iconarchive.com/icons/gakuseisean/ivista-2/128/Alarm-Error-icon.png"
              }
              alt="error"
              width="50"
              className={s["error-img"]}
            />
            <p className={s["error-text"]}>
              <span>Error: </span>
              {error}
            </p>
          </div>
        )}

        {modalOpen && (
          <Modal closeModal={this.hideModal}>
            <ContentForModal {...this.state.modalObj} />
          </Modal>
        )}
        {gallery.length > 0 && (
          <ul className={s.gallery}>
            <ImageGalleryItem imageData={gallery} onClick={this.showModal} />
          </ul>
        )}
        {gallery.length > 0 && page < totalPages && (
          <Button
            type="button"
            text="Load more"
            onClick={this.handleClick}
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
