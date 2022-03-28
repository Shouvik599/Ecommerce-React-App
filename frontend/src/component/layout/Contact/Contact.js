import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:1805809@kiit.ac.in">
        <Button>Contact: 1805809@kiit.ac.in</Button>
    </a>
    <a className="mailBtn" href="mailto:1805702@kiit.ac.in">
        <Button>Contact: 1805702@kiit.ac.in</Button>
    </a>
    <a className="mailBtn" href="mailto:1805151@kiit.ac.in">
      <Button>Contact: 1805151@kiit.ac.in</Button>
      </a>
    </div>
  );
};

export default Contact;