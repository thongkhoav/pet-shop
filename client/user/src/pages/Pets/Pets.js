// import useFetch from "../../hooks/useFetch";
// import $ from "jquery";
import "./pets.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Filter from "~/components/Filter/Filter";
import PetList from "~/components/PetList/PetList";

function Pets() {



  // Functions


  return (
    <div className="products">
      <div className="left">
        <Filter/>
      </div>
      <div className="right">
        <img
          className="cateImg"
          src="https://img.freepik.com/free-photo/group-portrait-adorable-puppies_53876-64778.jpg?w=2000"
          alt=""
        />
        <PetList />
      </div>
    </div>
  );
}

export default Pets;
