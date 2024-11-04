/// <reference types="vite/client" />
declare module 'circletype' {
  export default class CircleType {
    constructor(element: HTMLElement);
    radius(value: number): this;
  }
}

declare module 'react-stickynode' {
  import { ComponentType, CSSProperties, ReactNode } from 'react';

  interface StickyProps {
    enabled?: boolean;
    top?: number;
    bottomBoundary?: number | string | HTMLElement;
    innerZ?: number;
    activeClass?: string;
    releasedClass?: string;
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
    onStateChange?: (status: StickyStatus) => void;
  }

  interface StickyState {
    status: StickyStatus;
  }

  type StickyStatus = 'normal' | 'sticky' | 'released';

  const Sticky: ComponentType<StickyProps>;

  export default Sticky;
}