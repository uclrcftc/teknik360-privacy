import React, { useEffect, useRef } from 'react';
import { Animated, PanResponder, Pressable, StyleSheet, Text, View } from 'react-native';
import { ELEMENTS } from './elements';
import { CATEGORIES, categoryOf } from './categories';
import { hexToRgba } from './colorUtils';
import { ITEM_SIZE, WorkspaceItem } from './gameLogic';
import { Palette } from './theme';

interface Props {
  item: WorkspaceItem;
  theme: Palette;
  shakeSignal: number;
  onMove: (uid: string, x: number, y: number) => void;
  onRelease: (uid: string) => void;
  onRemove: (uid: string) => void;
}

export default function WorkspaceTile({ item, theme, shakeSignal, onMove, onRelease, onRemove }: Props) {
  const def = ELEMENTS[item.elementId];
  const categoryColor = CATEGORIES[categoryOf(item.elementId)].color;
  const start = useRef({ x: item.x, y: item.y });
  const scale = useRef(new Animated.Value(0)).current;
  const shakeX = useRef(new Animated.Value(0)).current;
  const lastShake = useRef(shakeSignal);

  useEffect(() => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 5,
      tension: 80,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!shakeSignal || shakeSignal === lastShake.current) {
      lastShake.current = shakeSignal;
      return;
    }
    lastShake.current = shakeSignal;
    Animated.sequence([
      Animated.timing(shakeX, { toValue: 8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeX, { toValue: -8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeX, { toValue: 6, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeX, { toValue: -6, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeX, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();
  }, [shakeSignal, shakeX]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        start.current = { x: item.x, y: item.y };
      },
      onPanResponderMove: (_, gesture) => {
        onMove(item.uid, start.current.x + gesture.dx, start.current.y + gesture.dy);
      },
      onPanResponderRelease: () => {
        onRelease(item.uid);
      },
    })
  ).current;

  return (
    <Animated.View
      style={[
        styles.tile,
        {
          left: item.x - ITEM_SIZE / 2,
          top: item.y - ITEM_SIZE / 2,
          backgroundColor: theme.tileBg,
          borderColor: hexToRgba(categoryColor, 0.45),
          transform: [{ scale }, { translateX: shakeX }],
        },
      ]}
      {...panResponder.panHandlers}
    >
      <Pressable
        style={[styles.removeButton, { backgroundColor: theme.removeBg }]}
        onPress={() => onRemove(item.uid)}
        hitSlop={8}
      >
        <Text style={[styles.removeText, { color: theme.removeText }]}>×</Text>
      </Pressable>
      <View
        style={[
          styles.badge,
          { backgroundColor: hexToRgba(categoryColor, 0.16), borderColor: hexToRgba(categoryColor, 0.5) },
        ]}
      >
        <Text style={styles.emoji}>{def.emoji}</Text>
      </View>
      <Text style={[styles.name, { color: theme.tileText }]} numberOfLines={1}>
        {def.name}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  tile: {
    position: 'absolute',
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    userSelect: 'none',
  },
  badge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 28,
  },
  name: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
    maxWidth: ITEM_SIZE - 12,
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeText: {
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 16,
  },
});
