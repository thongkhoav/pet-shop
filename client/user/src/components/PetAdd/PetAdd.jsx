import {
  AddAPhoto,
  AddAPhotoOutlined,
  AddPhotoAlternate,
} from "@mui/icons-material";
import { Box, Grid } from "@mui/material";
import axios from "axios";
import React, { useContext, useMemo, useState } from "react";
import { API_URL } from "~/constants";
import { AuthContext } from "~/context/authContext";
// import "./petAdd.scss";

export default function PetAdd() {
  const { currentUser } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    species_id: "63ed13e5f07b7f7c0feee546",
    name: "",
    desc: "",
    price: 0,
    birth: "",
    gender: "",
  });
  const [filesImage, setFilesImage] = useState([]);
  const formData = useMemo(() => new FormData(), []);

  // console.log(files);

  const handleAddPet = async (e) => {
    e.preventDefault();
    for (const key in inputs) {
      if (Object.hasOwnProperty.call(inputs, key)) {
        const value = inputs[key];
        formData.append(key, value);
      }
    }
    formData.append("owner_id", currentUser._id);
    for (let i = 0; i < filesImage.length; i++) {
      formData.append("images", filesImage[i]);
    }

    for (const value of formData.values()) {
      console.log(value);
    }
    console.log(formData);
    try {
      await axios.post(`${API_URL}/pets`, formData);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteSelectedImage = (dfile) => {
    setFilesImage((prev) => prev.filter((file) => file.name !== dfile.name));
  };

  const hanleInput = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file && filesImage.length <= 3) {
      setFilesImage((prev) => [...prev, file]);
    }
  };
  // console.log(inputs.species_id);
  return (
    <div className="grid grid-cols-2 gap-4 bg-gray-200 p-7">
      <form className="flex flex-col items-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleAddPet}>
        <input
          type="text"
          name="name"
          className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="name"
          onChange={hanleInput}
          required
        />
        <input
          type="text"
          name="desc"
          className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="desc"
          onChange={hanleInput}
          required
        />
        <input
          type="number"
          name="price"
          className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="price"
          onChange={hanleInput}
          required
        />
        <input
          className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="date"
          name="birth"
          placeholder="birth"
          onChange={hanleInput}
          required
        />
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
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          aria-label=".form-select-sm example"
          name="species_id"
          onChange={hanleInput}
          defaultValue={inputs.species_id}
        >
          <option value="63ed13e5f07b7f7c0feee546">Chó</option>
          <option value="2">Mèo</option>
          <option value="3">Chuột</option>
        </select>
        <input
          className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="gender"
          placeholder="gender"
          onChange={hanleInput}
          required
        />
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
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
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
