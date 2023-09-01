import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./components/home/Home";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Post from './Post';
import { useState } from "react";
import Singup_Login from "./components/common/Singup_Login";
import "bootstrap/dist/css/bootstrap.min.css";
import ListPage from "./components/common/Components/ListPage";
import UnderNavbar from "./UnderNavbar";
import ProductPage from "./components/common/ProductPage";
import YourCart from "./components/common/YourCart";
import YourOrder from "./components/common/YourOrder";
import ProfilePage from "./components/common/ProfilePage";
import Post from "./Post"


function App() {
  // const [modelShow, setModelShow] = useState(false);
  const [product,setProduct] = useState('')
  console.log(product)

  return (
    <div className="margin-b-500px bg-fff">
      <Router>
        <Routes>
          <Route exact path="/" element={<UnderNavbar/>}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="list/:listType" element={<ListPage />} />
            <Route exact path="product/:productId" element={<ProductPage product={product}/>} />
            <Route exact path="yourCart" element={<YourCart />} />
            <Route exact path="yourOrder" element={<YourOrder />} />
            <Route exact path="profile" element={<ProfilePage />} />
          </Route>
          
          <Route exact path="/form" element={<Post/>}/>
          <Route
            exact
            path="/singup&login"
            element={<Singup_Login/>}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
