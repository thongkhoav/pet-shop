import { useContext } from "react";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import AddPetStorage from "~/components/AddPetStorage/AddPetStorage";

import Dashboard from "~/components/Dasboard/Dashboard";
import Navbar from "~/components/Navbar/Navbar";
import PetAdd from "~/components/PetAdd/PetAdd";
import PetList from "~/components/PetList/PetList";
import Sidebar from "~/components/Sidebar/Sidebar";

const Layout = () => {
  return (
    <div className="flex">
      <div className="flex-[1]"><Sidebar /></div>

      <div className="sticky top-0 flex-[4] ">
        <Navbar />
        <div className=" h-[2000px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default function AdminRouter() {
  // const { currentUser } = useContext(AuthContext);
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/addpet" element={<PetAdd />} />
          <Route path="/pets/:id" element={<AddPetStorage />} />
          <Route path="/pets" element={<PetList />} />
          {/* <Route path="/addstuff" element={<Pets />} /> */}
        </Route>
        <Route
          path="*"
          element={
            <>
              <h1>404 Page not found</h1>
              <Link to="/">Trang chủ</Link>
            </>
          }
        />
      </Routes>
    </>
  );
}
