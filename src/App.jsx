import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

// Components
import PrivateRoute from "./components/routeControllers/PrivateRoute";
import AuthenticationRoute from "./components/routeControllers/AuthenticationRoute";
import Home from "./components/pages/Home";
import Register from "./components/pages/Register";
import Users from "./components/pages/Users";
import Login from "./components/pages/Login";
import NotFound from "./components/errorPages/404";
import User from "./components/pages/User";
import EditAccount from "./components/pages/EditAccount";
import AddModel from "./components/pages/AddModel";
import Model from "./components/pages/Model";
import DeleteModel from "./components/pages/DeleteModel";
import Models from "./components/pages/Models";
import ReportIssue from "./components/pages/ReportIssue";
import EditPassword from "./components/pages/EditPassword";
import EditModel from "./components/pages/EditModel";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<PrivateRoute component={Home} apiRoute="/html/models?includeAbout=true" />}
        />
        <Route
          path="/home"
          element={<PrivateRoute component={Home} apiRoute="/html/models?includeAbout=true" />}
        />
        <Route
          path="/login"
          element={<AuthenticationRoute component={Login} />}
        />
        <Route
          path="/register"
          element={<AuthenticationRoute component={Register} />}
        />
        <Route
          path="/users"
          element={<PrivateRoute component={Users} apiRoute="/html/users" />}
        />
        <Route
          path="/user/:_id"
          element={<PrivateRoute component={User} apiRoute={"/html/user/:_id"} />}
        />
        <Route
          path="/editAccount"
          element={<PrivateRoute component={EditAccount} apiRoute={"/html/editAccount"} />}
        />
        <Route
          path="/addModel"
          element={<PrivateRoute component={AddModel} apiRoute={"/html/addModel"} />}
        />
        <Route
          path="/editModel/:model_id"
          element={<PrivateRoute component={EditModel} apiRoute={"/html/editModel/:model_id"} />}
        />
        <Route
          path="/model/:model_id"
          element={<PrivateRoute component={Model} apiRoute={"/html/model/:model_id"} />}
        />
        <Route
          path="/deleteModel/:model_id"
          element={<PrivateRoute component={DeleteModel} apiRoute={"/html/deleteModel/:model_id"} />}
        />
        <Route
          path="/editPassword"
          element={<PrivateRoute component={EditPassword} apiRoute="/html/justUserInfo" />}
        />
        <Route
          path="/models"
          element={<PrivateRoute component={Models} apiRoute="/html/models?includeAbout=false" />}
        />
        <Route
          path="/reportIssue"
          element={<PrivateRoute component={ReportIssue} apiRoute="/html/justUserInfo" />}
        />
        <Route
          path="/404"
          element={<NotFound />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </Router>
  );
};

export default App;