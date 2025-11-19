import { useState, useContext } from "react";
import menuData from "@/menu.json";
import { useNavigate } from "react-router-dom";
import { AppContext } from "@/context/AppContext";
import { useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const getImage = (folder, fileName) => `/${folder}/${fileName}`;

export const Basecurry_simulater = () => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const bases = menuData.base_curry;
  const { selectedBasecurry, setSelectedBasecurry } = useContext(AppContext);
  const selectedIndex = bases.findIndex(
    (b) => b.name === selectedBasecurry?.name
  );

  const toggleBasecurry = (base) => {
    setSelectedBasecurry((prev) => {
      if (prev && prev.name === base.name) return prev;
      return base;
    });
  
    
    if (
      base.name === "カレーうどん" ||
      base.name === "カレーラーメン" ||
      base.name === "チャーシューカレーラーメン"
    ) {
      setSelectedRicevol(null);
    }
  
    
    if (selectedSpicylev?.name === "普通" && base.name === "甘口ポークカレー") {
      
      setSelectedSpicylev(spicylev.find((spicy) => spicy.name === "甘口"));
    } else if (
      selectedSpicylev?.name === "甘口" &&
      base.name !== "甘口ポークカレー" &&
      base.name !== "ポークカレー" &&
      base.name !== "カレーうどん" 
    ) {
      
      setSelectedSpicylev(spicylev.find((spicy) => spicy.name === "普通"));
    }
  };
  

  const ricevol = menuData.rice_volume;
  const { selectedRicevol, setSelectedRicevol } = useContext(AppContext);

  const toggleRicevol = (rice) => {
    setSelectedRicevol((prev) => {
      if (prev && prev.name === rice.name) return prev;
      return rice;
    });
  };

  const spicylev = menuData.spicy_level;
  const { selectedSpicylev, setSelectedSpicylev } = useContext(AppContext);

  const toggleSpicylev = (spicy) => {
    setSelectedSpicylev((prev) => {
      if (prev && prev.name === spicy.name) return prev;
      return spicy;
    });
  };

  const PrevArrow = ({ onClick, currentSlide }) => (
    <button
      onClick={currentSlide === 0 ? null : onClick}
      className={`absolute left-[-45px] top-1/2 transform -translate-y-1/2 text-4xl z-10 ${
        currentSlide === 0
          ? "opacity-30 cursor-not-allowed"
          : "text-yellow-600 hover:text-yellow-700"
      }`}
    >
      ◀
    </button>
  );

  const NextArrow = ({ onClick, currentSlide, slideCount }) => (
    <button
      onClick={currentSlide >= slideCount - 3 ? null : onClick}
      className={`absolute right-[-50px] top-1/2 transform -translate-y-1/2 text-4xl z-10 ${
        currentSlide >= slideCount - 3
          ? "opacity-30 cursor-not-allowed"
          : "text-yellow-600 hover:text-yellow-700"
      }`}
    >
      ▶
    </button>
  );

  const currysettings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2.7,
    slidesToScroll: 2,
    autoplay: false,
    autoplaySpeed: 2500,
    centerMode: false,
    variableWidth: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    beforeChange: (_, next) => {
      const dots = document.querySelectorAll(".slick-dots li");
      dots.forEach((dot, i, arr) => {
        if (next >= bases.length - 3 && i === arr.length - 1) {
          dot.classList.add("slick-active");
        } else if (next < bases.length - 3 && i === arr.length - 1) {
          dot.classList.remove("slick-active");
        }
      });
    },
  };



