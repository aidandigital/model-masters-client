import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Pending from "../errorPages/Pending";
import Error from "../errorPages/Error";
import Forbidden from "../errorPages/403";
import Loading from "../loader/Loading";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

function PrivateRoute(props) {
  const [res, setRes] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function dataFetch() {
      axios
        .get(props.apiRoute)
        .then((data) => {
            setRes(data.data);
        })
        .catch((error) => {
          setIsError(error);
        });
    }
    dataFetch();
  }, [props.apiRoute]);

  const ChildComponent = props.component;

  if (res) {
    if (!res.authorized) {
      switch (res.currentUser.userPermissions) {
        case 0:
          return <Redirect to="/login" />;
        case 1:
          return <Pending />;
        case 2:
          return <Redirect to="/editAccount" />;
        default: // If no visible account issues, must not be authorized due to permissions level, show forbidden:
          return <Forbidden />;
      }
    } else if (!res.found) {
      return <Redirect to="/404" />
    } else {
      return <UserContext.Provider value={res.currentUser}><ChildComponent data={res.data} /></UserContext.Provider>;
    }
  } else if (isError) {
    return <Error error={isError} />;
  } else {
    return <Loading />;
  }
}

export default PrivateRoute;
