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
import Post from "./Post";
import LoadingBar from "react-top-loading-bar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import OrderStatus from "./components/common/OrderStatus";


function App() {
  // const [modelShow, setModelShow] = useState(false);
  // const [product, setProduct] = useState("");
  const [progress,setProgress] = useState(0)
  const [cart,setCart] = useState()

  
  return (
    <div className="margin-b-500px bg-fff">
      <ToastContainer autoClose={500} position="bottom-right"/>
      <LoadingBar color="#cc0c39" progress={progress} onLoaderFinished={() => setProgress(0)} shadow={true} height={2}/>
      <Router>
        <Routes>
          
          <Route exact path="/" element={<UnderNavbar setProgress={setProgress} cart={cart}/>}>
            <Route exact path="/" element={<Home setProgress={setProgress}/>} />
            <Route exact path="list/:listType" element={<ListPage setProgress={setProgress} setCart={setCart} cart={cart}/>} />
            <Route exact path="product/:productId" element={<ProductPage setProgress={setProgress} setCart={setCart} cart={cart}/>}/>
            <Route exact path="yourCart" element={<YourCart setProgress={setProgress} setCart={setCart} cart={cart}/>} />
            <Route exact path="yourOrder" element={<YourOrder setProgress={setProgress} />} />
            <Route exact path="profile" element={<ProfilePage />} />
            <Route exact path="/your_order_status" element={<OrderStatus />}/>
          </Route>
          
          <Route exact path="/form" element={<Post />} />
          <Route exact path="/singup&login" element={<Singup_Login setProgress={setProgress}/>} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
