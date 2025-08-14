import { useState, useEffect } from 'react';
import * as petServices from './services/petService.js';

import PetList from './components/PetList/PetList.jsx';


const App = () => {
  const [pets, setPets] = useState([]);

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
      <PetList pets={pets} />
    </>
  )
};

export default App;

