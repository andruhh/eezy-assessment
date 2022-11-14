import { useEffect, useState } from "react";
import { dogClient } from "./clients/DogClient";

import { Button, SelectChangeEvent } from "@mui/material";
import DogListItem from "./components/dogPoster/DogListItem";
import DogPosterModal from "./components/dogPoster/DogPosterModal";
import SharedTable from "./components/shared/SharedTable";

import { DogModel } from "./models/DogModel";

import "./App.css";

function App() {
  const [dogs, setDogs] = useState<Array<DogModel>>([]);
  const [breeds, setBreeds] = useState<Array<string>>([]);
  const [dogImages, setDogImages] = useState<Array<string>>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalImageCount, setTotalImageCount] = useState(0);

  useEffect(() => {
    dogClient.getAllBreeds().then((breeds) => setBreeds(breeds));
  }, []);

  useEffect(() => {
    handleTotalImageCount();
  }, [dogs]);

  const handleChange = async (
    field: string,
    e: SelectChangeEvent<string>,
    id: number
  ) => {
    const updatedDogs = await Promise.all(
      dogs.map(async (dog) => {
        if (dog.id === id) {
          dog = { ...dog, [field]: e.target.value };
          dog.imageCount = await dogClient.getImageCount(
            dog.breed,
            dog.subBreed
          );
          return dog;
        }
        return dog;
      })
    );
    setDogs(updatedDogs);
  };

  const handleTotalImageCount = () => {
    let total = 0;
    dogs.forEach((dog: DogModel) => (total += dog.imageCount));
    setTotalImageCount(total);
  };

  const generatePoster = async () => {
    const images = await dogClient.getImages(dogs);
    setDogImages(images);
    setModalOpen(true);
  };

  const handleModalClose = () => setModalOpen(false);

  const addDog = () => {
    const prevDogs: DogModel[] = [...dogs];

    const newDog = new DogModel();
    newDog.id = prevDogs.length + 1;

    prevDogs.push(newDog);
    setDogs(prevDogs);
  };

  const handleRemove = (dog: DogModel) => {
    const updatedDogs: DogModel[] = [...dogs];
    const index = dogs.indexOf(dog);

    if (index === -1) return;

    updatedDogs.splice(index, 1);
    setDogs(updatedDogs);
  };

  const DogTable = SharedTable(DogListItem, {
    data: dogs,
    columns: ["ID", "Breed", "Sub Breed", "# of Images", "Actions"],
    rowProps: {
      breeds: breeds,
      handleChange: handleChange,
      handleRemove: handleRemove,
    },
  });

  return (
    <div className="App">
      <Button
        variant="contained"
        size="large"
        disabled={totalImageCount === 0}
        onClick={generatePoster}
        data-testid="generate-poster"
      >
        Generate Dog Poster ({totalImageCount} images)
      </Button>
      {/* @ts-ignore */}
      <DogTable data-testid="dog-table" />
      <Button
        variant="outlined"
        size="medium"
        onClick={addDog}
        className="add-dog-btn"
        data-testid="add-dog-btn"
      >
        Add Dog
      </Button>
      <DogPosterModal
        open={modalOpen}
        onClose={handleModalClose}
        dogImages={dogImages}
      ></DogPosterModal>
    </div>
  );
}

export default App;
