import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Home from "./component/Home";
import Register from "./component/Register";
import { Switch, Route, Router, BrowserRouter } from "react-router-dom";
import Login from "./component/Login";
import Candidate from "./component/Candidate";
import SendMoney from "./component/SendMoney";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/Login" component={Register} />
        <Route exact path="/Home" component={Home} />
        <Route exact path="/Candidate" component={Candidate} />
        <Route exact path="/send" component={SendMoney} />

      </Switch>
    </BrowserRouter>
  );
}

export default App;
