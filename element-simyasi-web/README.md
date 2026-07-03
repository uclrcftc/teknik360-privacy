# Element Simyası — 3D Web Deneyimi

"Element Simyası" mobil oyunu için hazırlanmış, Three.js / React Three Fiber
tabanlı interaktif bir 3D tanıtım sayfası. 4 temel element (Su, Ateş, Rüzgar,
Toprak) merkezi bir çekirdeğin etrafında yörüngede döner; sahne fare/dokunuşla
döndürülebilir.

## Geliştirme

```
npm install
npm run dev       # http://localhost:5173
npm run build     # dist/ altına production build
npm run preview   # production build'i yerelde servis eder
```

## Yapı

- `src/Scene.tsx` — 3D sahne: yörüngedeki elementler, merkezi çekirdek,
  ışıklandırma, `Sparkles` parçacık efekti, `OrbitControls`
- `src/App.tsx` — sahnenin üzerine bindirilen başlık/açıklama/CTA metni
- `src/App.css`, `src/index.css` — sayfa ve bindirme (overlay) stilleri

## Notlar

- Tüm 3D geometriler proceduraldir (harici model/doku dosyası indirilmez),
  bu yüzden tamamen offline/self-contained çalışır.
- Performans için `dpr` (device pixel ratio) 1–1.8 aralığında sınırlanmıştır;
  düşük güçlü mobil cihazlarda otomatik olarak daha keskin olmayan ama daha
  akıcı bir render sağlar.
- 3D sahne için WebGL desteği gereklidir; WebGL'i olmayan çok eski
  tarayıcılar için statik bir yedek (fallback) ekranı eklenmedi — kapsam
  dışında bırakıldı.
