import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  width: number;
  height: number;
  dotColor: string;
  hubColor: string;
  lineColor: string;
}

interface Point {
  x: number;
  y: number;
  r: number;
  hub: boolean;
}

interface Segment {
  x1: number;
  y1: number;
  length: number;
  angle: number;
}

function seededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export default function ConstellationBackground({ width, height, dotColor, hubColor, lineColor }: Props) {
  const { points, segments } = useMemo(() => {
    if (width <= 0 || height <= 0) return { points: [] as Point[], segments: [] as Segment[] };
    const rand = seededRandom(Math.round(width * 31 + height * 17) || 1);
    const count = Math.max(16, Math.round((width * height) / 3800));

    const pts: Point[] = Array.from({ length: count }, () => {
      const hub = rand() < 0.16;
      return {
        x: rand() * width,
        y: rand() * height,
        r: hub ? 2.4 + rand() * 1 : 1.1 + rand() * 0.9,
        hub,
      };
    });

    const maxDist = Math.min(width, height) * 0.16;
    const segs: Segment[] = [];
    for (let i = 0; i < pts.length; i++) {
      const neighbors: { j: number; d: number }[] = [];
      for (let j = 0; j < pts.length; j++) {
        if (i === j) continue;
        const dx = pts[j].x - pts[i].x;
        const dy = pts[j].y - pts[i].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < maxDist) neighbors.push({ j, d });
      }
      neighbors.sort((a, b) => a.d - b.d);
      const linkCount = pts[i].hub ? 2 : 1;
      for (let k = 0; k < Math.min(linkCount, neighbors.length); k++) {
        if (rand() < 0.55) {
          const target = pts[neighbors[k].j];
          const dx = target.x - pts[i].x;
          const dy = target.y - pts[i].y;
          segs.push({
            x1: pts[i].x,
            y1: pts[i].y,
            length: Math.sqrt(dx * dx + dy * dy),
            angle: Math.atan2(dy, dx),
          });
        }
      }
    }

    return { points: pts, segments: segs };
  }, [width, height]);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {segments.map((s, i) => (
        <View
          key={`s${i}`}
          style={[
            styles.line,
            {
              left: s.x1,
              top: s.y1,
              width: s.length,
              backgroundColor: lineColor,
              transform: [{ rotate: `${s.angle}rad` }],
            },
          ]}
        />
      ))}
      {points.map((p, i) => (
        <View
          key={`p${i}`}
          style={[
            styles.dot,
            {
              left: p.x - p.r,
              top: p.y - p.r,
              width: p.r * 2,
              height: p.r * 2,
              borderRadius: p.r,
              backgroundColor: p.hub ? hubColor : dotColor,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  line: {
    position: 'absolute',
    height: 1,
    // pivot the rotation around the line's start point rather than its center
    transformOrigin: '0 50%',
  },
  dot: {
    position: 'absolute',
  },
});
