export const COLORS = {
  berry: {
    50: '#fff2fb',
    100: '#ffd6f1',
    200: '#ffb3e5',
    300: '#ff84d1',
    400: '#f154c0',
    500: '#d333a7',
    600: '#aa2685',
    700: '#821b66',
    800: '#5b1246',
    900: '#340925',
  },
  lilac: {
    50: '#f3edff',
    100: '#e0d4ff',
    200: '#c1aaff',
    300: '#a083ff',
    400: '#7f5dff',
    500: '#5b37ec',
    600: '#4429b5',
    700: '#311d83',
    800: '#1f1252',
    900: '#120b30',
  },
  cream: {
    50: '#fff9f2',
    100: '#ffe9d6',
    200: '#ffd3ac',
    300: '#ffbb80',
    400: '#ffa158',
    500: '#f68534',
  },
  mint: {
    200: '#c7fff3',
    400: '#5cf2d2',
    600: '#10c4a1',
  },
  ink: '#1b1024',
  inkSoft: 'rgba(27, 16, 36, 0.72)',
  cloud: 'rgba(255, 255, 255, 0.92)',
} as const;

export type PaletteName = keyof typeof COLORS;
