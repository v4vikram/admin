import { Routes, Route } from "react-router-dom";



import DashboardLayout from "../layout/DashboardLayout";

const DashboardRoutes = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={"Home"} />
        <Route path="orders" element={"order"} />
        <Route path="settings" element={"setting"} />
      </Routes>
    </DashboardLayout>
  );
};

export default DashboardRoutes;
