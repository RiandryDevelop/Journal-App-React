import "setimmediate";
import cloudinary from "cloudinary";
import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({
  cloud_name: "storedb",
  api_key: "174583793112558",
  api_secret: "cP2Gd3iOXpTxuQzhmjQ9eQQGAc4",
});

describe("Tests on fileUpload", () => {
  test("Should load a file and return the URL", async () => {
    const resp = await fetch(
      "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"
    );
    const blob = await resp.blob();

    const file = new File([blob], "foto.png");
    const url = await fileUpload(file);

    expect(typeof url).toBe("string");

    // Delete Img by ID
    const segments = url.split("/");
    const imageId = segments[segments.length - 1].replace(".jpg", "");
    cloudinary.v2.api.delete_resources(imageId, {}, () => {});
  });

  test("Should return a error", async () => {
    const file = new File([], "foto.png");
    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
