import React from "react";
import Button from "../parts/Button";
import Title from "../parts/Title";
import { RefreshIcon } from "@heroicons/react/outline";

const NoCrossCookies = () => (
  <div className="text-center">
    <Title>3rd Party Cookies are Disabled</Title>
    <p className="m-3">In your browser settings, turn on 3rd party cookies (also known also cross site tracking).</p>
    <a href="/"><Button icon={RefreshIcon}>Refresh</Button></a>
  </div>
);

export default NoCrossCookies;