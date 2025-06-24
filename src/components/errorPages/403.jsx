import React from "react";
import { Link } from "react-router-dom";
import Title from "../parts/Title";
import Button from "../parts/Button";
import Spacer from "../parts/Spacer";
import { HomeIcon } from "@heroicons/react/solid";

const Forbidden = () => (
  <div className="text-center">
    <Title>Restricted Page</Title>
    <p className="m-3">This page is not available to you.</p>
    <Spacer />
    <Button icon={HomeIcon}><Link to="/">Back to Home</Link></Button>
  </div>
);

export default Forbidden;
