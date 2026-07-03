import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, PanResponder, Pressable, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GRID_SIZE, addRandomTile, canMove, hasWon, move, newGame } from './game2048';
import type { Direction, Grid } from './game2048';
import { tileStyle } from './tileColors';

const BEST_SCORE_KEY = 'teknik360.merge2048.bestScore';
const BOARD_MARGIN = 16;
const BOARD_SIZE = Math.min(Dimensions.get('window').width - BOARD_MARGIN * 2, 420);
const TILE_GAP = 8;
const TILE_SIZE = (BOARD_SIZE - TILE_GAP * (GRID_SIZE + 1)) / GRID_SIZE;
const SWIPE_THRESHOLD = 24;

export default function Game2048() {
  const [grid, setGrid] = useState<Grid>(() => newGame());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [status, setStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [continueAfterWin, setContinueAfterWin] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(BEST_SCORE_KEY).then((value) => {
      if (value) setBestScore(parseInt(value, 10));
    });
  }, []);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      AsyncStorage.setItem(BEST_SCORE_KEY, String(score));
    }
  }, [score, bestScore]);

  function handleSwipe(direction: Direction) {
    if (status === 'lost' || (status === 'won' && !continueAfterWin)) return;
    setGrid((current) => {
      const result = move(current, direction);
      if (!result.moved) return current;
      const withNewTile = addRandomTile(result.grid);
      setScore((s) => s + result.gained);
      if (hasWon(withNewTile) && status === 'playing') {
        setStatus('won');
      } else if (!canMove(withNewTile)) {
        setStatus('lost');
      }
      return withNewTile;
    });
  }

  function restart() {
    setGrid(newGame());
    setScore(0);
    setStatus('playing');
    setContinueAfterWin(false);
  }

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) =>
        Math.abs(gesture.dx) > 5 || Math.abs(gesture.dy) > 5,
      onPanResponderRelease: (_, gesture) => {
        const { dx, dy } = gesture;
        if (Math.max(Math.abs(dx), Math.abs(dy)) < SWIPE_THRESHOLD) return;
        if (Math.abs(dx) > Math.abs(dy)) {
          handleSwipe(dx > 0 ? 'right' : 'left');
        } else {
          handleSwipe(dy > 0 ? 'down' : 'up');
        }
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>2048 Birleştir</Text>
        <View style={styles.scoreRow}>
          <ScoreBox label="SKOR" value={score} />
          <ScoreBox label="REKOR" value={bestScore} />
        </View>
      </View>
      <Pressable style={styles.newGameButton} onPress={restart}>
        <Text style={styles.newGameText}>Yeni Oyun</Text>
      </Pressable>
      <View
        style={[styles.board, { width: BOARD_SIZE, height: BOARD_SIZE }]}
        {...panResponder.panHandlers}
      >
        {grid.map((row, r) =>
          row.map((value, c) => {
            const colors = tileStyle(value);
            return (
              <View
                key={`${r}-${c}`}
                style={[
                  styles.tile,
                  {
                    left: TILE_GAP + c * (TILE_SIZE + TILE_GAP),
                    top: TILE_GAP + r * (TILE_SIZE + TILE_GAP),
                    width: TILE_SIZE,
                    height: TILE_SIZE,
                    backgroundColor: colors.background,
                  },
                ]}
              >
                {value !== 0 && (
                  <Text
                    style={[
                      styles.tileText,
                      { color: colors.text, fontSize: value >= 1024 ? 22 : 28 },
                    ]}
                  >
                    {value}
                  </Text>
                )}
              </View>
            );
          })
        )}
        {status !== 'playing' && !(status === 'won' && continueAfterWin) && (
          <View style={styles.overlay}>
            <Text style={styles.overlayTitle}>
              {status === 'won' ? 'Kazandın! 🎉' : 'Oyun Bitti'}
            </Text>
            <View style={styles.overlayButtons}>
              {status === 'won' && (
                <Pressable
                  style={styles.overlayButton}
                  onPress={() => setContinueAfterWin(true)}
                >
                  <Text style={styles.overlayButtonText}>Devam Et</Text>
                </Pressable>
              )}
              <Pressable style={styles.overlayButton} onPress={restart}>
                <Text style={styles.overlayButtonText}>Tekrar Oyna</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
      <Text style={styles.hint}>Kaydırarak sayıları birleştir ve 2048'e ulaş!</Text>
    </View>
  );
}

function ScoreBox({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.scoreBox}>
      <Text style={styles.scoreLabel}>{label}</Text>
      <Text style={styles.scoreValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#faf8ef',
    paddingTop: 24,
    userSelect: 'none',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#776e65',
    marginBottom: 8,
  },
  scoreRow: {
    flexDirection: 'row',
    gap: 12,
  },
  scoreBox: {
    backgroundColor: '#bbada0',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 8,
    alignItems: 'center',
    minWidth: 80,
  },
  scoreLabel: {
    color: '#eee4da',
    fontSize: 12,
    fontWeight: '700',
  },
  scoreValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
  },
  newGameButton: {
    backgroundColor: '#8f7a66',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  newGameText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  board: {
    backgroundColor: '#bbada0',
    borderRadius: 10,
    position: 'relative',
  },
  tile: {
    position: 'absolute',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileText: {
    fontWeight: '800',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(238, 228, 218, 0.85)',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#776e65',
    marginBottom: 16,
  },
  overlayButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  overlayButton: {
    backgroundColor: '#8f7a66',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },
  overlayButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  hint: {
    marginTop: 16,
    color: '#776e65',
    fontSize: 13,
  },
});
