import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import {Select} from "./components/select";
import {Basecurry_diagnosis} from "./components/diagnosis/basecurry_diagnosis";
import {Topping_diagnosis} from "./components/diagnosis/topping_diagnosis";
import {Result_diagnosis} from "./components/diagnosis/result_diagnosis";
import {Basecurry_simulater} from "./components/simulater/basecurry_simulater";
import {Topping_simulater} from "./components/simulater/topping_simulater";
import {Result_simulater} from "./components/simulater/result_simulater";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* ホーム画面 */}
          <Route path="/" element={<Navigate to="/select" replace />} />
          <Route path="/select" element={<Select />} />

          {/* ココイチカレー診断 */}
          <Route path="/diagnosis" element={<Navigate to="/diagnosis/basecurry" replace />} />
          <Route path="/diagnosis/basecurry" element={<Basecurry_diagnosis />} />
          <Route path="/diagnosis/topping" element={<Topping_diagnosis />} />
          <Route path="/diagnosis/result" element={<Result_diagnosis />} />

          {/* ココイチカレーシミュレーター */}
          <Route path="/simulater" element={<Navigate to="/simulater/basecurry" replace />} />
          <Route path="/simulater/basecurry" element={<Basecurry_simulater />} />
          <Route path="/simulater/topping" element={<Topping_simulater />} />
          <Route path="/simulater/result" element={<Result_simulater />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
