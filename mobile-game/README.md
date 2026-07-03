# 2048 Birleştir

React Native (Expo) ile yazılmış, kaydırmalı sayı birleştirme (2048 tarzı) mobil oyunu.

## Geliştirme

```
cd mobile-game
npm install
npm run android   # veya npm run ios / npm run web
```

## Yapı

- `src/game2048.ts` — saf oyun mantığı (grid, hamle, birleştirme, kazanma/kaybetme kontrolü)
- `src/Game2048.tsx` — arayüz, kaydırma (swipe) algılama, skor ve rekor (AsyncStorage ile kalıcı)
- `src/tileColors.ts` — karo renk paleti

## Reklam / Abonelik entegrasyonu

Gizlilik politikasında belirtilen AdMob ve RevenueCat için hazır kod eklenmedi (API anahtarı/hesap gerektirir).
Eklemek için:

- `react-native-google-mobile-ads` ile banner/interstitial reklamlar `restart()` sonrası veya oyun bitiş ekranında gösterilebilir.
- `react-native-purchases` (RevenueCat) ile reklamsız sürüm gibi bir uygulama içi satın alma eklenebilir.
