import { AddPhotoAlternate } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL, IMAGE_URL } from "~/constants";

export default function AddPetStorage() {
  const [inputs, setInputs] = useState({
    species_id: "",
    name: "",
    desc: "",
    small: { quantity: 0, price: 0 },
    medium: { quantity: 0, price: 0 },
  });
  const [species, setSpecies] = useState([]);
  const { id } = useParams();
  // const {pet_sale} = inputs;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/pets/${id}`);
        console.log(res.data);
        const { images, name, desc, species_id, small, medium } =
          res.data;
        setInputs({ images, name, desc, small, medium, species_id });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/species`);
        console.log(res.data);
        setSpecies(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  const hanleInput = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  //   console.log(inputs.pet_sale[0].price);
  return (
    <div className="grid grid-cols-2 gap-4 bg-gray-200 p-7">
      <form
        className="flex flex-col items-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        // onSubmit={handleAddPet}
      >
        <input
          type="text"
          name="name"
          className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="name"
          value={inputs?.name}
          onChange={hanleInput}
          required
        />
        <input
          type="text"
          name="desc"
          className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="desc"
          value={inputs?.desc}
          onChange={hanleInput}
          required
        />
        <div className="flex gap-4">
          <input
            type="number"
            name="small"
            className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={inputs?.small ? inputs?.small?.price : ""}
            placeholder="small price"
            onChange={(e) => setInputs(prev => ({...prev, small:{price: e.target.value, quantity: prev.small.quantity}}))}
            required
          />
          <input
            type="number"
            name="small-quantity"
            className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={inputs?.small ? inputs?.small?.quantity : ""}
            placeholder="small quantity"
            onChange={(e) => setInputs(prev => ({...prev, small:{quantity: e.target.value, price: prev.small.price}}))}
            required
          />
        </div>
        <div className="flex gap-4">
          <input
            type="number"
            name="medium"
            className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={inputs?.medium ? inputs?.medium?.price : ""}
            placeholder="medium price"
            onChange={(e) => setInputs(prev => ({...prev, medium:{price: e.target.value, quantity: prev.medium.quantity}}))}
            required
          />
          <input
            type="number"
            name="medium-quantity"
            className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={inputs?.medium ? inputs?.medium?.quantity : ""}
            placeholder="medium quantity"
            onChange={(e) => setInputs(prev => ({...prev, medium:{quantity: e.target.value, price: prev.medium.price}}))}
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
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          aria-label=".form-select-sm example"
          name="species_id"
          onChange={hanleInput}
          value={inputs?.species_id}
        >
                   {species?.map((spe) => (
            <option value={spe._id} key={spe._id} selected>
              {spe.title}
            </option>
          ))}
        </select>
        <div className="my-2">
          <label htmlFor="image" className="cursor-pointer">
            <AddPhotoAlternate />
          </label>
          {/* <input
            type="file"
            name=""
            onChange={handleImageSelect}
            id="image"
            className="hidden"
          /> */}
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
          Add Pet
        </button>
      </form>

      <div className="p-3">
        <div className="grid grid-cols-4 gap-4">
          {inputs.images?.map((image) => {
            {
              /* const url = URL.createObjectURL(file); */
            }
            return (
              <div className="max-h-80 relative bg-slate-50">
                <img
                  src={`${IMAGE_URL}/${image.filename}`}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <button
                  className="absolute top-0 right-0 p-1 font-bold bg-red-400 bg-opacity-40"
                  //   onClick={() => deleteSelectedImage(file)}
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
