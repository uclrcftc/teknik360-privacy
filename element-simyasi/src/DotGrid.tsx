import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  width: number;
  height: number;
  color: string;
  spacing?: number;
}

export default function DotGrid({ width, height, color, spacing = 26 }: Props) {
  const dots = useMemo(() => {
    const positions: { x: number; y: number }[] = [];
    for (let y = spacing / 2; y < height; y += spacing) {
      for (let x = spacing / 2; x < width; x += spacing) {
        positions.push({ x, y });
      }
    }
    return positions;
  }, [width, height, spacing]);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {dots.map((p, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            { left: p.x - 1.5, top: p.y - 1.5, backgroundColor: color },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    position: 'absolute',
    width: 3,
    height: 3,
    borderRadius: 1.5,
  },
});
