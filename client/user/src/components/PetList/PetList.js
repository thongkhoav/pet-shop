import "./petList.scss";
import { v4 as uuidv4 } from "uuid";
import { API_URL, fakeData } from "~/constants";
import Card from "../Card/Card";
// import useFetch from "../../hooks/useFetch";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import axios from "axios";

function PetList({ filter }) {
  const [petList, setPetList] = useState([]);
  // const { cateId, maxPrice, sort, subCates } = filter;
  // console.log(subCates);
  // const { data, loading, error } = useFetch(
  //   `/products?populate=*&filters[price][$lte]=${maxPrice}&filters[categories][id][$eq]=${cateId}${subCates.map(
  //     (item) => `&filters[sub_categories][id]=${item}`
  //   )}&sort=price:${sort}`
  // );

  useEffect(() => {
    const fetchData = async () => {
       try {
          const res = await axios.get(`${API_URL}/pets`);
          console.log(res.data);
          setPetList(res.data);
       } catch(err) {
        console.log(err);
       }
    }
    fetchData();

  }, [])
  
  console.log(petList);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {petList?.map((item) => (
          <Grid sm={6} md={4} lg={3} key={uuidv4()}>
            <Card info={item}  />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default PetList;
