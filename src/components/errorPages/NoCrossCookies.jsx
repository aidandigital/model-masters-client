import React from "react";
import Button from "../parts/Button";
import Title from "../parts/Title";
import { RefreshIcon } from "@heroicons/react/outline";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";

const NoCrossCookies = () => (
  <div className="text-center">
    <Title>3rd Party Cookies are Disabled</Title>
    <p className="m-3">In your browser settings, turn on 3rd party cookies (also known as cross site tracking).</p>
    <Button type="important" onClick={() => {alert(
        `
        iPhone: Go to Settings > Safari > uncheck "prevent cross site tracking"

        Laptop (Safari): Go to Prefrences > Privacy > uncheck "prevent cross site tracking"

        Laptop (Chrome): Go to Settings > Security & Privacy > Cookies & other site data > Select "Allow all cookies" OR "block 3rd party cookies in cognito"
        `
    )}}><QuestionMarkCircleIcon className="h-5 relative -top-0.5 inline-block" /> How do I fix this?</Button>
    <div className="h-3"></div>
    <a href="/"><Button icon={RefreshIcon}>Refresh</Button></a>
  </div>
);

export default NoCrossCookies;