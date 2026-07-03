# Element Simyası

Element birleştirerek yeni elementler keşfettiğin bir "crafting" mobil oyunu (React Native / Expo).
neal.fun'daki Infinite Craft ve benzeri simya/element birleştirme oyunlarından ilham alır.

4 temel elementle (Su, Ateş, Rüzgar, Toprak) başlarsın; onları çalışma alanına sürükleyip
üst üste bırakarak birleştirir, yeni elementler keşfedersin (Buhar, Lav, Bitki, İnsan, Şehir,
Roket, Ejderha, Aşk...). 180'in üzerinde element ve tarif içerir.

## Geliştirme

```
cd sonsuz-simya
npm install
npm run android   # veya npm run ios / npm run web
```

## Yapı

- `src/elements.ts` — element kataloğu ve tarif (reçete) tablosu
- `src/gameLogic.ts` — çalışma alanı öğeleri, çakışma (overlap) tespiti
- `src/CraftGame.tsx` — ana ekran: çalışma alanı, arama çubuklu element listesi, keşif bildirimleri
- `src/WorkspaceTile.tsx` — çalışma alanındaki sürüklenebilir element kartı

Keşfedilen elementler `AsyncStorage` ile cihazda kalıcı olarak saklanır.

## Yeni element/tarif eklemek

`src/elements.ts` içindeki `ELEMENTS` kataloğuna yeni bir element ve `RAW_RECIPES`
dizisine `[ingredientA, ingredientB, result]` şeklinde bir tarif eklemek yeterli.
Sonucun her zaman zaten kataloğa eklenmiş elementlerden üretilebildiğinden emin olun.
