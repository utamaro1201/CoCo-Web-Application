import { useEffect, useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";
import menuData from "@/menu.json";

const getImage = (folder, fileName) => `/${folder}/${fileName}`;

export const Result_diagnosis = () => {
  const {
    selectedBasecurry,
    selectedTopping,
    setSelectedBasecurry,
    setdiagnosisStep,
    setSelectedRicevol,
    setSelectedSpicylev,
    setSelectedTopping,
    recommendedToppings,
    setRecommendedToppings,
  } = useContext(AppContext);

  const navigate = useNavigate();

  // ✅ 安全対策：データがまだ設定されていない場合
  if (!selectedBasecurry || selectedTopping.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-kimidori text-yellow-900">
        <p className="text-2xl font-bold">おすすめを生成中...</p>
      </div>
    );
  }

  const bases = menuData.base_curry;
  const ricevol = menuData.rice_volume;
  const spicylev = menuData.spicy_level;

  const restartcurryselect = () => {
    setSelectedBasecurry(bases.find((base) => base.name === "ポークカレー"));
    setSelectedRicevol(ricevol.find((rice) => rice.name === "300g"));
    setSelectedSpicylev(spicylev.find((spicy) => spicy.name === "普通"));
    setSelectedTopping([]);
    setRecommendedToppings([]);
  };

  // ✅ おすすめトッピング（1位は除外）
  const recommendedData = recommendedToppings
    .slice(1) // ← 最初の1件（選ばれたトッピング）を除外
    .map((name) => menuData.toppings.find((t) => t.name === name))
    .filter(Boolean); // 存在しないものを除外

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-kimidori text-center">
      <img src="/neko/katu_animetion.gif"
       class="absolute left-[180px] top-[570px] w-[150px]" />
      <img src="/neko/cheeze_animetion.gif"
       class="absolute right-[200px] top-[40px] w-[250px]" />
      <img src="/neko/kusa.svg"
       class="absolute left-[70px] top-[50px] w-[80px]" />
      <img src="/neko/kusa.svg"
       class="absolute right-[70px] top-[230px] w-[80px]" />
      <img src="/neko/flower.svg"
       class="absolute left-[180px] top-[200px] w-[90px]" />
      <h1 className="text-5xl font-bold mt-28 mb-14 text-yellow-800 ">ココイチカレー診断結果</h1>
      <div className="flex justify-center mt-32 ">
      <img
        src="/neko/katu_result.png"
        className="w-[150px] absolute top-[240px] left-1/2 -translate-x-1/2"
      />
        <div className="bg-yellow-100 rounded-3xl shadow-md p-10 w-[1100px] h-auto text-center">
          {/* 見出し */}
          <h1 className="text-5xl font-bold mt-10 mb-8 text-yellow-800">
            ＼ あなたにおすすめのカレー ／
          </h1>

          {/* ベースカレー + トッピング画像 */}
          <div
            className="relative w-[300px] mx-auto mb-20 overflow-visible flex justify-center"
            style={{
              height:
                selectedTopping.length > 0
                  ? `${180 + (selectedTopping.length - 1) * 45}px`
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

            <div
              className="absolute left-1/2 -translate-x-1/2 w-64 transition-all duration-500 z-[20]"
              style={{
                bottom: `60px`,
              }}
            >
              {selectedTopping[0]?.image && (
                <img
                  src={getImage("topping_images", selectedTopping[0].image)}
                  alt={selectedTopping[0].name}
                  className="absolute left-1/2 transform -translate-x-1/2 object-contain w-[120px] h-[120px] rounded-lg transition-all duration-300"
                  style={{
                    bottom: `2px`,
                  }}
                />
              )}
            </div>
          </div>

          {/* 名前表示 */}
          <p className="text-3xl mt-[-60px] mb-[60px] font-bold text-yellow-800">
            {selectedBasecurry.name} ＋ {selectedTopping[0].name}
          </p>

          {/* おすすめトッピング */}
          {recommendedData.length > 0 && (
            <>
              <h2 className="text-2xl mt-8 mb-4 text-yellow-900">
                他にあなたにおすすめのトッピング
              </h2>

              <div className="flex flex-wrap justify-center gap-6 mb-16 p-6 rounded-lg">
                {recommendedData.map((r, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center w-[200px] h-[180px] p-3 rounded-lg border border-gray-300 bg-white"
                  >
                    <img
                      src={getImage("topping_images", r.image)}
                      alt={r.name}
                      className="w-28 h-28 object-contain rounded-lg"
                    />
                    <p className="mt-2 font-bold text-yellow-800 text-center">
                      {r.name}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ボタン群 */}
      <div className="flex gap-8 mt-20 mb-12">
        <button
          onClick={() => {
            setdiagnosisStep(0);
            navigate("/simulater");
          }}
          className="w-[240px] h-[70px] px-8 py-4 bg-yellow-500 font-bold text-yellow-800 text-xl rounded-lg hover:bg-yellow-600 transition"
        >
          シミュレーターで遊ぶ
        </button>
      </div>

      <div className="flex gap-8 mb-32">
        <button
          onClick={() => {
            setdiagnosisStep(0);
            restartcurryselect();
            navigate("/select");
          }}
          className="w-[240px] h-[70px] px-8 py-4 bg-gray-400 text-white text-xl rounded-lg hover:bg-gray-500 transition"
        >
          ホーム画面に戻る
        </button>
        <button
          onClick={() => {
            setdiagnosisStep(0);
            restartcurryselect();
            navigate("/diagnosis/basecurry");
          }}
          className="w-[240px] h-[70px] px-8 py-4 bg-gray-400 text-white text-xl rounded-lg hover:bg-gray-500 transition"
        >
          もう一度遊ぶ
        </button>
      </div>
    </div>
  );
};
