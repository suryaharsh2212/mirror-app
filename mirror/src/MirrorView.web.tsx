import * as React from 'react';

import { MirrorViewProps } from './Mirror.types';

export default function MirrorView(props: MirrorViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
