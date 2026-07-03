import { Suspense } from 'react';
import Scene from './Scene';
import './App.css';

function App() {
  return (
    <div className="stage">
      <Suspense fallback={<div className="loading">Yükleniyor…</div>}>
        <Scene />
      </Suspense>

      <div className="overlay">
        <span className="eyebrow">Su · Ateş · Rüzgar · Toprak</span>
        <h1>Element Simyası</h1>
        <p>
          Dört temel elementi birleştirerek yüzlerce yeni element keşfet.
          Basit bir dokunuşla başlayan, sonu olmayan bir simya yolculuğu.
        </p>
        <a className="cta" href="#">
          Uygulamayı Keşfet
        </a>
      </div>

      <div className="hint">Sahneyi döndürmek için sürükle</div>
    </div>
  );
}

export default App;
