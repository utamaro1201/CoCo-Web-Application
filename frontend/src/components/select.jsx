import React from 'react';
import { useNavigate } from "react-router-dom";



export const Select = () => {
  const navigate = useNavigate();

  return (
    /*ホーム画面*/
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 text-gray-800">
      <span className="text-5xl font-bold">著作権の関係上、画像は白塗りにしております。</span>
      <span className="text-5xl font-bold">下までスクロールしていただけますようお願いいたします。</span>
      <div className="w-full h-full object-cover">
        <img
          src="/select.png"
          alt=""
          className="object-contain"
        />
      </div>
      
      {/*ココイチカレー診断ボタン*/}
      <div className="flex mt-32">
        <button
          onClick={() => navigate("/diagnosis")}
          className="flex items-center justify-between w-[900px] h-[300px] bg-yellow-200 text-yellow-900 text-xl rounded-lg hover:bg-yellow-300 transition px-6 border shadow"
        >
        <div className="flex flex-col self-start mt-8 w-[60%]">
          <span className="text-3xl self-start font-bold">ココイチカレー診断</span>
          <span className="text-base self-start mt-4 ">CoCo壱番町に住むカレーみたいなナゾのネコたち「ネコイチ」。</span>
          <span className="text-base self-start mt-4 ">カレーが大好きな彼らには大きな夢があります。</span>
          <span className="text-base self-start mt-4 ">それは「全人類にカレーをもっと好きになってもらうこと」です。</span>
          <span className="text-base self-start mt-4 ">そんな彼らがあなたにぴったりのカレーを診断してくれるみたい。</span>
          <span className="text-base self-start mt-4 ">あなたも「ネコイチ」と一緒にカレーを好きになる旅に出かけませんか？</span>
        </div>

          <img
            src="/select_dia.png"
            alt="curry"
            className="w-[350px] h-[250px] rounded-lg"
          />
        </button>
      </div>

      {/*ココイチカレーシミュレーターボタン*/}
      <div className="flex mt-28">
        <button
          onClick={() => navigate("/simulater")}
          className="flex items-center justify-between w-[900px] h-[300px] bg-yellow-200 text-yellow-900 text-xl rounded-lg hover:bg-yellow-300 transition px-6 mb-28 border shadow"
        >
          <div className="flex flex-col self-start mt-8">
            <span className="text-3xl self-start font-bold">ココイチカレーシミュレーター</span>
            <span className="text-base self-start mt-4 ">ココイチのカレーの組み合わせは12億通り以上。</span>
            <span className="text-base self-start mt-4 ">好きなカレーにトッピングを追加していくと、気づけば値段が分からなくなる...。</span>
            <span className="text-base self-start mt-4 ">そんなあなたにおすすめなのが、このココイチカレーシミュレーターです。</span>
            <span className="text-base self-start mt-4 ">ベース、ライスの量、辛さ、トッピングを選ぶだけで合計金額が分かります。</span>
            <span className="text-base self-start mt-4 ">シミュレーターで遊んだあとは、ぜひ実際の店舗でカレーを楽しんでください。</span>
          </div>

          <img
            src="/select_simu.png"
            alt="curry"
            className="w-[350px] h-[240px] rounded-lg"
          />
        </button>
      </div>
    </div>
  );

}


