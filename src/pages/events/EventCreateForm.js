import React, { useState } from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import styles from "../../styles/EventCreateEditForm.module.css";

function EventCreateForm() {
  //   const [errors, setErrors] = useState({});

  const [createEventData, setCreateEventData] = useState({
    event: "",
    description: "",

    date: "",
  });
  const { event, description, image, date } = createEventData;

  const handleChange = (event) => {
    setCreateEventData({
      ...createEventData,
      [event.target.name]: event.target.name,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setCreateEventData({
        ...createEventData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  return (
    <Form>
      <Row>
        <Col className="m-4 p-4">
          <Container className="d-flex flex-column justify-content-center text-center">
            <h1 id={styles.creatingForm}>Create event</h1>
            <p>Complete the form below to create your event.</p>
            <Form.Group className="text-center">
              <Form.Label>Event name:</Form.Label>
              <Form.Control
                type="text"
                name="event"
                value={event}
                onChange={handleChange}
              />
              <Form.Label>Description:</Form.Label>
              <textarea
                className="form-control"
                type="text"
                rows="6"
                name="description"
                value={description}
                onChange={handleChange}
              />
              <Form.Label>Date:</Form.Label>
              <Form.Control
                className="form-control"
                type="date"
                rows="6"
                name="date"
                value={date}
                onChange={handleChange}
              />

              <Form.File
                id="exampleFormControlFile1"
                accept="image/"
                label="Upload an image"
                onChange={handleChangeImage}
              />
            </Form.Group>
            <div className="text-center">
              <Button onClick={() => {}} className="mr-3">
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </div>
          </Container>
        </Col>
      </Row>
    </Form>
  );
}

export default EventCreateForm;
