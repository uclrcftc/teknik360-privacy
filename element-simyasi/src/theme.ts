import { useColorScheme } from 'react-native';

export interface Palette {
  scheme: 'light' | 'dark';
  background: string;
  surface: string;
  surfaceBorder: string;
  surfaceGradient: [string, string, string];
  constellationDot: string;
  constellationDotHub: string;
  constellationLine: string;
  headerTitle: string;
  headerSubtitle: string;
  accent: string;
  accentText: string;
  hintText: string;
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
  surfaceGradient: ['#ffffff', '#fbfbfd', '#f3f4f7'],
  constellationDot: 'rgba(60, 66, 82, 0.30)',
  constellationDotHub: 'rgba(45, 50, 64, 0.55)',
  constellationLine: 'rgba(60, 66, 82, 0.14)',
  headerTitle: '#4a4438',
  headerSubtitle: '#8a8071',
  accent: '#8a6d4a',
  accentText: '#fff8ee',
  hintText: '#b0a68f',
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
  surfaceGradient: ['#151922', '#10131a', '#0a0c11'],
  constellationDot: 'rgba(210, 218, 235, 0.28)',
  constellationDotHub: 'rgba(225, 232, 245, 0.55)',
  constellationLine: 'rgba(210, 218, 235, 0.13)',
  headerTitle: '#f3ead9',
  headerSubtitle: '#b3a488',
  accent: '#d4a765',
  accentText: '#241d16',
  hintText: '#6f6455',
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
