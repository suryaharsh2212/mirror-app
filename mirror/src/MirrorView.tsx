import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { MirrorViewProps } from './Mirror.types';

const NativeView: React.ComponentType<MirrorViewProps> =
  requireNativeViewManager('Mirror');

export default function MirrorView(props: MirrorViewProps) {
  return <NativeView {...props} />;
}
