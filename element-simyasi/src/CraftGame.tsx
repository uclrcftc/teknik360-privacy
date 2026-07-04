import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { BASE_ELEMENT_IDS, combine, ELEMENTS, ElementId } from './elements';
import { CATEGORIES, CATEGORY_ORDER, CategoryId, categoryOf } from './categories';
import { hexToRgba } from './colorUtils';
import { ITEM_SIZE, initialDiscovered, nextUid, overlaps, WorkspaceItem } from './gameLogic';
import WorkspaceTile from './WorkspaceTile';
import ConstellationBackground from './ConstellationBackground';
import AdBanner from './AdBanner';
import Onboarding, { ONBOARDING_KEY } from './Onboarding';
import { useTheme } from './theme';

const DISCOVERED_KEY = 'sonsuz-simya.discovered';
const WORKSPACE_HEIGHT = Math.min(Dimensions.get('window').height * 0.5, 460);
const WORKSPACE_WIDTH = Math.min(Dimensions.get('window').width, 480);

type ToastKind = 'discovery' | 'known' | 'none';

export default function CraftGame() {
  const theme = useTheme();
  const [discovered, setDiscovered] = useState<Set<ElementId>>(() => initialDiscovered());
  const [loaded, setLoaded] = useState(false);
  const [items, setItems] = useState<WorkspaceItem[]>([]);
  const [query, setQuery] = useState('');
  const [toast, setToast] = useState<{ message: string; kind: ToastKind } | null>(null);
  const [shakeUids, setShakeUids] = useState<string[]>([]);
  const [shakeToken, setShakeToken] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const spawnCount = useRef(0);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    AsyncStorage.getItem(DISCOVERED_KEY).then((value) => {
      if (value) {
        try {
          const ids: ElementId[] = JSON.parse(value);
          setDiscovered(new Set([...BASE_ELEMENT_IDS, ...ids]));
        } catch {
          // ignore corrupt storage
        }
      }
      setLoaded(true);
    });
    AsyncStorage.getItem(ONBOARDING_KEY).then((value) => {
      if (!value) setShowOnboarding(true);
    });
  }, []);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(DISCOVERED_KEY, JSON.stringify([...discovered]));
  }, [discovered, loaded]);

  function dismissOnboarding() {
    setShowOnboarding(false);
    AsyncStorage.setItem(ONBOARDING_KEY, '1');
  }

  function showToast(message: string, kind: ToastKind) {
    setToast({ message, kind });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastOpacity.setValue(0);
    Animated.timing(toastOpacity, { toValue: 1, duration: 180, useNativeDriver: true }).start();
    toastTimer.current = setTimeout(() => {
      Animated.timing(toastOpacity, { toValue: 0, duration: 220, useNativeDriver: true }).start(() =>
        setToast(null)
      );
    }, 1600);
  }

  function spawnElement(id: ElementId) {
    Haptics.selectionAsync();
    const cols = Math.max(1, Math.floor((WORKSPACE_WIDTH - 20) / (ITEM_SIZE + 12)));
    const index = spawnCount.current % (cols * 3);
    spawnCount.current += 1;
    const col = index % cols;
    const row = Math.floor(index / cols);
    const x = ITEM_SIZE / 2 + 16 + col * (ITEM_SIZE + 12);
    const y = ITEM_SIZE / 2 + 16 + row * (ITEM_SIZE + 12);
    setItems((prev) => [...prev, { uid: nextUid(), elementId: id, x, y }]);
  }

  function moveItem(uid: string, x: number, y: number) {
    setItems((prev) => prev.map((it) => (it.uid === uid ? { ...it, x, y } : it)));
  }

  function removeItem(uid: string) {
    setItems((prev) => prev.filter((it) => it.uid !== uid));
  }

  function releaseItem(uid: string) {
    setItems((prev) => {
      const moved = prev.find((it) => it.uid === uid);
      if (!moved) return prev;
      const partner = prev.find((it) => it.uid !== uid && overlaps(it, moved));
      if (!partner) return prev;

      const resultId = combine(moved.elementId, partner.elementId);
      if (!resultId) {
        setShakeUids([moved.uid, partner.uid]);
        setShakeToken((t) => t + 1);
        showToast('Tepkime yok', 'none');
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        return prev;
      }

      const isNew = !discovered.has(resultId);
      setDiscovered((d) => {
        if (d.has(resultId)) return d;
        const next = new Set(d);
        next.add(resultId);
        return next;
      });
      if (isNew) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      showToast(
        isNew
          ? `Yeni keşif: ${ELEMENTS[resultId].emoji} ${ELEMENTS[resultId].name}`
          : `${ELEMENTS[resultId].emoji} ${ELEMENTS[resultId].name}`,
        isNew ? 'discovery' : 'known'
      );

      const resultItem: WorkspaceItem = {
        uid: nextUid(),
        elementId: resultId,
        x: (moved.x + partner.x) / 2,
        y: (moved.y + partner.y) / 2,
      };
      return prev.filter((it) => it.uid !== uid && it.uid !== partner.uid).concat(resultItem);
    });
  }

  function clearWorkspace() {
    setItems([]);
  }

  const groupedDiscovered = useMemo(() => {
    const q = query.toLocaleLowerCase('tr');
    const groups: { category: CategoryId; items: (typeof ELEMENTS)[ElementId][] }[] = [];
    for (const category of CATEGORY_ORDER) {
      const items = [...discovered]
        .filter((id) => categoryOf(id) === category)
        .map((id) => ELEMENTS[id])
        .filter((el) => el.name.toLocaleLowerCase('tr').includes(q))
        .sort((a, b) => a.name.localeCompare(b.name, 'tr'));
      if (items.length > 0) groups.push({ category, items });
    }
    return groups;
  }, [discovered, query]);

  const toastBg = toast?.kind === 'none' ? '#b5453880' : theme.toastBg;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.headerTitle }]}>Element Simyası</Text>
        <Text style={[styles.subtitle, { color: theme.headerSubtitle }]}>
          Keşfedilen: {discovered.size} / {Object.keys(ELEMENTS).length}
        </Text>
      </View>

      <View
        style={[
          styles.workspace,
          {
            width: WORKSPACE_WIDTH,
            height: WORKSPACE_HEIGHT,
            borderColor: theme.surfaceBorder,
          },
        ]}
      >
        <LinearGradient
          colors={theme.surfaceGradient}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 0.9, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <ConstellationBackground
          width={WORKSPACE_WIDTH}
          height={WORKSPACE_HEIGHT}
          dotColor={theme.constellationDot}
          hubColor={theme.constellationDotHub}
          lineColor={theme.constellationLine}
        />
        <Pressable
          style={[styles.clearButton, { backgroundColor: theme.accent }]}
          onPress={clearWorkspace}
        >
          <Text style={[styles.clearButtonText, { color: theme.accentText }]}>Temizle</Text>
        </Pressable>
        {items.length === 0 && (
          <>
            <Text style={[styles.emptyHint, { color: theme.hintText }]}>
              Aşağıdan bir element dokun, sonra iki elementi üst üste sürükleyerek birleştir!
            </Text>
          </>
        )}
        {items.map((item) => (
          <WorkspaceTile
            key={item.uid}
            item={item}
            theme={theme}
            shakeSignal={shakeUids.includes(item.uid) ? shakeToken : 0}
            onMove={moveItem}
            onRelease={releaseItem}
            onRemove={removeItem}
          />
        ))}
        {toast && (
          <Animated.View
            style={[styles.toast, { backgroundColor: toastBg, opacity: toastOpacity }]}
          >
            <Text
              style={[
                styles.toastText,
                { color: toast.kind === 'none' ? '#fff' : theme.toastText },
              ]}
            >
              {toast.message}
            </Text>
          </Animated.View>
        )}
      </View>

      <View style={styles.sidebar}>
        <TextInput
          style={[
            styles.search,
            { backgroundColor: theme.searchBg, borderColor: theme.searchBorder, color: theme.searchText },
          ]}
          placeholder="Element ara..."
          placeholderTextColor={theme.searchPlaceholder}
          value={query}
          onChangeText={setQuery}
        />
        <ScrollView contentContainerStyle={styles.chipScroll}>
          {groupedDiscovered.map(({ category, items }) => {
            const color = CATEGORIES[category].color;
            return (
              <View key={category} style={styles.categoryGroup}>
                <View style={styles.categoryHeader}>
                  <View style={[styles.categoryDot, { backgroundColor: color }]} />
                  <Text style={[styles.categoryLabel, { color: theme.headerSubtitle }]}>
                    {CATEGORIES[category].label} · {items.length}
                  </Text>
                </View>
                <View style={styles.chipList}>
                  {items.map((el) => (
                    <Pressable
                      key={el.id}
                      style={[
                        styles.chip,
                        { backgroundColor: theme.chipBg, borderColor: hexToRgba(color, 0.4) },
                      ]}
                      onPress={() => spawnElement(el.id)}
                    >
                      <View
                        style={[
                          styles.chipBadge,
                          { backgroundColor: hexToRgba(color, 0.16), borderColor: hexToRgba(color, 0.5) },
                        ]}
                      >
                        <Text style={styles.chipEmoji}>{el.emoji}</Text>
                      </View>
                      <Text style={[styles.chipName, { color: theme.chipText }]}>{el.name}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            );
          })}
          {groupedDiscovered.length === 0 && (
            <Text style={[styles.noResults, { color: theme.hintText }]}>
              Eşleşen element bulunamadı
            </Text>
          )}
        </ScrollView>
      </View>

      <AdBanner />
      <Onboarding visible={showOnboarding} theme={theme} onDismiss={dismissOnboarding} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  workspace: {
    borderRadius: 14,
    borderWidth: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  clearButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    zIndex: 10,
  },
  clearButtonText: {
    fontSize: 12,
    fontWeight: '700',
  },
  emptyHint: {
    position: 'absolute',
    top: '42%',
    left: 24,
    right: 24,
    textAlign: 'center',
    fontSize: 14,
  },
  toast: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  toastText: {
    fontWeight: '700',
    fontSize: 14,
  },
  sidebar: {
    flex: 1,
    width: '100%',
    marginTop: 10,
    paddingHorizontal: 12,
  },
  search: {
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
  },
  chipScroll: {
    paddingBottom: 20,
  },
  categoryGroup: {
    marginBottom: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  categoryLabel: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  chipList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
    minWidth: 76,
  },
  chipBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipEmoji: {
    fontSize: 20,
  },
  chipName: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 5,
  },
  noResults: {
    fontSize: 13,
    paddingVertical: 8,
  },
});
