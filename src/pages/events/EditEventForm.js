import React, { useState, useRef, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Container,
  Form,
  Button,
  Alert,
  Image,
} from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";

/**
 * Populate CreateForm data for editing and deleting
 */
function EditCreateForm() {
  const { id } = useParams();
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const currentDate = new Date
  const formattedDate = currentDate.toISOString().slice(0, 16);
  const [editEventData, setEditEventData] = useState({
    event_name: "",
    description: "",
    image: "",
    date: "",
  });
  const { event_name, description, image, date } = editEventData;
  

  const imageInput = useRef(null);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/events/${id}/`);
        if (!data.is_owner) {
          history.push("/not-authorised");
          return;
        }
        setEditEventData({
          event_name: data.event_name,
          description: data.description,
          date: data.date ? new Date(data.date).toISOString().slice(0, 16) : "",
          image: data.image,
        });
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id, history]);

  const handleChange = (event) => {
    setEditEventData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      setEditEventData((prevData) => ({
        ...prevData,
        image: URL.createObjectURL(event.target.files[0]),
      }));
    }
  };
  /**
   * Submit data on editing form
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("event_name", event_name);
    formData.append("description", description);
    formData.append("date", new Date(date).toISOString());
    if (imageInput.current.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/events/${id}/`, formData);
      history.push(`/events/${id}`);
    } catch (err) {
      console.error(err);
      setErrors(err.response?.data);
    }
  };

  /**
   * Delete Event and data
   */
  const deleteEvent = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axiosReq.delete(`/events/${id}/`);
        history.push("/");
      } catch (err) {
        console.error("Error deleting event", err);
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="m-4 p-4">
          <Container className="d-flex flex-column justify-content-center text-center">
            <h1>Edit {event_name}</h1>
            {image && (
              <div>
                <Image src={image} thumbnail />
                <p>Current Image</p>
              </div>
            )}
            <Form.Group className="text-center">
              <Form.Label htmlFor="event_name">Event Name:</Form.Label>
              <Form.Control
                type="text"
                name="event_name"
                id="event_name"
                value={event_name}
                onChange={handleChange}
              />
              {errors.event_name &&
                errors.event_name.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
              <Form.Label htmlFor="description">Description:</Form.Label>
              <textarea
                className="form-control"
                rows="6"
                name="description"
                id="description"
                value={description}
                onChange={handleChange}
              />
              {errors.description &&
                errors.description.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
              <Form.Label htmlFor="date">Date:</Form.Label>
              <Form.Control
                type="datetime-local"
                name="date"
                id="date"
                value={formattedDate}
                onChange={handleChange}
              />
              {errors.date &&
                errors.date.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
              <Form.File
                id="exampleFormControlFile1"
                accept="image/*"
                label="Change Image"
                ref={imageInput}
                onChange={handleChangeImage}
              />
              {errors.image &&
                errors.image.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
            </Form.Group>
            <div className="text-center mt-3">
              <Button
                variant="danger"
                onClick={() => history.goBack()}
                className="mr-3"
              >
                Cancel
              </Button>
              <Button type="submit" variant="danger">
                Save Changes
              </Button>
              <Button variant="danger" onClick={deleteEvent} className="ml-3">
                Delete
              </Button>
            </div>
          </Container>
        </Col>
      </Row>
    </Form>
  );
}

export default EditCreateForm;
