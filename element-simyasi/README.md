# Element Simyası

Element birleştirerek yeni elementler keşfettiğin bir "crafting" mobil oyunu (React Native / Expo).
neal.fun'daki Infinite Craft ve benzeri simya/element birleştirme oyunlarından ilham alır.

4 temel elementle (Su, Ateş, Rüzgar, Toprak) başlarsın; onları çalışma alanına sürükleyip
üst üste bırakarak birleştirir, yeni elementler keşfedersin (Buhar, Lav, Bitki, İnsan, Şehir,
Roket, Ejderha, Aşk, Bankamatik, Cam Kavanoz...). 350'nin üzerinde element ve tarif içerir.

## Geliştirme

```
cd element-simyasi
npm install
npm run android   # veya npm run ios / npm run web
```

## Yapı

- `src/elements.ts` — element kataloğu ve tarif (reçete) tablosu
- `src/categories.ts` — elementlerin kategorisi ve kategori renkleri
- `src/gameLogic.ts` — çalışma alanı öğeleri, çakışma (overlap) tespiti
- `src/CraftGame.tsx` — ana ekran: çalışma alanı, arama çubuklu element listesi, keşif bildirimleri
- `src/WorkspaceTile.tsx` — çalışma alanındaki sürüklenebilir element kartı
- `src/AdBanner.tsx` / `src/AdBanner.web.tsx` — AdMob banner reklamı (native), web'de gösterilmez
- `src/Onboarding.tsx` — ilk açılışta gösterilen kısa tanıtım

Keşfedilen elementler `AsyncStorage` ile cihazda kalıcı olarak saklanır.

## Reklamlar (AdMob)

`src/AdBanner.tsx` şu an Google'ın **test** ad unit ID'sini (`TestIds.BANNER`) kullanıyor —
bu, geliştirme sırasında gerçek reklam isteği göndermeden Google'ın örnek reklamını gösterir.

Mağazaya göndermeden önce:
1. [AdMob](https://apps.admob.com) üzerinden uygulamayı ekleyip gerçek bir App ID ve banner
   ad unit ID alın.
2. `app.json` içindeki `plugins` → `react-native-google-mobile-ads` altındaki
   `androidAppId` / `iosAppId` değerlerini gerçek App ID'lerinizle değiştirin.
3. `src/AdBanner.tsx` içindeki `AD_UNIT_ID` sabitini gerçek banner ad unit ID'nizle değiştirin.

Bilinçli olarak sadece **tek bir banner reklam** (ekranın altında) kullanıldı; geçiş
(interstitial) veya ödüllü (rewarded) reklam eklenmedi.

⚠️ `react-native-google-mobile-ads` native bir modüldür — Expo Go'da veya web export'ta
çalışmaz/gösterilmez (web'de `AdBanner.web.tsx` boş döner). Test etmek için bir
**development build** (`npx expo run:android` / `npx expo run:ios` ya da EAS Build) gerekir.

## Yeni element/tarif eklemek

`src/elements.ts` içindeki `ELEMENTS` kataloğuna yeni bir element, `src/categories.ts`
içindeki `GROUPS`'a bir kategori ve `RAW_RECIPES` dizisine
`[ingredientA, ingredientB, result]` şeklinde bir tarif eklemek yeterli.
Sonucun her zaman zaten kataloğa eklenmiş elementlerden üretilebildiğinden emin olun.
