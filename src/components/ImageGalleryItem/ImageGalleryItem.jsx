import PropTypes from "prop-types";
// import s from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ imageData }) => {
  const items = imageData.map((item) => (
    <li className="gallery-item" key={item.id} dataimage={item.largeImageURL}>
      <img src={item.webformatURL} alt={item.tags} width="150" />
    </li>
  ));
  return [items];
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  imageData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};
