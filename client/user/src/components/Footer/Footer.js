import { Link } from "react-router-dom";
import "./footer.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="top-info">
        <div className="item">
          <h1>Categories</h1>
          <span>T-Shirt</span>
          <span>Pant</span>
          <span>Accessories</span>
          <span>Backpack</span>
        </div>
        <div className="item">
          <h1>Links</h1>
          <span>FAQ</span>
          <span>Outlets</span>
          <span>Consult</span>
        </div>
        <div className="item">
          <h1>About</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
            incidunt perspiciatis molestiae dolores quisquam repellat neque
            possimus nostrum, explicabo, enim error rem, distinctio et debitis!
            Veritatis quia culpa harum iusto.
          </p>
        </div>
        <div className="item">
          <h1>Contact</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
            incidunt perspiciatis molestiae dolores quisquam repellat neque
            possimus nostrum, explicabo, enim error rem, distinctio et debitis!
            Veritatis quia culpa harum iusto.
          </p>
        </div>
      </div>
      <div className="bottom-logos">
        <div className="left">
          <Link to="/">
            <span>Tekʃop</span>
          </Link>
        </div>
        <div className="right">
          <img src="/assets/img/payment.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Footer;
