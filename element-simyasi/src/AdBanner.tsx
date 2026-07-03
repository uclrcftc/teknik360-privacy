import React from 'react';
import { View } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

// TODO: swap for your real AdMob banner ad unit ID before submitting to the
// stores. TestIds.BANNER always serves Google's sample ad and is safe to
// ship during development so real ad requests are never made from test
// builds.
const AD_UNIT_ID = TestIds.BANNER;

export default function AdBanner() {
  return (
    <View style={{ alignItems: 'center', width: '100%' }}>
      <BannerAd unitId={AD_UNIT_ID} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
    </View>
  );
}
