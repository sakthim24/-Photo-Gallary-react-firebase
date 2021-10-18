import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import swal from 'sweetalert';
import {
  Button,
  Form,
  Modal,
  Navbar,
  NavbarBrand,
  NavLink,
  ProgressBar,
} from "react-bootstrap";
import "./index.css"
import { firestore, storage } from "./API/firebase";

const NavbarComponent = ({ setImages, images, setAllImages}) => {
  const [showModal, setShowModal] = useState(false);
  const [img, setImg] = useState("");
  const [progress, setProgress] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
   
    if (!img) return swal("Error", "Please Insert an Image!", "error");
    
    const filterImages = images.filter(image => image.data.name === img.name);
    if (filterImages.length > 0){
      setImg("");
    
    return swal("Error", `The image ${img.name} is already present`, "error");
    
    }
    
    const uploadRef = storage.ref(`images/${img.name}`);
    uploadRef.put(img).on(
      "state_change",
      (snapshot) => {  const newProgress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(newProgress);
        
      },
    
      (error) => {
        return swal("Error",error.message, "error");
      },
      async () => {
        const url = await uploadRef.getDownloadURL();

        firestore .collection("images").add({
          name:img.name,
          url:url,
        }).then(async (doc) => {
          const newDoc = await doc.get();   
          setImages(prevImages=> [...prevImages,{data:newDoc.data(), id: newDoc.id} ])
          setAllImages(prevImages=> [...prevImages,{data:newDoc.data(), id: newDoc.id} ])
            swal("Good job!", "Image added successfully!", "success");
          setProgress(0);
         setImg("");
         setShowModal(false);
        }).catch(err=>{
          console.log(err)
         
        });
      })
    };
  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>
          {progress ? "Uploading..." : "Upload Image"}
          </Modal.Title>
        
            <Button
              type="button"
              variant="white"
              bg="white"
              onClick={() => setShowModal(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </Button>
          
        </Modal.Header>
        <Modal.Body>
        {progress ? (
            <ProgressBar variant={"primary"} now={progress} />
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicFile">
                <input
                  type="file"
                  className="form-control"
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={(e) => setImg(e.target.files[0])}
                />
              </Form.Group>
              <Form.Group controlId="formBasicSubmit" className="my-2">
                <Button
                  type="submit"
                  variant="dark"
                  className="form-control btn-block navbar-custom"
                >
                  Upload image
                </Button>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
      </Modal>
      <Navbar sticky="top" variant="dark" className="navbar-custom" >
        <NavbarBrand as={NavLink} className="font" href={"/"} style={{ marginLeft: "50px"}}>
          Photo Gallary
        </NavbarBrand>
        <Button
          variant="outline-light" 
          size="sm"
          style={{ marginLeft: "auto", marginRight: "50px" }}
          onClick={() => setShowModal(true)}
        >
          Upload
        </Button>
      </Navbar>
     
    </>
  );
};

export default NavbarComponent;
