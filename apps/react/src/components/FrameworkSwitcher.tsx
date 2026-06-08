// In React, a component is just a function that returns JSX.
// Props are typed via an interface and destructured in the parameter list.
import type { Meta } from '../types';

interface Props {
  meta: Meta;
  current: string;
  size?: 'small' | 'large';
}

export function FrameworkSwitcher({ meta, current, size = 'small' }: Props) {
  const cls = size === 'large' ? 'fw-switcher-large' : 'fw-switcher';

  return (
    <nav className={cls} aria-label="Framework versions">
      {/* JSX uses `className` instead of `class` (class is reserved in JS) */}
      {meta.frameworks.map(fw =>
        fw === current ? (
          <span key={fw} aria-current="page">{meta.frameworkLabels[fw]}</span>
        ) : (
          <a key={fw} href={meta.frameworkPaths[fw]}>{meta.frameworkLabels[fw]}</a>
        )
      )}
    </nav>
  );
}
