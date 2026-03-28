import type { PaletteConfig } from '@/lib/blockly/definitions';
import { CATEGORY_DETAILS } from '@/lib/blockly/definitions';

type Props = {
  palette: PaletteConfig;
  layout?: 'stack' | 'row';
};

export default function Palette({ palette, layout = 'stack' }: Props) {
  const horizontal = layout === 'row';
  return (
    <section
      aria-label="Block categories"
      style={{
        display: 'flex',
        flexDirection: horizontal ? 'row' : 'column',
        flexWrap: horizontal ? 'wrap' : 'nowrap',
        gap: 16,
      }}
    >
      {palette.map((entry) => {
        const meta = CATEGORY_DETAILS[entry.category];
        return (
          <article
            key={entry.category}
            style={{
              flex: horizontal ? '1 1 220px' : '0 1 auto',
              minWidth: horizontal ? 220 : undefined,
              background: 'rgba(255, 255, 255, 0.04)',
              borderRadius: 16,
              padding: 16,
              border: `1px solid ${meta.accent}44`,
              color: 'white',
            }}
          >
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span aria-hidden style={{ fontSize: 20 }}>
                  {meta.icon}
                </span>
                <h3 style={{ margin: 0 }}>{meta.label}</h3>
              </div>
              <span style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: meta.accent }}>
                {entry.blocks.length ? `${entry.blocks.length} blocks` : 'Not in this puzzle'}
              </span>
            </header>
            <p style={{ marginTop: 8, color: 'rgba(255,255,255,0.7)' }}>{meta.description}</p>
            {entry.blocks.length > 0 && (
              <ul style={{ display: 'flex', gap: 8, flexWrap: 'wrap', listStyle: 'none', padding: 0, margin: 0 }}>
                {entry.blocks.map((block) => (
                  <li
                    key={block}
                    style={{
                      background: 'rgba(255,255,255,0.12)',
                      borderRadius: 999,
                      padding: '4px 12px',
                      fontSize: 12,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {block.replace(/_/g, ' ')}
                  </li>
                ))}
              </ul>
            )}
          </article>
        );
      })}
    </section>
  );
}