useEffect(() => {
  if (!sliderRef.current || selectedIndex < 0) return;


  const groupIndex = Math.floor(selectedIndex / 2) * 2;

  
  sliderRef.current.slickGoTo(groupIndex);

  const dots = document.querySelectorAll(".slick-dots li");
  dots.forEach((dot) => dot.classList.remove("slick-active"));
  const activeDotIndex = Math.floor(selectedIndex / 2);
  if (dots[activeDotIndex]) dots[activeDotIndex].classList.add("slick-active");
}, [selectedIndex]);


  const restartcurryselect = () => {
    setSelectedBasecurry(bases.find((base) => base.name === "ポークカレー"));
    setSelectedRicevol(ricevol.find((rice) => rice.name === "300g"));
    setSelectedSpicylev(spicylev.find((spicy) => spicy.name === "普通"));
  };

  const returnTop = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const resetreturnTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!selectedBasecurry) return;
  
    // ポークカレーのときは何もしない
    if (selectedBasecurry.name === "ポークカレー") return;
  
    const rice300 = menuData.rice_volume.find((r) => r.name === "300g");
    const spicyNormal = menuData.spicy_level.find((s) => s.name === "普通");
    const spicyMild = menuData.spicy_level.find((s) => s.name === "甘口");
  
    //麺類ならライスをnull・辛さは普通
    if (
      ["カレーうどん", "カレーラーメン", "チャーシューカレーラーメン"].includes(
        selectedBasecurry.name
      )
    ) {
      setSelectedRicevol(null);
      setSelectedSpicylev(spicyNormal);
      return;
    }
  
    //甘口ポークカレーならライス300g・辛さ甘口
    if (selectedBasecurry.name === "甘口ポークカレー") {
      setSelectedRicevol(rice300);
      setSelectedSpicylev(spicyMild);
      return;
    }
  
    //それ以外はライス300g・辛さ普通
    setSelectedRicevol(rice300);
    setSelectedSpicylev(spicyNormal);
  }, []);

  //麺系 → 麺系以外 に変わったとき、ライスを300gに戻す
