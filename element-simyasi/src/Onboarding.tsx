import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Palette } from './theme';

export const ONBOARDING_KEY = 'sonsuz-simya.onboardingSeen';

interface Props {
  visible: boolean;
  theme: Palette;
  onDismiss: () => void;
}

export default function Onboarding({ visible, theme, onDismiss }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onDismiss}>
      <View style={styles.backdrop}>
        <View
          style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.surfaceBorder }]}
        >
          <Text style={styles.emoji}>⚗️</Text>
          <Text style={[styles.title, { color: theme.headerTitle }]}>
            Element Simyası'na Hoş Geldin
          </Text>
          <Step
            number={1}
            text="Aşağıdaki listeden bir elemente dokun, çalışma alanına eklenir."
            theme={theme}
          />
          <Step number={2} text="İki elementi üst üste sürükleyerek birleştir." theme={theme} />
          <Step
            number={3}
            text="Yeni elementler keşfettikçe listen büyür — 350'den fazla element seni bekliyor!"
            theme={theme}
          />
          <Pressable style={[styles.button, { backgroundColor: theme.accent }]} onPress={onDismiss}>
            <Text style={[styles.buttonText, { color: theme.accentText }]}>Başlayalım</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

function Step({ number, text, theme }: { number: number; text: string; theme: Palette }) {
  return (
    <View style={styles.step}>
      <View style={[styles.stepNumber, { backgroundColor: theme.accent }]}>
        <Text style={[styles.stepNumberText, { color: theme.accentText }]}>{number}</Text>
      </View>
      <Text style={[styles.stepText, { color: theme.chipText }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(10, 8, 5, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    borderRadius: 20,
    borderWidth: 1,
    padding: 24,
    alignItems: 'center',
  },
  emoji: {
    fontSize: 44,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 18,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 14,
    width: '100%',
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  stepNumberText: {
    fontSize: 12,
    fontWeight: '800',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  button: {
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 999,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '800',
  },
});
