import "./card.scss";
import { Link } from "react-router-dom";
import { IMAGE_URL } from "~/constants";

function Card({ info }) {
  // console.log(info);
console.log(info);
  return (
    <Link to={`/product/${info._id}`}>
      <div className="card">
        <div className="image">
          <img
            src={`${IMAGE_URL}/${info.images[0].filename}`}
            alt=""
          />
          {info.images[1]  && (
            <img
              src={`${IMAGE_URL}/${info.images[1].filename}`}
              alt=""
              className="extraImg"
            />
          )}
        </div>
        <h5>{info.name}</h5>
        <div className="price">
          <span className="newPrice">${info.small.price}</span>
          <span className="newPrice">${info.medium.price}</span>
        </div>
      </div>
    </Link>
  );
}

export default Card;
