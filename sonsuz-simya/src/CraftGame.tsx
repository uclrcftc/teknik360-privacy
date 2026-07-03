import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_ELEMENT_IDS, combine, ELEMENTS, ElementId } from './elements';
import { ITEM_SIZE, initialDiscovered, nextUid, overlaps, WorkspaceItem } from './gameLogic';
import WorkspaceTile from './WorkspaceTile';

const DISCOVERED_KEY = 'sonsuz-simya.discovered';
const WORKSPACE_HEIGHT = Math.min(Dimensions.get('window').height * 0.5, 460);
const WORKSPACE_WIDTH = Math.min(Dimensions.get('window').width, 480);

export default function CraftGame() {
  const [discovered, setDiscovered] = useState<Set<ElementId>>(() => initialDiscovered());
  const [loaded, setLoaded] = useState(false);
  const [items, setItems] = useState<WorkspaceItem[]>([]);
  const [query, setQuery] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const spawnCount = useRef(0);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
  }, []);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(DISCOVERED_KEY, JSON.stringify([...discovered]));
  }, [discovered, loaded]);

  function showToast(message: string) {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 1800);
  }

  function spawnElement(id: ElementId) {
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
        showToast('Tepkime yok');
        return prev;
      }

      const isNew = !discovered.has(resultId);
      setDiscovered((d) => {
        if (d.has(resultId)) return d;
        const next = new Set(d);
        next.add(resultId);
        return next;
      });
      showToast(isNew ? `Yeni keşif: ${ELEMENTS[resultId].emoji} ${ELEMENTS[resultId].name}` : `${ELEMENTS[resultId].emoji} ${ELEMENTS[resultId].name}`);

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

  const discoveredList = useMemo(() => {
    const list = [...discovered]
      .map((id) => ELEMENTS[id])
      .filter((el) => el.name.toLocaleLowerCase('tr').includes(query.toLocaleLowerCase('tr')));
    list.sort((a, b) => a.name.localeCompare(b.name, 'tr'));
    return list;
  }, [discovered, query]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sonsuz Simya</Text>
        <Text style={styles.subtitle}>
          Keşfedilen: {discovered.size} / {Object.keys(ELEMENTS).length}
        </Text>
      </View>

      <View style={[styles.workspace, { width: WORKSPACE_WIDTH, height: WORKSPACE_HEIGHT }]}>
        <Pressable style={styles.clearButton} onPress={clearWorkspace}>
          <Text style={styles.clearButtonText}>Temizle</Text>
        </Pressable>
        {items.map((item) => (
          <WorkspaceTile
            key={item.uid}
            item={item}
            onMove={moveItem}
            onRelease={releaseItem}
            onRemove={removeItem}
          />
        ))}
        {items.length === 0 && (
          <Text style={styles.emptyHint}>
            Aşağıdan bir element dokun, sonra iki elementi üst üste sürükleyerek birleştir!
          </Text>
        )}
        {toast && (
          <View style={styles.toast}>
            <Text style={styles.toastText}>{toast}</Text>
          </View>
        )}
      </View>

      <View style={styles.sidebar}>
        <TextInput
          style={styles.search}
          placeholder="Element ara..."
          placeholderTextColor="#9c9284"
          value={query}
          onChangeText={setQuery}
        />
        <ScrollView contentContainerStyle={styles.chipList}>
          {discoveredList.map((el) => (
            <Pressable key={el.id} style={styles.chip} onPress={() => spawnElement(el.id)}>
              <Text style={styles.chipEmoji}>{el.emoji}</Text>
              <Text style={styles.chipName}>{el.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f4efe4',
    paddingTop: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#4a4438',
  },
  subtitle: {
    fontSize: 13,
    color: '#8a8071',
    marginTop: 2,
  },
  workspace: {
    backgroundColor: '#fbf8f1',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2ddd3',
    position: 'relative',
    overflow: 'hidden',
  },
  clearButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#4a4438',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    zIndex: 10,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  emptyHint: {
    position: 'absolute',
    top: '42%',
    left: 24,
    right: 24,
    textAlign: 'center',
    color: '#b0a68f',
    fontSize: 14,
  },
  toast: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    backgroundColor: 'rgba(74, 68, 56, 0.92)',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  toastText: {
    color: '#fff',
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
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2ddd3',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
    color: '#4a4438',
  },
  chipList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingBottom: 20,
  },
  chip: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2ddd3',
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
    minWidth: 76,
  },
  chipEmoji: {
    fontSize: 22,
  },
  chipName: {
    fontSize: 11,
    color: '#4a4438',
    fontWeight: '600',
    marginTop: 2,
  },
});
