import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Pending from "../errorPages/Pending";
import Error from "../errorPages/Error";
import Forbidden from "../errorPages/403";
import Loading from "../loader/Loading";
import instance from "../../axiosInstance";
import { UserContext } from "../../context/UserContext";
import NotFound from "../errorPages/404";

function PrivateRoute(props) {
  const [res, setRes] = useState(null);
  const [isError, setIsError] = useState(false);
  const params = useParams();

  // When the API route changes, we need to fetch new data. In the case that a link to the same page is clicked
  // within a page, new data will not be fetched since neither the API route (without parameters being replaced)
  // nor the have parameters changed.
  useEffect(() => {
    // Reset state on new props or params:
    setRes(null);
    setIsError(false);

    // Replace each instance of :key in the apiRoute with the corresponding value from params:
    let apiRouteWithParams = props.apiRoute;
    Object.keys(params).forEach((key) => {
      const value = params[key];

      if (value) {
        apiRouteWithParams = apiRouteWithParams.replace(`:${key}`, value);

      } else {
        // If a parameter is not defined, we cannot proceed:
        apiRouteWithParams = apiRouteWithParams.replace(`:${key}`, "");
      }
    });

    const allParamsDefined = !apiRouteWithParams.includes(":");
    if (!allParamsDefined) return;

    async function dataFetch() {
      try {
        const data = await instance.get(apiRouteWithParams);
        setRes(data);

      } catch (error) {
        setIsError(error);
      }
    }

    dataFetch();

  }, [props.apiRoute, params]);

  // Replace each instance of :key in the apiRoute with the corresponding value from params:
  let apiRouteWithParams = props.apiRoute;
  Object.keys(params).forEach((key) => {
    const value = params[key];

    if (value) {
      apiRouteWithParams = apiRouteWithParams.replace(`:${key}`, value);

    } else {
      // If a parameter is not defined, we cannot proceed:
      apiRouteWithParams = apiRouteWithParams.replace(`:${key}`, "");
    }
  });

  const allParamsDefined = !apiRouteWithParams.includes(":");

  const ChildComponent = props.component;

  // The following condition checks that a response has been received corresponding to the API route given in props.
  // This prevents the error where clicking a link will result in a blank page because the PrivateRoute component
  // has saved a response from a previous API call that the child component is not prepared to handle, and it ends
  // up breaking by attempting to map over an undefined value and such.
  if (allParamsDefined && res && res.config.url === apiRouteWithParams) {
    if (!res.data.authorized) {
      switch (res.data.currentUser.userPermissions) {
        case 0:
          return <Navigate to="/login" />;
        case 1:
          return <Pending />;
        case 2:
          return <Navigate to="/editAccount" />;
        default:
          return <Forbidden />;
      }

    } else if (!res.data.found) {
      return <NotFound />;

    } else {
      return (
        <UserContext.Provider value={res.data.currentUser}>
          <ChildComponent data={res.data.data} />
        </UserContext.Provider>
      );
    }

  } else if (isError) {
    return <Error error={isError} />;

  } else {
    return <Loading />;
  }
}

export default PrivateRoute;