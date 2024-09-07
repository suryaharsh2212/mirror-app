import icons from "./icons";
import images from "./images";

export { icons, images };
import { NativeModulesProxy } from 'expo-modules-core';
const { ExpoSettings } = NativeModulesProxy;

export function startScreenCapture(resultCode, resultData, host, port) {
  return ExpoSettings.startScreenCapture(resultCode, resultData, host, port);
}
