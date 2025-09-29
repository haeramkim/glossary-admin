import { Routes, Route } from "react-router";
import App from "./App";
import AlarmMessage from "./pages/alarm-message/AlarmMessage";

const Router = () => {
  return (
    <Routes>
      <Route index element={<App />} />
      <Route path="alarm-message" element={<AlarmMessage />} />
    </Routes>
  );
};

export default Router;
