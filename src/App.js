import React, { useEffect, useState } from "react";
import { firestore } from "./API/firebase";
import Imags from "./Images";
import NavbarComponent from "./Navbar";
import Searchbar from "./SearchBar";


function App() {
  const [images, setImages] = useState([]);
  const [allImages, setAllImages] = useState([]);
 
  useEffect(() => {
    firestore
      .collection("images")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          setImages(prevImages => [...prevImages, {data: doc.data(),id:doc.id}]);
          setAllImages(prevAllImages => [...prevAllImages, {data: doc.data(),id:doc.id}]);
        })
      })  
  }, []);
  return (
    <div className="App">
     
      <NavbarComponent  setImages={setImages} setAllImages={setAllImages} images={allImages} />
      
     <Searchbar setImages={setImages} allImages={allImages}/>
   <Imags images={images}  setImages={setImages}   allImages={allImages}
        setAllImages={setAllImages} />
    </div>
  );
}

export default App;
