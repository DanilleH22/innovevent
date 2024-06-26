import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import ContactUsForm from "./pages/contact/ContactUsForm";
import EventCreateForm from "./pages/events/EventCreateForm";
import EventsDetail from "./pages/events/EventsDetail";
import Events from "./pages/events/Events";
import EventSignUp from "./pages/events/EventSignUp";
import Profile from "./pages/profiles/Profile";
import EditEventForm from "./pages/events/EditEventForm";
import Homepage from "./pages/homepage/Homepage"

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <Homepage />} />
          <Route exact path="/events" render={() => <Events />} />
          <Route exact path="/contact_us" render={() => <ContactUsForm />} />
          <Route
            exact
            path="/events/create"
            render={() => <EventCreateForm />}
          />
          <Route exact path="/events/:id" render={() => <EventsDetail />} />
          <Route
            exact
            path="/events/:id/signup"
            render={() => <EventSignUp />}
          />
          <Route
            exact
            path="/events/:id/edit"
            render={() => <EditEventForm />}
          />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/profiles/:id" render={() => <Profile />} />
          <Route render={() => <h1>Page not found!</h1>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
