import { useState } from "react";
import "./filter.scss";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";

const data = [{ cate: "chó" }];
function Filter() {
  const cateId = parseInt(useParams().id);
  const [maxPrice, setMaxPrice] = useState(500);

  const [selectedSubCates, setSelectedSubCates] = useState([]);

  const [sort, setSort] = useState("asc");
  const [filter, setFilter] = useState({
    cateId,
    maxPrice,
    sort,
    subCates: selectedSubCates,
  });

    // useEffect(() => {
  //   setFilter((prev) => ({ ...prev, cateId }));
  // }, [cateId]);
  const handleSelectCategory = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    setSelectedSubCates(
      isChecked
        ? [...selectedSubCates, value]
        : selectedSubCates.filter((item) => item !== value)
    );
  };

  const handleSubmitFilter = () => {
    setFilter((prev) => ({
      cateId,
      maxPrice,
      sort,
      subCates: selectedSubCates,
    }));
  };
  return (
    <div>
      {/* <div className="filterItem">
        <h2>Product Categories</h2>
        {data?.map((item) => (
          <div className="inputItem" key={uuidv4()}>
            <input
              type="checkbox"
              id={item.id}
              value={item.id}
              onChange={handleSelectCategory}
              checked={selectedSubCates.includes(item.id + "") ? "checked" : ""}
            />
            <label htmlFor={item.id}>{item.attributes.title}</label>
          </div>
        ))}
      </div>
      <div className="filterItem">
        <h2>Filter by price</h2>
        <div className="inputItem">
          <span>0</span>
          <input
            type="range"
            min={0}
            max="500"
            value={maxPrice}
            defaultValue={500}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <span>500</span>
        </div>
        <div className="inputItem">
          <input
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>
      <div className="filterItem">
        <h2>Sort by</h2>
        <div className="inputItem">
          <input
            type="radio"
            name="sort"
            value="asc"
            id="asc"
            onChange={(e) => setSort(e.target.value)}
          />
          <label htmlFor="asc">Ascending</label>
        </div>
        <div className="inputItem">
          <input
            type="radio"
            name="sort"
            value="desc"
            id="desc"
            onChange={(e) => setSort(e.target.value)}
          />
          <label htmlFor="desc">Descending</label>
        </div>
      </div>
      <button className="filter-button" onClick={handleSubmitFilter}>
        Filter
      </button> */}
    </div>
  );
}

export default Filter;
