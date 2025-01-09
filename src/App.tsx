import React from "react";
import ShareImage from "./components/ShareImage.tsx";
import ShareButton from "./components/ShareButton.tsx";
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { Home } from "./components/Home.tsx";

const App = () => {
  const imageUrl = [
    "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
  ]

  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path='' element={<Home />} />
          <Route path='share-single-image' element={<ShareImage imageUrl={imageUrl} />} />
          <Route path='share-multiple-image' element={< ShareButton text="Check out these images!" files={imageUrl}
          />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
};

export default App;
