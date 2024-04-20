import React, { useState } from "react";
import {
  Form,
  Button,
  Card,
  Col,
  Row,
  Container,
  Alert,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import styles from "../../styles/SignUpForm.module.css";
import axios from "axios";

import { useSetCurrentUser } from "../../contexts/CurrentUserContext";

function SignInForm() {
  const setCurrentUser = useSetCurrentUser();
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = signInData;

  const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      history.push("/");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };
  
  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };
  

  return (
    <Row className={styles.Row}>
      <Col>
        <Container>
          <Card className="text-center d-flex justify-content-center mx-auto">
            <Card.Header>Sign in</Card.Header>
            <Card.Body>
              <Card.Text>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicName">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      name="username"
                      value={username}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Button variant="danger" type="submit">
                    Submit
                  </Button>
                  {errors.non_field_errors?.map((message, idx) => (
                    <Alert key={idx} variant="warning" className="mt-3">
                      {message}
                    </Alert>
                  ))}
                </Form>
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
              <Link className={styles.Link} to="/signup">
                Don't have an account? <span>Sign up</span>
              </Link>
            </Card.Footer>
          </Card>
        </Container>
      </Col>
    </Row>
  );
}

export default SignInForm;
