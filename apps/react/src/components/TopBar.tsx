import type { Meta } from '../types';
import { FrameworkSwitcher } from './FrameworkSwitcher';

interface Props {
  meta: Meta;
  current: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function TopBar({ meta, current, theme, onToggleTheme }: Props) {
  return (
    <div className="topbar" role="banner">
      <div className="container">
        <span className="topbar-left">Built with: {meta.frameworkLabels[current]}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <FrameworkSwitcher meta={meta} current={current} size="small" />
          <button
            className="theme-toggle"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title="Toggle dark mode"
            onClick={onToggleTheme}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </div>
  );
}
