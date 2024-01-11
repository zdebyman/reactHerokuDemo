import { Route, Routes } from "react-router-dom";

import GratitudesList from "../features/gratitudes/GratitudesList";
import GratitudeDetails from "../features/gratitudes/GratitudeDetails";
import NewGratitudeForm from "../features/gratitudes/NewGratitudeForm";
import GratitudeEditForm from "../features/gratitudes/GratitudeEditForm";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<GratitudesList />} />
      <Route path="gratitudes/:id" element={<GratitudeDetails />} />
      <Route path="/new" element={<NewGratitudeForm />} />
      <Route path="gratitudes/:id/edit" element={<GratitudeEditForm />} />
    </Routes>
  );
}

export default AppRoutes;