useEffect(() => {
  if (!selectedBasecurry) return;

  const rice300 = menuData.rice_volume.find((r) => r.name === "300g");

  //麺系かどうか
  const isNoodle = ["カレーうどん", "カレーラーメン", "チャーシューカレーラーメン"].includes(
    selectedBasecurry.name
  );

  // 前回が麺系で、今回は麺系ではない ライスを300gに戻す
  if (Basecurry_simulater.prevIsNoodle && !isNoodle) {
    setSelectedRicevol(rice300);
  }

  // 今回の状態を次回比較用に記録
  Basecurry_simulater.prevIsNoodle = isNoodle;
}, [selectedBasecurry]);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 text-gray-800 p-4">
      <h1 className="text-5xl font-bold mt-16 mb-20 text-yellow-800">
        ベースのカレーを選ぶ
      </h1>

      <div className="w-full max-w-5xl relative">
        <Slider ref={sliderRef} {...currysettings}>
          {bases.map((base, index) => (
            <div key={index} className="px-3 flex justify-center items-center h-full">
              <button
                onClick={() => toggleBasecurry(base)}
                disabled={selectedBasecurry?.name === base.name}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border transition w-80 h-80 shadow ${
                  selectedBasecurry?.name === base.name
                    ? "bg-yellow-500 text-white border-yellow-700 cursor-not-allowed "
                    : "bg-white text-gray-700 border-gray-300 hover:bg-yellow-100"
                }`}
              >
                <img
                  src={getImage("basecurry_images", base.image)}
                  alt={base.name}
                  className="w-56 h-56 object-contain mb-2 rounded-lg"
                />
                <span className="text-3xl font-bold text-yellow-900">{base.name}</span>
                <span className="text-2xl mt-1 font-bold text-yellow-900">{base.price}円</span>
              </button>
            </div>
          ))}
        </Slider>
      </div>

      <h1 className="text-5xl font-bold mt-32 mb-20 text-yellow-800">ライスの量を選ぶ</h1>
      <div className="flex justify-start flex-wrap gap-4 mb-8">
        {ricevol
          .slice(
            selectedBasecurry?.name === "ビーフカレー" ||
              selectedBasecurry?.name === "ハヤシライス"
              ? 0
              : 11,
            selectedBasecurry?.name === "ビーフカレー" ||
              selectedBasecurry?.name === "ハヤシライス"
              ? 11
              : 22
          )
          .map((rice, index) => (
            <button
              key={index}
              onClick={() => toggleRicevol(rice)}
              disabled={selectedRicevol?.name === rice.name}
              className={`flex flex-col items-center p-3 rounded-lg border transition w-22 h-28
                ${selectedBasecurry?.name === "カレーうどん" ||
                selectedBasecurry?.name === "カレーラーメン" ||
                selectedBasecurry?.name === "チャーシューカレーラーメン"
                  ? "opacity-30 cursor-not-allowed pointer-events-none"
                  : ""}
                ${selectedRicevol?.name === rice.name
                  ? "bg-yellow-500 text-white border-yellow-700 cursor-not-allowed "
                  : "bg-white text-gray-700 border-gray-300 hover:bg-yellow-100"}
              `}
            >
              <span className="text-xl font-bold text-yellow-900">{rice.name}</span>
              <img
                src={getImage("rice_images", rice.image)}
                alt={rice.name}
                className="w-14 h-14 object-cover mb-2 rounded-lg"
              />
              <span className="text-sm !text-black">
                {rice.price < 0 && -rice.price}
                {rice.price === 0 && "基本価格"}
                {rice.price > 0 && rice.price}
                {rice.price > 0 && "円増"}
                {rice.price < 0 && "円引き"}
              </span>
            </button>
          ))}
      </div>

      <h1 className="text-5xl font-bold mt-28 mb-28 text-yellow-800">辛さを選ぶ</h1>
      <div className="flex justify-center flex-wrap gap-4 mb-8">
        {spicylev.map((spicy, index) => (
          <button
            key={index}
            onClick={() => toggleSpicylev(spicy)}
            disabled={selectedSpicylev?.name === spicy.name}
            className={`relative flex flex-row items-start p-3 rounded-lg border transition w-[1100px] h-[100px]
              ${(selectedBasecurry?.name !== "甘口ポークカレー" &&
                selectedBasecurry?.name !== "ポークカレー" && selectedBasecurry?.name !== "カレーうどん" ) &&
              spicy.name == "甘口"
                ? "opacity-30 cursor-not-allowed pointer-events-none"
                : ""}
              ${selectedBasecurry?.name == "甘口ポークカレー" && spicy.name == "普通"
                ? "opacity-30 cursor-not-allowed pointer-events-none"
                : ""}
              ${selectedSpicylev?.name === spicy.name
                ? "bg-yellow-500 text-white border-yellow-700 cursor-not-allowed "
                : "bg-white text-gray-700 border-gray-300 hover:bg-yellow-100"}
            `}
          >
            <span className="text-2xl font-bold text-yellow-900 p-3 mt-2 translate-x-10 whitespace-nowrap">
              {spicy.name}
            </span>
            <span
              className="text-xl mt-[22px] absolute !text-black"
              style={{ left: "250px" }}
            >
              {spicy.price === 0 && "基本価格"}
              {spicy.price > 0 && spicy.price}
              {spicy.price > 0 && "円増"}
            </span>
            {spicy.name !== "普通" && spicy.name !== "甘口" && (
              <img
                src={getImage("spicy_images", spicy.image)}
                alt={spicy.name}
                style={{ left: "330px" }}
                className={`absolute object-contain object-left ml-10 mt-4
                  ${
                    spicy.name === "15辛" || spicy.name === "20辛"
                      ? "w-[65%] h-[65%] -translate-y-[10px]"
                      : "w-[40%] h-[40%]"
                  }
                `}
              />
            )}
            <span
              className="text-5xl mt-[12px] absolute text-yellow-900 "
              style={{ left: "850px" }}
            >
              ｜
            </span>
            <span
              className="text-xl mt-[22px] absolute text-yellow-900 "
              style={{ left: "900px" }}
            >
              {spicy.explain}
            </span>
          </button>
        ))}
      </div>

      <div className="flex gap-8 mt-20 mb-12">
        <button
          onClick={() => {
            navigate("/simulater/topping");
            returnTop();
          }}
          className="w-[220px] h-[70px] px-8 py-4 bg-yellow-500 font-bold text-yellow-800 text-xl rounded-lg hover:bg-yellow-600 transition"
        >
          トッピングを選ぶ
        </button>
      </div>

      <div className="flex gap-8 mb-32">
        <button
          onClick={() => {
            restartcurryselect();
            navigate("/select");
          }}
          className="w-[220px] h-[70px] px-8 py-4 bg-gray-400 text-white text-xl rounded-lg hover:bg-gray-500 transition"
        >
          ホーム画面に戻る
        </button>

        <button
          onClick={() => {
            restartcurryselect();
            resetreturnTop();
          }}
          className="w-[220px] h-[70px] px-8 py-4 bg-gray-400 text-white text-xl rounded-lg hover:bg-gray-500 transition"
        >
          リセットする
        </button>
      </div>
    </div>
  );
};
