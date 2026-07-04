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

## Yayına alma (deploy)

Bu proje şu an hiçbir yerde yayınlanmıyor — repoda sadece kod ve build script'i var.
İki seçenek:

**1. Kendi bilgisayarınızdan hızlı deploy (bir hesaba ihtiyaç duymadan):**
```
npm run build
npx serve dist        # yerelde test etmek için
```
`dist/` klasörünü [Netlify Drop](https://app.netlify.com/drop) sayfasına sürükleyip
bırakmak, birkaç saniyede canlı bir URL almanın en hızlı yolu.

**2. GitHub Pages (otomatik workflow hazır ama bilerek elle tetiklemeli bırakıldı):**
`.github/workflows/deploy-web.yml` dosyası bu projeyi build edip GitHub Pages'e
deploy ediyor, ama **otomatik çalışmaz** — sadece Actions sekmesinden elle
tetiklenir (`workflow_dispatch`). Bunun nedeni: repo kökündeki `README.md`
zaten bir gizlilik politikası sayfası olarak kullanılıyor olabilir; bu workflow'u
otomatik çalıştırmak, GitHub Pages ayarlarını "GitHub Actions" kaynağına
çevirip o sayfayı fark ettirmeden değiştirebilir. Kullanmadan önce:
1. Repo **Settings → Pages → Source** kısmını "GitHub Actions" olarak ayarlayın
   (mevcut gizlilik politikası kurulumunuzu etkileyip etkilemediğini önce
   kontrol edin).
2. Actions sekmesinden "Deploy 3D web experience to GitHub Pages" workflow'unu
   elle çalıştırın (`Run workflow`).

`vite.config.ts` içindeki `base: './'` ayarı sayesinde build, hangi alt yolda
(subpath) servis edilirse edilsin doğru çalışır.

## Notlar

- Tüm 3D geometriler proceduraldir (harici model/doku dosyası indirilmez),
  bu yüzden tamamen offline/self-contained çalışır.
- Performans için `dpr` (device pixel ratio) 1–1.8 aralığında sınırlanmıştır;
  düşük güçlü mobil cihazlarda otomatik olarak daha keskin olmayan ama daha
  akıcı bir render sağlar.
- 3D sahne için WebGL desteği gereklidir; WebGL'i olmayan çok eski
  tarayıcılar için statik bir yedek (fallback) ekranı eklenmedi — kapsam
  dışında bırakıldı.
