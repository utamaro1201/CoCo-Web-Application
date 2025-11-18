import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import menuData from "@/menu.json";
import { AppContext } from "@/context/AppContext";

export const Basecurry_diagnosis = () => {
  const { setSelectedBasecurry, diagnosisStep, setdiagnosisStep } = useContext(AppContext);
  const [scores, setScores] = useState({
    ポークカレー: 0,
    甘口ポークカレー: 0,
    ビーフカレー: 0,
    ハヤシライス: 0,
    ベジカレー: 0,
    カレーうどん: 0,
    カレーラーメン: 0,
    チャーシューカレーラーメン: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    setdiagnosisStep(0);
  }, [setdiagnosisStep]);

  const questions = [
      {
        q: "お肉系のカレーが好き？",
        yes: { ポークカレー: 2, ビーフカレー: 2, ハヤシライス: 2 },
        no: { ベジカレー: 2 },
      },
      {
        q: "普通とはちょっと違うカレーが好き？",
        yes: { ベジカレー: 2, ビーフカレー: 2, ハヤシライス: 2 },
        no: { ポークカレー: 6, 甘口ポークカレー:6},
      },
      {
        q: "甘いカレーが好き？",
        yes: { 甘口ポークカレー: 4, ハヤシライス: 3, ベジカレー: 3 },
        no: { ポークカレー: 3, ビーフカレー: 3, カレーラーメン: 1, チャーシューカレーラーメン: 1, カレーうどん: 1 },
      },
      {
        q: "カレーよりもカレー味の麺類が好き？",
        yes: { カレーラーメン: 20, チャーシューカレーラーメン: 20, カレーうどん: 20 },
        no: {ポークカレー: 0},
      },
      {
        q: "まろやかで優しい味が好き？",
        yes: { 甘口ポークカレー: 4, カレーうどん: 2, ハヤシライス: 2 },
        no: { ビーフカレー: 2, ポークカレー: 2 },
      },
      {
        q: "健康に気を遣っている？",
        yes: { ベジカレー: 5},
        no: { ポークカレー: 1, ビーフカレー: 1, 甘口ポークカレー:1, ハヤシライス:1, カレーラーメン: 1, チャーシューカレーラーメン: 1, カレーうどん: 1 },
      },
      {
        q: "濃厚でコクのある味が好き？",
        yes: { ビーフカレー: 4, ハヤシライス: 3, チャーシューカレーラーメン: 1, カレーラーメン: 1 },
        no: { ベジカレー: 2, 甘口ポークカレー: 2, ポークカレー: 2, },
      },
      {
        q: "和風だしの風味が好き？",
        yes: { カレーうどん: 4, ベジカレー: 1 },
        no: { カレーラーメン: 2, ビーフカレー: 1 },
      },
      {
        q: "ボリューム感のある食事がしたい？",
        yes: { ビーフカレー: 3, チャーシューカレーラーメン: 2, ポークカレー: 3 },
        no: { ベジカレー: 2, カレーうどん: 1 },
      },
    ];
    

  const handleAnswer = (answer) => {
    const current = questions[diagnosisStep][answer];

    // ✅ スコア加算
    const newScores = { ...scores };
    for (const key in current) {
      newScores[key] += current[key];
    }
    setScores(newScores);

    if (diagnosisStep < questions.length - 1) {
      setdiagnosisStep((prev) => prev + 1);
    } else {
      // ✅ スコア最大のカレーを決定
      const best = Object.entries(newScores).reduce((a, b) =>
        a[1] > b[1] ? a : b
      )[0];

      const chosen = menuData.base_curry.find((b) => b.name === best);
      setSelectedBasecurry(chosen);
      navigate("/diagnosis/topping");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-kimidori">
      <img src="/neko/hourensou_animetion.gif"
       class="absolute left-[150px] top-[350px] w-[150px]" />
      <img src="/neko/ika_animetion.gif"
       class="absolute right-[220px] top-[85px] w-[150px]" />
      <img src="/neko/yasai_animetion.gif"
       class="absolute right-[100px] top-[500px] w-[250px]" />
      <img src="/neko/paripari.png"
       class="absolute left-[180px] top-[630px] w-[200px]" />
      <img src="/neko/cocoichi.svg"
       class="absolute right-[70px] top-[80px] w-[150px]" />
      <img src="/neko/flower_2.svg"
       class="absolute left-[50px] top-[470px] w-[90px]" />
      <img src="/neko/flower.svg"
       class="absolute right-[50px] top-[350px] w-[90px]" />
      <img src="/neko/horenso.svg"
       class="absolute left-[300px] top-[60px] w-[70px]" />
      <img src="/neko/kusa.svg"
       class="absolute left-[70px] top-[50px] w-[80px]" />
      <img src="/neko/kusa.svg"
       class="absolute right-[250px] top-[800px] w-[80px]" />
      <img src="/neko/kusa.svg"
       class="absolute right-[300px] top-[380px] w-[80px]" />
      <img src="/neko/tamamegi.svg"
       class="absolute left-[120px] top-[200px] w-[70px]" />
      <img src="/neko/tree.svg"
       class="absolute right-[50px] top-[650px] w-[150px]" />
      <h1 className="text-5xl font-bold mt-28 mb-14 text-yellow-800">ココイチカレー診断</h1>
      <h1 className="text-4xl font-bold mt-14 mb-32 text-yellow-800">【STEP 1】　あなたにおすすめのベースカレーを診断します</h1>
      <h1 className="text-4xl font-bold mt-8 mb-12 text-yellow-800">＼ 質問に答えよう！／</h1>
      <div class="relative inline-block">
      <img src="/neko/hukidasi.png" alt="" class="w-[500px] h-[200px]" />
        <span class="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-yellow-800">
          第{diagnosisStep + 1}問
        </span>
        <span class="absolute top-[45%] left-1/2 -translate-x-1/2 text-3xl text-yellow-800 font-bold text-center whitespace-nowrap">
        {questions[diagnosisStep].q}
        </span>
      </div>
      <div className="flex gap-8 mb-14">
        <button
          onClick={() => handleAnswer("yes")}
          className="bg-yellow-400 px-8 py-4 mb-14 rounded-lg font-bold"
        >
          はい
        </button>
        <button
          onClick={() => handleAnswer("no")}
          className="bg-gray-300 px-8 py-4 mb-14 rounded-lg font-bold"
        >
          いいえ
        </button>
      </div>
    </div>
  );
};
