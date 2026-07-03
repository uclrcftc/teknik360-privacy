import { useColorScheme } from 'react-native';

export interface Palette {
  scheme: 'light' | 'dark';
  background: string;
  surface: string;
  surfaceBorder: string;
  surfaceGradient: [string, string, string];
  gridDot: string;
  headerTitle: string;
  headerSubtitle: string;
  accent: string;
  accentText: string;
  hintText: string;
  watermark: string;
  chipBg: string;
  chipBorder: string;
  chipText: string;
  tileBg: string;
  tileBorder: string;
  tileText: string;
  searchBg: string;
  searchBorder: string;
  searchText: string;
  searchPlaceholder: string;
  removeBg: string;
  removeText: string;
  toastBg: string;
  toastText: string;
}

const light: Palette = {
  scheme: 'light',
  background: '#f4efe4',
  surface: '#fbf8f1',
  surfaceBorder: '#e2ddd3',
  surfaceGradient: ['#fdfbf6', '#f6efe0', '#ecdfc6'],
  gridDot: 'rgba(138, 109, 74, 0.16)',
  headerTitle: '#4a4438',
  headerSubtitle: '#8a8071',
  accent: '#8a6d4a',
  accentText: '#fff8ee',
  hintText: '#b0a68f',
  watermark: 'rgba(138, 109, 74, 0.08)',
  chipBg: '#ffffff',
  chipBorder: '#e2ddd3',
  chipText: '#4a4438',
  tileBg: '#ffffff',
  tileBorder: '#e2ddd3',
  tileText: '#4a4438',
  searchBg: '#ffffff',
  searchBorder: '#e2ddd3',
  searchText: '#4a4438',
  searchPlaceholder: '#9c9284',
  removeBg: '#c0392b',
  removeText: '#ffffff',
  toastBg: 'rgba(74, 68, 56, 0.94)',
  toastText: '#ffffff',
};

const dark: Palette = {
  scheme: 'dark',
  background: '#1c1712',
  surface: '#241d16',
  surfaceBorder: '#3a2f22',
  surfaceGradient: ['#2a2118', '#221a13', '#160f0a'],
  gridDot: 'rgba(212, 167, 101, 0.10)',
  headerTitle: '#f3ead9',
  headerSubtitle: '#b3a488',
  accent: '#d4a765',
  accentText: '#241d16',
  hintText: '#6f6455',
  watermark: 'rgba(212, 167, 101, 0.07)',
  chipBg: '#2c241a',
  chipBorder: '#40352490',
  chipText: '#f3ead9',
  tileBg: '#2c241a',
  tileBorder: '#4a3c29',
  tileText: '#f3ead9',
  searchBg: '#2c241a',
  searchBorder: '#40352490',
  searchText: '#f3ead9',
  searchPlaceholder: '#7d7160',
  removeBg: '#e05545',
  removeText: '#ffffff',
  toastBg: 'rgba(212, 167, 101, 0.96)',
  toastText: '#241d16',
};

export function useTheme(): Palette {
  const scheme = useColorScheme();
  return scheme === 'dark' ? dark : light;
}
