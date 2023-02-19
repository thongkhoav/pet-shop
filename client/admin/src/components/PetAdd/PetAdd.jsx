import { AddPhotoAlternate } from "@mui/icons-material";
import axios from "axios";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "~/constants/index";
import { AuthContext } from "~/context/authContext";
import "./petAdd.scss";

export default function PetAdd() {
  const { currentUser } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    species_id: "",
    name: "",
    desc: "",
    small_quantity: 0,
    small_price: 0,
    medium_quantity: 0,
    medium_price: 0,
  });
  const [species, setSpecies] = useState([]);
  const [filesImage, setFilesImage] = useState([]);
  let formData = useMemo(() => new FormData(), []);
  const navigate = useNavigate();

  // console.log(files);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/species`);
        // console.log(res.data);
        setInputs((prev) => ({ ...prev, species_id: res.data[0]._id }));
        setSpecies(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleAddPet = async (e) => {
    e.preventDefault();
    for (const key in inputs) {
      if (Object.hasOwnProperty.call(inputs, key)) {
        const value = inputs[key];
        formData.append(key, value);
      }
    }
    for (let i = 0; i < filesImage.length; i++) {
      formData.append("images", filesImage[i]);
    }

    for (const key of formData.keys()) {
      console.log(key, formData.get(key));
    }
    console.log(formData);
    try {
      await axios.post(`${API_URL}/pets`, formData);
      navigate(0);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteSelectedImage = (dfile) => {
    setFilesImage((prev) => prev.filter((file) => file.name !== dfile.name));
  };

  const handleInput = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file && filesImage.length <= 3) {
      setFilesImage((prev) => [...prev, file]);
    }
  };
  // console.log(species);
  return (
    <div className="grid grid-cols-2 gap-4 bg-gray-200 p-7">
      <form
        className="flex flex-col items-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleAddPet}
      >
        <div className="flex items-center justify-between gap-2 w-full">
          <label htmlFor="name" className="min-w-fit font-semibold">
            General name:{" "}
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="pet-add-input"
            placeholder="name"
            onChange={handleInput}
            required
          />
        </div>
        <select
          className="mb-2 form-select form-select-sm
          appearance-none
          block
          w-full
          px-3
          py-2
          text-sm
          font-normal
          text-gray-700
          bg-white bg-clip-padding bg-no-repeat
          border  border-gray-300
          rounded
          transition
          ease-in-out
          shadow
           focus:border-blue-600 focus:outline-none"
          aria-label=".form-select-sm example"
          name="species_id"
          onChange={handleInput}
          
        >
          {species?.map((spe) => (
            <option value={spe._id} key={spe._id} >
              {spe.title}
            </option>
          ))}
        </select>
        <div className="flex items-center justify-between gap-2 w-full">
          <label htmlFor="name" className="min-w-fit font-semibold">
            Description: 
          </label>
          <input
            type="text"
            name="desc"
            className="pet-add-input"
            placeholder="desc"
            onChange={handleInput}
            required
          />
        </div>
        <div className="flex gap-4 items-center">
        <span className="font-semibold min-w-[60px]">Small</span>
          <input
            type="number"
            name="small_price"
            className="pet-add-input"
            value={inputs?.small_price}
            placeholder="small price"
            onChange={handleInput}
            required
          />
          <input
            type="number"
            name="small_quantity"
            className="pet-add-input"
            value={inputs?.small_quantity}
            placeholder="small quantity"
            onChange={handleInput}
            required
          />
        </div>
        <div className="flex gap-4">
        <span className="font-semibold min-w-[60px]">Medium</span>
          <input
            type="number"
            name="medium_price"
            className="pet-add-input"
            value={inputs?.medium_price}
            placeholder="medium price"
            onChange={handleInput}
            required
          />
          <input
            type="number"
            name="medium_quantity"
            className="pet-add-input"
            value={inputs?.medium_quantity}
            placeholder="medium quantity"
            onChange={handleInput}
            required
          />
        </div>

        <div className="my-2">
          <label htmlFor="image" className="cursor-pointer">
            <AddPhotoAlternate />
          </label>
          <input
            type="file"
            name=""
            onChange={handleImageSelect}
            id="image"
            className="hidden"
          />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
          Add Pet
        </button>
      </form>

      <div className="p-3">
        <div className="grid grid-cols-2 gap-4">
          {filesImage?.map((file) => {
            const url = URL.createObjectURL(file);
            return (
              <div className="max-h-80 relative bg-slate-50">
                <img src={url} alt="" className="w-full h-full object-cover" />
                <button
                  className="absolute top-0 right-0 p-1 font-bold bg-red-400 bg-opacity-40"
                  onClick={() => deleteSelectedImage(file)}
                >
                  Xoá
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
