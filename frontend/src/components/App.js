import Profile from "./Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
 return (
  <BrowserRouter>
   <Routes>
    <Route path="/" element={<Profile />}></Route>
   </Routes>
  </BrowserRouter>
 );
};

export default App;
