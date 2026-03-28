import * as Blockly from 'blockly';

let cachedTheme: Blockly.Theme | null = null;

export function getBlocklyTheme() {
  if (cachedTheme) return cachedTheme;
  cachedTheme = Blockly.Theme.defineTheme('pixelPastel', {
    base: Blockly.Themes.Classic,
    blockStyles: {
      movement: {
        colourPrimary: '#f154c0',
        colourSecondary: '#ff84d1',
        colourTertiary: '#d333a7',
      },
      actions: {
        colourPrimary: '#ffa158',
        colourSecondary: '#ffbb80',
        colourTertiary: '#f68534',
      },
      control: {
        colourPrimary: '#7f5dff',
        colourSecondary: '#a083ff',
        colourTertiary: '#5b37ec',
      },
      logic: {
        colourPrimary: '#5cf2d2',
        colourSecondary: '#10c4a1',
        colourTertiary: '#c7fff3',
      },
      sensing: {
        colourPrimary: '#ffd6f1',
        colourSecondary: '#fff2fb',
        colourTertiary: '#ffb3e5',
      },
    },
    categoryStyles: {
      movement: { colour: '#f154c0' },
      actions: { colour: '#ffa158' },
      control: { colour: '#7f5dff' },
      logic: { colour: '#5cf2d2' },
      sensing: { colour: '#ffd6f1' },
    },
    componentStyles: {
      workspaceBackgroundColour: '#1f102c',
      toolboxBackgroundColour: '#130b1d',
      toolboxForegroundColour: '#ffffff',
      flyoutBackgroundColour: '#23112f',
      flyoutForegroundColour: '#ffffff',
      flyoutOpacity: 0.95,
      scrollbarColour: '#ff84d1',
      scrollbarOpacity: 0.6,
      insertionMarkerColour: '#5cf2d2',
      insertionMarkerOpacity: 0.5,
    },
    fontStyle: {
      family: 'Inter, var(--font-sans), sans-serif',
      weight: '600',
      size: 13,
    },
  });
  return cachedTheme;
}
