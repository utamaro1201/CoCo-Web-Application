import { createContext, useState } from "react";
import menuData from "@/menu.json";

export const AppContext = createContext();



export const AppProvider = ({ children }) => {
  const bases = menuData.base_curry;
  const ricevol = menuData.rice_volume;
  const spicylev = menuData.spicy_level;

  /*初期値　ポーク　300g　普通*/
  const initialBase = bases.find(base => base.name === "ポークカレー");
  const initialRice = ricevol.find(rice => rice.name === "300g");
  const initialSpicy = spicylev.find(spicy => spicy.name === "普通");

  /*初期化*/
  const [selectedBasecurry, setSelectedBasecurry] = useState(initialBase);
  const [selectedTopping, setSelectedTopping] = useState([]);
  const [selectedRicevol, setSelectedRicevol] = useState(initialRice);
  const [selectedSpicylev, setSelectedSpicylev] = useState(initialSpicy);
  const [totalPrice, setTotalPrice] = useState((initialBase?.price || 0) + (initialRice?.price || 0) + (initialSpicy?.price || 0));
  const [diagnosisStep, setdiagnosisStep] = useState(0); 
  const [diagnosisAnswers, setdiagnosisAnswers] = useState([]); 
  const [recommendedToppings, setRecommendedToppings] = useState([]);

  return (
    <AppContext.Provider value={{ selectedBasecurry, setSelectedBasecurry, selectedTopping, 
    setSelectedTopping, totalPrice, setTotalPrice,selectedRicevol, setSelectedRicevol,
    selectedSpicylev, setSelectedSpicylev, diagnosisStep, setdiagnosisStep,
    diagnosisAnswers, setdiagnosisAnswers, recommendedToppings, setRecommendedToppings}}>
      {children}
    </AppContext.Provider>
  );
};
