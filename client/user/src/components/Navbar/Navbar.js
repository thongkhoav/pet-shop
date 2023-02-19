import "./navbar.scss";
import {
  ArrowDropDown,
  FavoriteBorderOutlined,
  PersonOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { AuthContext } from "~/context/authContext";
import { Button } from "@mui/material";
import petIcon from "~/assets/images/dog_icon.jpg";
import axios from "axios";
import { API_URL } from "~/constants";
// import { useSelector } from "react-redux";
// import $ from "jquery";
// import useFetch from "../../hooks/useFetch";

function Navbar() {
  const cateId = parseInt(useParams().id);
  const { currentUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [speciesList, setSpeciesList] = useState([]);
  // const products = useSelector((state) => state.cart.products);
  const cartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/species`);
        // console.log(res.data);
        setSpeciesList(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // const { data, loading, error } = useFetch(`/categories`);

  // const itemNumber = () => {
  //   let num = 0;
  //   pets.forEach((ele) => {
  //     num += ele.quantity;
  //   });
  //   return num;
  // };
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="left">
          <div className="item">
            <img src={petIcon} alt="" />
            <ArrowDropDown />
          </div>
          <div className="item">
            <span>VN</span>
            <ArrowDropDown />
          </div>
          <div className="item relative inline-block text-left group">
            <span className="cursor-pointer">Pets</span>
            <div
              class="group-hover:block hidden absolute top-5 z-10 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabindex="-1"
            >
              <div class="py-1" role="none">
                {speciesList?.map((spe) => (
                  <Link
                    to={`/pets/species/${spe._id}`}
                    class="hover:bg-gray-100 hover:text-gray-900 text-gray-700 block px-4 py-2 text-sm"
                  >
                    {spe.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {/* {data.map((item) => (
            <div
              className={`item ${cateId === item.id && "select"}`}
              key={item.id}
            >
              <Link to={`/products/${item.id}`}>{item.attributes.title}</Link>
            </div>
          ))} */}
          <div className="item cate-box-list">
            <Link to="/products/accessories">Accessories</Link>
            <div className="cate-options">
              <Link to="/products">Food</Link>
              <Link to="/products">Stuff</Link>
            </div>
          </div>
        </div>
        <div className="center">
          <Link to="/">Tekʃop</Link>
        </div>
        <div className="right">
          <div className="item">
            <Link to="/">Contact</Link>
          </div>
          <div className="item">
            <Link to="/">About</Link>
          </div>
          <div className="item">
            <Link to="/">Outlets</Link>
          </div>
          <div className="icons">
            <SearchOutlined />
            {!currentUser ? (
              <Button variant="outlined" size="small">
                <Link to="/login">Login</Link>
              </Button>
            ) : (
              <>
                <Link to="/profile">
                  <PersonOutlined />
                </Link>
                <FavoriteBorderOutlined />
                <div className="cartBox" onClick={() => setOpen(!open)}>
                  <ShoppingCartOutlined />
                  {/* <span onClick={() => setOpen(!open)}>{itemNumber()}</span> */}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {open && (
        <div ref={cartRef}>
          {/* <CardModal /> */}
        </div>
      )}
    </div>
  );
}

export default Navbar;
