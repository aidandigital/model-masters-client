import React from "react";
import { useHistory } from "react-router-dom";

const DelayedRedirect = (props) => {
  const history = useHistory();

  function delayAndGo() {
    setTimeout(() => history.push(props.to), props.delay);
  }

  return (
    <>{delayAndGo()}</>
  );
}

export default DelayedRedirect;