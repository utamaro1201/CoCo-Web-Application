import { useContext } from "react";
import menuData from "@/menu.json";
import { useNavigate } from "react-router-dom";
import { AppContext } from "@/context/AppContext";

const getImage = (folder, fileName) => `/${folder}/${fileName}`;

export const Result_simulater = () => {
  const navigate = useNavigate();
  const returnTop = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
  };
  const {
    setSelectedBasecurry,
    selectedBasecurry,
    setSelectedRicevol,
    selectedRicevol,
    setSelectedSpicylev,
    selectedSpicylev,
    setSelectedTopping,
    selectedTopping,
  } = useContext(AppContext);

  const bases = menuData.base_curry;
  const ricevol = menuData.rice_volume;
  const spicylev = menuData.spicy_level;

  const restartselect = () => {
    setSelectedBasecurry(bases.find((base) => base.name === "ポークカレー"));
    setSelectedRicevol(ricevol.find((rice) => rice.name === "300g"));
    setSelectedSpicylev(spicylev.find((spicy) => spicy.name === "普通"));
    setSelectedTopping([]);
  };

  const totalPrice =
    (selectedBasecurry?.price || 0) +
    (selectedRicevol?.price || 0) +
    (selectedSpicylev?.price || 0) +
    selectedTopping.reduce((sum, t) => sum + t.price * t.count, 0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 text-gray-800">
      <h1 className="text-5xl font-bold mt-28 mb-8 text-yellow-800">
      ＼ あなたのカレーが完成 ／
      </h1>

      <div
        className="relative w-[300px] mx-auto mb-28 overflow-visible flex justify-center"
        style={{
          height: selectedTopping.length > 0 
            ? `${180 + (selectedTopping.length-1) * 45}px`
            : "250px",
        }}
      >
        {selectedBasecurry && (
          <img
            src={getImage("basecurry_images", selectedBasecurry.image)}
            alt={selectedBasecurry.name}
            className="absolute left-1/2 transform -translate-x-1/2 object-contain w-[260px] h-[160px] rounded-xl z-[10]"
            style={{
              bottom: selectedTopping.length > 0 ? "0px" : "60px", 
            }}
          />
        )}

        {selectedTopping.length > 0 && (
          <div
            className="absolute left-1/2 -translate-x-1/2 w-64 transition-all duration-500 z-[20]"
            style={{
              bottom: `60px`,
            }}
          >
            {selectedTopping.map((topping, index) => (
              <div key={index}>
                <img
                  src={getImage("topping_images", topping.image)}
                  alt={topping.name}
                  className="absolute left-1/2 transform -translate-x-1/2 object-contain w-[120px] h-[120px] rounded-lg transition-all duration-300"
                  style={{
                    bottom: `${index * 45}px`,
                    zIndex: 100 + index,
                  }}
                />
                <span
                  className="absolute text-xl  text-yellow-900 whitespace-nowrap"
                  style={{
                    left: "calc(50% + 200px)", 
                    bottom: `${index * 45 + 40}px`, 
                    zIndex: 100 + index,
                  }}
                >
                  {topping.name}
                  {topping.count > 1 ? ` × ${topping.count}` : ""}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>


      <div className="bg-yellow-400 rounded-3xl shadow-md p-6 w-[1100px] h-auto text-center">
        <div className="bg-transparent rounded-lg p-8 text-left">

          <div className="mt-12 mb-16 flex items-center justify-center">
            <p className="text-xl font-bold text-yellow-800">合計金額</p>
            <span className="text-6xl font-bold text-yellow-900 mt-[-30px] mx-3">
              {totalPrice.toLocaleString()}
            </span>
            <p className="text-xl font-bold text-yellow-800">円</p>
          </div>

          
          <div className="mt-6 border-t pt-4">
            <div className="flex items-stretch py-3">
              <p className="w-[150px] text-2xl font-bold text-yellow-900 mr-32">ベースカレー</p>
              <div className="border-l-2 border-yellow-900 mr-8"></div>
              <span className="text-2xl font-bold text-yellow-900">
                {selectedBasecurry ? selectedBasecurry.name : "ー"}
              </span>
            </div>
          </div>

          
          <div className="mt-6 border-t pt-4">
            <div className="flex items-stretch py-3">
              <p className="w-[150px] text-2xl font-bold text-yellow-900 mr-32">ライスの量</p>
              <div className="border-l-2 border-yellow-900 mr-8"></div>
              <span className="text-2xl font-bold text-yellow-900">
                {selectedRicevol ? selectedRicevol.name : "ー"}
              </span>
            </div>
          </div>

          
          <div className="mt-6 border-t pt-4">
            <div className="flex items-stretch py-3">
              <p className="w-[150px] text-2xl font-bold text-yellow-900 mr-32">辛さ</p>
              <div className="border-l-2 border-yellow-900 mr-8"></div>
              <span className="text-2xl font-bold text-yellow-900">
                {selectedSpicylev ? selectedSpicylev.name : "ー"}
              </span>
            </div>
          </div>

          
          <div className="mt-6 border-t pt-4">
            <div className="flex items-stretch py-3">
              <p className="w-[150px] text-2xl font-bold text-yellow-900 mr-32 whitespace-nowrap">
                トッピング
              </p>
              <div className="border-l-2 border-yellow-900 mr-8"></div>

              <div className="flex-1 flex flex-wrap items-center text-2xl font-bold text-yellow-900 break-words">
                {selectedTopping?.length ? (
                  selectedTopping.map((topping, index) => (
                    <span key={index}>
                      {topping.name} × {topping.count}
                      {index < selectedTopping.length - 1 && "、 "}
                    </span>
                  ))
                ) : (
                  <span>ー</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="flex gap-8 mt-20 mb-12">
        <button
          onClick={() => {
            navigate("/diagnosis");
            restartselect();
          }}
          className="w-[280px] h-[70px] px-8 py-4 bg-yellow-500 font-bold text-yellow-800 text-xl rounded-lg hover:bg-yellow-600 transition"
        >
          ココイチカレー診断であそぶ
        </button>
      </div>
      <div className="flex gap-8  mb-32">
        <button
          onClick={() => {
            navigate("/select");
            restartselect();
          }}
          className="w-[240px] h-[70px] px-8 py-4 bg-gray-400 text-white text-xl rounded-lg hover:bg-gray-500 transition"
        >
          ホーム画面に戻る
        </button>
        <button
          onClick={() => {
            navigate("/simulater/topping");
            returnTop();
          }}
          className="w-[240px] h-[70px] px-8 py-4 bg-gray-400 text-white text-xl rounded-lg hover:bg-gray-500 transition"
        >
          トッピング選択に戻る
        </button>
      </div>
    </div>
  );
};
