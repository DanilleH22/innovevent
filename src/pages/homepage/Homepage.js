import React from "react";
import {
  Row,
  Col,
  Container,
  Card,
  Button,
  Carousel,
} from "react-bootstrap";
import Network from "../../assets/network.png";
import Networking2 from "../../assets/networking2.png";
import Networking3 from "../../assets/networking3.png";
import styles from "../../App.module.css";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <Container fluid="md">
      <Row className="my-4">
        <Col className="text-center">
          <h1>Innovevent</h1>
          <h5>Bringing events to you!</h5>
        </Col>
      </Row>
      <Row className="pb-4">
        <Col className="h-50">
          <Carousel>
            <Carousel.Item>
              <img
                className={`d-block w-100 ${styles.carouselImage}`}
                src={Network}
                alt="Network conference"
              />
              <Carousel.Caption>
                <h3>Learn</h3>
                <p>Learn from professionals in your field</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className={`d-block w-100 ${styles.carouselImage}`}
                src={Networking2}
                alt="Second slide"
              />

              <Carousel.Caption>
                <h3>Meet</h3>
                <p>Meet with like-minded indiviuals</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className={`d-block w-100 ${styles.carouselImage}`}
                src={Networking3}
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>Speak</h3>
                <p>Speak about</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
      <Row className="text-center">
        <Col md={4} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Why Innoevent?</Card.Title>
              <Card.Text>
                Discover the benefits of joining our tech events and enhance
                your skills, network, and career opportunities.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Upcoming Events</Card.Title>
              <Card.Text>
                Stay updated with the latest events and workshops happening in
                the tech industry around you.
              </Card.Text>
              <Button
                variant="danger"
                as={Link}
                to={`/events/`}
              >
                View Events
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Benefits from Tech Events</Card.Title>
              <Card.Text>
                Engage with experts and thought leaders in technology. Gain
                insights and exposure to new technologies and trends.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Homepage;
