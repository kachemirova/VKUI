import * as React from "react";
import Tappable from "../../Tappable/Tappable";
import { getClassName } from "../../../helpers/getClassName";
import { classNames } from "../../../lib/classNames";
import { HasRootRef } from "../../../types";
import { usePlatform } from "../../../hooks/usePlatform";
import Text from "../../Typography/Text/Text";
import "./SegmentedControlButton.css";

export interface SegmentedControlButtonProps
  extends React.ButtonHTMLAttributes<HTMLElement>,
    HasRootRef<HTMLElement> {
  selected?: boolean;
}

export const SegmentedControlButton: React.FC<SegmentedControlButtonProps> = ({
  selected,
  children,
  getRootRef,
  ...restProps
}) => {
  const platform = usePlatform();

  return (
    <Tappable
      Component="button"
      type="button"
      {...restProps}
      vkuiClass={classNames(getClassName("SegmentedControlButton", platform), {
        ["SegmentedControlButton--selected"]: selected,
      })}
      getRootRef={getRootRef}
      aria-pressed={selected}
      hasActive={false}
      hoverMode="opacity"
    >
      <Text weight="medium">{children}</Text>
    </Tappable>
  );
};
