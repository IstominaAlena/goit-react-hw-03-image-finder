import axios from "axios";

const instance = axios.create({
  baseURL: "https://pixabay.com/api/",
  params: {
    key: "24480883-e3616999421f7f8a627deaac2",
    image_type: "photo",
    orientation: "horizontal",
    per_page: 12,
  },
});

const fetchQuery = (query, page) => {
  return instance.get("/", {
    params: {
      q: query,
      page,
    },
  });
};

export const galleryAPI = {
  fetchQuery,
};
