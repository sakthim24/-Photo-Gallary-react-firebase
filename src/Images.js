import { faTrash, faWindowRestore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Card, Container } from "react-bootstrap";
import { firestore, storage } from "./API/firebase";
import swal from 'sweetalert';
import './index.css'


const Imags = ({ images, setImages, allImages, setAllImages }) => {

  const deleteImage = (docId, url) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this image!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {

        if (willDelete) {
          storage.refFromURL(url).delete().then(() => {
            firestore.collection("images").doc(docId).delete().then(() => {
              setAllImages(allImages.filter((image) => image.data.url !== url));
              setImages(prevImages => prevImages.filter(img => img.id !== docId));

            }).catch(err => console.log(err));

          }).catch(err => console.log(err));
          swal("Poof! Your image has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your image is safe!");
        }
      });

  }

  return (
    <>
      <Container fluid>
        <div className="container">

          {images.length < 1 ? (
            <h1 className="text-center my-5">No Images Found</h1>
          ) : (
            images.map((img, index) => (
              <Card className="mb-2 mx-auto col-md-3" key={index} style={{ width: '100%' }}>
                <Card.Body>
                  <Card.Img src={img.data.url} alt={img.data.name} />
                </Card.Body>
                <Card.Footer className="navbar-custom">
                  <Card.Title  >{img.data.name} <Button variant="white"
                    type="button" style={{ marginLeft: "auto" }} onClick={() => deleteImage(img.id, img.data.url)} >
                    <FontAwesomeIcon icon={faTrash} /></Button></Card.Title>

                </Card.Footer>
              </Card>
            ))
          )}
        </div>
      </Container>
    </>
  );
};

export default Imags;