import { useState, useEffect } from 'react';
import * as petServices from './services/petService.js';

import PetList from './components/PetList/PetList.jsx';
import PetDetail from './components/PetDetail/PetDetail.jsx';
import PetForm from './components/PetForm/PetForm.jsx';


const App = () => {
  const [pets, setPets] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSelect = (pet) => {
    setSelected(pet);
  };

  const handleFormView = (pet) => {
    if (!pet._id) setSelected(null);
    setIsFormOpen(!isFormOpen);
  };

  const handleAddPet = async (formData) => {
    console.log(formData)
    try {
      const newPet = await petServices.create(formData);

      if (newPet.err) {
        throw new Error(newPet.err);
      }
      
      setPets([newPet, ...pets]);
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdatePet = async (formData, petId) => {
    try {
      const updatedPet = await petServices.update(formData, petId);

      // handle potential errors
      if (updatedPet.err) {
        throw new Error(updatedPet.err);
      }

      const updatedPetList = pets.map((pet) => (
        // If the _id of the current pet is not the same as the updated pet's _id,
        // return the existing pet.
        // If the _id's match, instead return the updated pet.
        pet._id !== updatedPet._id ? pet : updatedPet
      ));
      // Set pets state to this updated array
      setPets(updatedPetList);
      // If we don't set selected to the updated pet object, the details page will
      // reference outdated data until the page reloads.
      setSelected(updatedPet);
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePet = async (petId) => {
    try {
      const deletedPet = await petServices.deletePet(petId);

      if (deletedPet.err) {
        throw new Error(deletedPet.err);
      }

      setPets(pets.filter((pet) => pet._id !== deletedPet._id));
      setSelected(null);
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    const fetchPets = async () => {
      try {
        const fetchedPets = await petServices.index();

        if (fetchedPets.err) {
          throw new Error(fetchedPets.err);
        }

        setPets(fetchedPets);
      } catch (err) {
        console.log(err);
      }
    }
    fetchPets();
  }, []);


  return (
    <>
      <PetList 
        pets={pets} 
        handleSelect={handleSelect}
        handleFormView={handleFormView}
        isFormOpen={isFormOpen}
      />
      { isFormOpen ? (
        <PetForm 
          handleAddPet={handleAddPet} 
          selected={selected}
          handleUpdatePet={handleUpdatePet}
        />
      ) : (
        <PetDetail 
          selected={selected} 
          handleFormView={handleFormView} 
          handleDeletePet={handleDeletePet}
        />
      )}
    </>
  )
};

export default App;

