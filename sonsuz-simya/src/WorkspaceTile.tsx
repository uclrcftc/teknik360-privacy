import React, { useRef } from 'react';
import { PanResponder, Pressable, StyleSheet, Text, View } from 'react-native';
import { ELEMENTS } from './elements';
import { ITEM_SIZE, WorkspaceItem } from './gameLogic';

interface Props {
  item: WorkspaceItem;
  onMove: (uid: string, x: number, y: number) => void;
  onRelease: (uid: string) => void;
  onRemove: (uid: string) => void;
}

export default function WorkspaceTile({ item, onMove, onRelease, onRemove }: Props) {
  const def = ELEMENTS[item.elementId];
  const start = useRef({ x: item.x, y: item.y });

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
    <View
      style={[
        styles.tile,
        { left: item.x - ITEM_SIZE / 2, top: item.y - ITEM_SIZE / 2 },
      ]}
      {...panResponder.panHandlers}
    >
      <Pressable style={styles.removeButton} onPress={() => onRemove(item.uid)} hitSlop={8}>
        <Text style={styles.removeText}>×</Text>
      </Pressable>
      <Text style={styles.emoji}>{def.emoji}</Text>
      <Text style={styles.name} numberOfLines={1}>
        {def.name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    position: 'absolute',
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e2ddd3',
    userSelect: 'none',
  },
  emoji: {
    fontSize: 32,
  },
  name: {
    fontSize: 12,
    color: '#4a4438',
    marginTop: 2,
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
    backgroundColor: '#c0392b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 16,
  },
});
