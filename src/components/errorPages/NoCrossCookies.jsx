import React from "react";
import Button from "../parts/Button";
import Title from "../parts/Title";
import { RefreshIcon } from "@heroicons/react/outline";

const NoCrossCookies = () => (
  <div className="text-center">
    <Title>3rd Party Cookies are Disabled</Title>
    <p className="m-3">In your browser settings, turn on 3rd party cookies (also known as cross site tracking).</p>
    <p className="bg-secondarydark cursor-pointer p-3" onClick={() => {alert(
        `
        iPhone: Go to Settings > Safari > then uncheck "prevent cross site tracking"
        Laptop (Safari): Go to Prefrences > Privacy > then uncheck "prevent cross site tracking"
        Laptop (Chrome): Go to Settings > Security & Privacy > Cookies & other site data > Allow all cookies *OR* block cookies in cognito
        `
    )}}>How do I do this?</p>
    <a href="/"><Button icon={RefreshIcon}>Refresh</Button></a>
  </div>
);

export default NoCrossCookies;