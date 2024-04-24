import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";

function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState({
    biography: "",
    owner: id,
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`/profiles/${id}/`);
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile", error);
      }
    };

    fetchProfile();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`/profiles/${id}/`, profile);
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  return (
    <Card style={{ width: "18rem", margin: "20px" }}>
      <Card.Body>
        <Card.Title>{profile.owner}</Card.Title>
        {!editing ? (
          <>
            <Card.Text>{profile.biography}</Card.Text>
            <Button variant="primary" onClick={() => setEditing(true)}>
              Edit Profile
            </Button>
          </>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Biography</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="biography"
                value={profile.biography}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Save Changes
            </Button>
            <Button
              variant="secondary"
              onClick={() => setEditing(false)}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </Button>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
}

export default Profile;
