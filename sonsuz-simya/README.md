# Sonsuz Simya

[neal.fun/infinite-craft](https://neal.fun/infinite-craft/) ve "Sonsuz Zanaat: Simya" tarzı,
element birleştirerek yeni elementler keşfettiğin bir mobil oyun (React Native / Expo).

4 temel elementle (Su, Ateş, Rüzgar, Toprak) başlarsın; onları çalışma alanına sürükleyip
üst üste bırakarak birleştirir, yeni elementler keşfedersin (Buhar, Lav, Bitki, İnsan, Şehir...).

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
