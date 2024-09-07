import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to Mirror.web.ts
// and on native platforms to Mirror.ts
import MirrorModule from './MirrorModule';
import MirrorView from './MirrorView';
import { ChangeEventPayload, MirrorViewProps } from './Mirror.types';

// Get the native constant value.
export const PI = MirrorModule.PI;

export function hello(): string {
  return MirrorModule.hello();
}

export async function setValueAsync(value: string) {
  return await MirrorModule.setValueAsync(value);
}

const emitter = new EventEmitter(MirrorModule ?? NativeModulesProxy.Mirror);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { MirrorView, MirrorViewProps, ChangeEventPayload };
