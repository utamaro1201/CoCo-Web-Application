import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import menuData from "@/menu.json";
import { AppContext } from "@/context/AppContext";

export const Topping_diagnosis = () => {
  const {
    setSelectedTopping,
    diagnosisStep,
    setdiagnosisStep,
    setRecommendedToppings,
  } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (diagnosisStep < 3) {
      setdiagnosisStep(3);
    }
  }, [diagnosisStep, setdiagnosisStep]);

  const [scores, setScores] = useState({
    ロースカツ : 0,
    チキンカツ : 0,
    手仕込とんかつ : 0,
    メンチカツ : 0,
    パリパリチキン : 0,
    "ソーセージ（２本）" : 0,
    "ハンバーグ（１個）" : 0,
    "フライドチキン（３個）" : 0,
    チキンにこみ : 0,
    ハーフ豚しゃぶ : 0,
    "フィッシュフライ（１本）" : 0,
    ハーフイカ : 0,
    海の幸 : 0,
    エビあさり : 0,
    ハーフあさり : 0,
    ハーフエビにこみ : 0,
    "なす（３本）" : 0,
    ハーフほうれん草 : 0,
    ハーフやさい : 0,
    ハーフチーズ : 0,
    "クリームコロッケ（１個）" : 0,
    "とろ～りたまフライ" : 0,
    ハーフスクランブルエッグ : 0,
    納豆 : 0,
    ハーフきのこ : 0,
    タルタルソース : 0,
    コーン : 0,
    単品ポテト : 0,
    半熟タマゴ : 0,
    ゆでタマゴ : 0,
    ツナ : 0,
    旨辛にんにく : 0
  });

  const questions = [
    {
      q: "揚げ物が好き？",
      yes: { ロースカツ: 3, チキンカツ: 2, 手仕込とんかつ: 2, メンチカツ: 2, "フライドチキン（３個）": 2 },
      no: { ほうれん草: 2, "なす（３本）": 2, ハーフやさい: 2 },
    },
    {
      q: "ボリュームのあるカレーが食べたい？",
      yes: { ロースカツ: 2, "ハンバーグ（１個）": 3, パリパリチキン: 2, "ソーセージ（２本）": 2, チキンカツ: 2 },
      no: { ハーフやさい: 2, ハーフきのこ: 1, ハーフほうれん草: 2 },
    },
    {
      q: "海鮮系のトッピングが好き？",
      yes: { エビあさり: 3, ハーフイカ: 2, ハーフあさり: 2, ハーフエビにこみ: 2, 海の幸: 3 },
      no: { ロースカツ: 1, チキンカツ: 1 },
    },
    {
      q: "まろやかな味が好き？",
      yes: { ハーフチーズ: 3, 半熟タマゴ: 2, ゆでタマゴ: 2, ハーフスクランブルエッグ: 2, "クリームコロッケ（１個）": 2 },
      no: { 旨辛にんにく: 2, チキンカツ: 1 },
    },
    {
      q: "ヘルシーなカレーにしたい？",
      yes: { ベジカレー: 2, ハーフほうれん草: 3, ハーフやさい: 3, "なす（３本）": 2, ハーフきのこ: 2, コーン: 1 },
      no: { ロースカツ: 1, "ハンバーグ（１個）": 1 },
    },
    {
      q: "たまごトッピングが好き？",
      yes: { 半熟タマゴ: 3, ゆでタマゴ: 3, "とろ～りたまフライ": 2, ハーフスクランブルエッグ: 2 },
      no: { チキンカツ: 1, メンチカツ: 1 },
    },
    {
      q: "チーズ系のトッピングが好き？",
      yes: { ハーフチーズ: 4, "クリームコロッケ（１個）": 2, タルタルソース: 1 },
      no: { 旨辛にんにく: 2, 納豆: 1 },
    },
    {
      q: "洋食っぽいトッピングが好き？",
      yes: { "クリームコロッケ（１個）": 3, "ハンバーグ（１個）": 3, 単品ポテト: 2, タルタルソース: 2 },
      no: { 納豆: 2, ツナ: 1 },
    },
    {
      q: "和風っぽい味が好き？",
      yes: { 納豆: 3, ツナ: 2, ハーフきのこ: 2, 旨辛にんにく: 2 },
      no: { ハーフチーズ: 1, "クリームコロッケ（１個）": 1 },
    },
    {
      q: "トッピングを多めにのせたい？",
      yes: { ハーフやさい: 2, ハーフイカ: 1, ハーフエビにこみ: 1, ハーフきのこ: 1, ハーフチーズ: 1 },
      no: { ロースカツ: 2, "ハンバーグ（１個）": 2 },
    },
  ];
  

  const [localStep, setLocalStep] = useState(0);

  const handleAnswer = (answer) => {
    const current = questions[localStep][answer];
    const newScores = { ...scores };
    for (const key in current) {
      newScores[key] += current[key];
    }
    setScores(newScores);

    if (localStep < questions.length - 1) {
      setLocalStep((prev) => prev + 1);
      setdiagnosisStep((prev) => prev + 1);
    } else {
      // 結果処理
      const sorted = Object.entries(newScores).sort((a, b) => b[1] - a[1]); // 降順
      const top5 = sorted.slice(0, 5).map(([name]) => name); // 名前だけ上位5件
      const best = top5[0];

      // menuData から該当データを取得
      const chosen = menuData.toppings.find((t) => t.name === best);
      setSelectedTopping([{ ...chosen, count: 1 }]);
      setRecommendedToppings(top5); // 5件まとめて保存
      navigate("/diagnosis/result");
    }
  };

  if (!questions[localStep]) return null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-kimidori">
      {/*<img src="/neko/hourensou_animetion.gif"
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
       class="absolute right-[50px] top-[650px] w-[150px]" />*/ }
      <img src="/neko/image.png"
       class="absolute left-[150px] top-[350px] w-[150px]" />
      <img src="/neko/image.png"
       class="absolute right-[220px] top-[85px] w-[150px]" />
      <img src="/neko/image.png"
       class="absolute right-[100px] top-[500px] w-[250px]" />
      <img src="/neko/image.png"
       class="absolute left-[180px] top-[630px] w-[200px]" />
      <img src="/neko/image.png"
       class="absolute right-[70px] top-[80px] w-[150px]" />
      <img src="/neko/image.png"
       class="absolute left-[50px] top-[470px] w-[90px]" />
      <img src="/neko/image.png"
       class="absolute right-[50px] top-[350px] w-[90px]" />
      <img src="/neko/image.png"
       class="absolute left-[300px] top-[60px] w-[70px]" />
      <img src="/neko/image.png"
       class="absolute left-[70px] top-[50px] w-[80px]" />
      <img src="/neko/image.png"
       class="absolute right-[250px] top-[800px] w-[80px]" />
      <img src="/neko/image.png"
       class="absolute right-[300px] top-[380px] w-[80px]" />
      <img src="/neko/image.png"
       class="absolute left-[120px] top-[200px] w-[70px]" />
      <img src="/neko/image.png"
       class="absolute right-[50px] top-[650px] w-[150px]" />
      <h1 className="text-5xl font-bold mt-28 mb-14 text-yellow-800">ココイチカレー診断</h1>
      <h1 className="text-4xl font-bold mt-14 mb-32 text-yellow-800">【STEP 2】　 あなたにおすすめのトッピングを診断します</h1>
      <h1 className="text-4xl font-bold mt-8 mb-12 text-yellow-800">＼ 質問に答えよう！／</h1>
      <div class="relative inline-block">
      <img src="/neko/hukidasi.png" alt="" class="w-[500px] h-[200px]" />
        <span class="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-yellow-800">
          第{diagnosisStep + 2}問
        </span>
        <span class="absolute top-[45%] left-1/2 -translate-x-1/2 text-3xl text-yellow-800 font-bold text-center whitespace-nowrap">
          {questions[localStep].q}
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
