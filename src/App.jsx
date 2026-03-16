import { HashRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Index />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
