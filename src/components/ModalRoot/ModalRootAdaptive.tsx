import * as React from "react";
import {
  withAdaptivity,
  AdaptivityProps,
  ViewHeight,
  ViewWidth,
} from "../../hoc/withAdaptivity";
import { ModalRootTouch } from "./ModalRoot";
import { ModalRootDesktop } from "./ModalRootDesktop";

export interface ModalRootProps extends AdaptivityProps {
  /**
   * Чтобы модалка отображалась только в десктоп-формате или только в формате для мобилок
   */
  mode?: 'desktop' | 'mobile';
  activeModal?: string | null;

  /**
   * Будет вызвано при закрытии активной модалки с её id
   */
  onClose?: (modalId: string) => void;
}

const ModalRootComponent: React.FC<ModalRootProps> = (
  props: ModalRootProps
) => {
  const { viewWidth, viewHeight, hasMouse, mode } = props;
  const isDesktop =
    viewWidth >= ViewWidth.SMALL_TABLET &&
    (hasMouse || viewHeight >= ViewHeight.MEDIUM);

  const RootComponent = (mode === 'mobile')
    ? ModalRootTouch
    : (mode === 'desktop' || isDesktop)
      ? ModalRootDesktop
      : ModalRootTouch;

  return <RootComponent {...props} />;
};

ModalRootComponent.displayName = "ModalRoot";

export const ModalRoot = withAdaptivity(ModalRootComponent, {
  viewWidth: true,
  viewHeight: true,
  hasMouse: true,
});
