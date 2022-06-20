import { v2 as cloudinary } from "cloudinary";

export const CloudinaryProvider = {
  provide: "CLOUDINARY",
  useFactory: () => {
    return cloudinary.config({
      cloud_name: "powder-shopit" || process.env.CLOUDINARY_NAME,
      api_key: "952935213673861" || process.env.CLOUDINARY_API_KEY,
      api_secret: "wBj13m5BIISejAEJl83VyTG7fE0" || process.env.CLOUDINARY_API_SECRET,
    });
  },
};
