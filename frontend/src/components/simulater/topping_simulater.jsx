import { useContext } from "react";
import menuData from "@/menu.json";
import { useNavigate } from "react-router-dom";
import { AppContext } from "@/context/AppContext";


const getImage = (folder, fileName) => `/${folder}/${fileName}`;

export const Topping_simulater = () => {
  const navigate = useNavigate();
  const all_toppings = menuData.toppings;

  const { selectedTopping, setSelectedTopping, recommendedToppings } = useContext(AppContext);

  const recommended_toppings = recommendedToppings
  .map(name => all_toppings.find(t => t.name === name)).filter(Boolean); 
  const rank_toppings = all_toppings.filter(item =>
    ["ハーフチーズ", "ハーフ豚しゃぶ", "ロースカツ", "パリパリチキン", "海の幸"].includes(item.name)
  );
  const meat_toppings = all_toppings.slice(0, 10);
  const fish_toppings = all_toppings.slice(10, 16);
  const vage_toppings = all_toppings.slice(16, 19);
  const other_toppings = all_toppings.slice(19, 32);


  const addTopping = (topping) => {
    setSelectedTopping((prev) => {
      const existing = prev.find((t) => t.name === topping.name);
      if (existing) {
        return prev.map((t) =>
          t.name === topping.name ? { ...t, count: t.count + 1 } : t
        );
      } else {
        return [...prev, { ...topping, count: 1 }];
      }
    });
  };

  
  const removeTopping = (topping) => {
    setSelectedTopping((prev) => {
      const existing = prev.find((t) => t.name === topping.name);
      if (!existing) return prev;
      if (existing.count <= 1) {
        return prev.filter((t) => t.name !== topping.name);
      } else {
        return prev.map((t) =>
          t.name === topping.name ? { ...t, count: t.count - 1 } : t
        );
      }
    });
  };


  const restarttoppingselect = () => {
    setSelectedTopping([]);
  };


  const returnTop = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const resetreturnTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  const renderToppingSection = (title, toppings) => (
    <>
      <h2 className="self-start text-4xl font-bold mt-32 mb-20 ml-[80px] text-yellow-800">{title}</h2>
      <div className="flex self-start flex-wrap gap-6 mb-8 ml-[80px]">
        {toppings.map((topping, index) => {
          const selected = selectedTopping.find((t) => t.name === topping.name);
          const count = selected ? selected.count : 0;

          return (
            <div
              key={index}
              onClick={() => {
                if (count === 0) addTopping(topping);
              }}
              className={`relative flex flex-col items-center p-3 rounded-lg border transition w-[200px] h-[220px] cursor-pointer ${
                count > 0
                  ? "bg-yellow-500 text-white border-yellow-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              <img
                src={getImage("topping_images", topping.image)}
                alt={topping.name}
                className="w-36 h-28 object-contain mb-2 rounded-lg"
              />
              <span className="font-bold text-m mt-2 text-yellow-800">{topping.name}</span>
              <span className="text-sm mt-1 text-yellow-800">{topping.price}円</span>

              {count > 0 && (
                <div
                  className="flex items-center justify-center gap-3 mt-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => removeTopping(topping)}
                    className="w-8 h-8 bg-gray-300 text-black rounded-full hover:bg-gray-400 transition"
                  >
                    －
                  </button>
                  <span className="text-lg font-bold w-6 text-center text-yellow-800">
                    {count}
                  </span>
                  <button
                    onClick={() => addTopping(topping)}
                    className="w-8 h-8 bg-yellow-400 text-white rounded-full hover:bg-yellow-500 transition"
                  >
                    ＋
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 text-gray-800 p-4">
      <h1 className="text-5xl font-bold mt-16 mb-20 text-yellow-800"> トッピングを選ぶ</h1>

      {recommended_toppings.length > 0 && 
        renderToppingSection("あなたにおすすめのトッピング", recommended_toppings)
      }
      {renderToppingSection("人気のトッピング", rank_toppings)}
      {renderToppingSection("肉類のトッピング", meat_toppings)}
      {renderToppingSection("魚介類のトッピング", fish_toppings)}
      {renderToppingSection("野菜類のトッピング", vage_toppings)}
      {renderToppingSection("その他のトッピング", other_toppings)}

      <div className="flex gap-8 mt-20 mb-12">
        <button
          onClick={() => {
            navigate("/simulater/result");
            returnTop();
          }}
          className="w-[200px] h-[70px] px-8 py-4 bg-yellow-500 font-bold text-yellow-800 text-xl rounded-lg hover:bg-yellow-600 transition"
        >
          結果表示
        </button>
      </div>

      <div className="flex gap-8 mb-32">
      <button
          onClick={() => {
            navigate("/simulater/basecurry");
            returnTop();
          }}
          className="w-[220px] h-[70px] px-8 py-4 bg-gray-400 text-white text-xl rounded-lg hover:bg-gray-500 transition"
        >
          カレー選択に戻る
        </button>

        <button
          onClick={() => {
            restarttoppingselect();
            resetreturnTop();
          }}
          className="w-[220px] h-[70px] px-8 py-4 bg-gray-400 text-white text-xl rounded-lg hover:bg-gray-500 transition"
        >
          トッピングをリセット
        </button>

      </div>
    </div>
  );
};
