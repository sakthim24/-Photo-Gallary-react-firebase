import React, { useState, useEffect } from "react";
import { Container ,Row,Col, Form, InputGroup} from "react-bootstrap";
import "./index.css"

function Searchbar({setImages, allImages}) {
  const searchRef =React.useRef(null);
  const [text, setText] = useState("");
  useEffect(() => {
    setImages(
      allImages.filter((image) => image.data.name.toLowerCase().includes(text.trim())));
      searchRef.current.focus();
  })


 
  return (
    <>
    
    <Container >
    &sakthi
    <Row  className="justify-content-md-center">
    <Col   className="mx-auto my-5 md-12 text-center xs-6">
    <Form.Group controlId="formBasic">
    <InputGroup>
    <Form.Control
                className=" border-0 border-bottom outline-0"
                style={{ boxShadow: "none" }}
                type="text"
                placeholder="Search..."
                ref={searchRef}
                onChange={(e) =>  setText(e.target.value)}
              />
               </InputGroup>
    </Form.Group>
     </Col>
    </Row>
   
  </Container>
  </>
  )
}

export default Searchbar

