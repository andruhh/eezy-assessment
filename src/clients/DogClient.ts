import axios from "axios";
import { DogModel } from "../models/DogModel";

class DogClient {
  public getAllBreeds = () => {
    return axios
      .get("https://dog.ceo/api/breeds/list/all")
      .then((response) => response.data.message);
  };

  public getImageCount = async (breed: string, subBreed: string) => {
    if (breed === "" && subBreed === "") {
      return;
    }

    const url: string =
      subBreed !== ""
        ? `https://dog.ceo/api/breed/${breed}/${subBreed}/images`
        : `https://dog.ceo/api/breed/${breed}/images`;

    const response = await axios.get(url);
    return response.data.message.length;
  };

  public getImages = async (dogs: DogModel[]) => {
    let images: string[] = [];
    for (var dog of dogs) {
      const url = dog.subBreed
        ? `https://dog.ceo/api/breed/${dog.breed}/${dog.subBreed}/images`
        : `https://dog.ceo/api/breed/${dog.breed}/images`;

      const response = await axios.get(url);
      images = [...images, ...response.data.message];
    }
    return images;
  };
}

export const dogClient = new DogClient();
