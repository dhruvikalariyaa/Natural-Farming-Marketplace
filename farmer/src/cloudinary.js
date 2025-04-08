import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dtgh7jqxp", // Replace with your Cloudinary cloud name
  },
});

export default cld;