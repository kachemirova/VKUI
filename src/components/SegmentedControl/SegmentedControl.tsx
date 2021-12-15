import * as React from "react";
import { getClassName } from "../../helpers/getClassName";
import { usePlatform } from "../../hooks/usePlatform";
import { classNames } from "../../lib/classNames";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { SegmentedControlButton } from "./SegmentedControlButton/SegmentedControlButton";
import { TappableProps } from "../Tappable/Tappable";
import "./SegmentedControl.css";

interface SegmentedControlOptionInterface extends Omit<TappableProps, "label"> {
  label: React.ReactChild;
  value: string | number;
}

const defaultOption: SegmentedControlOptionInterface = { label: "", value: "" };

export interface SegmentedControlProps
  extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  options: SegmentedControlOptionInterface[];
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  name,
  options = [defaultOption],
  children,
  ...restProps
}) => {
  const [activeOptionIdx, updateActiveOptionIdx] = React.useState<number>(0);
  const [activeValue, updateActiveValue] = React.useState<
    SegmentedControlOptionInterface["value"]
  >(options[0].value);
  const platform = usePlatform();

  useIsomorphicLayoutEffect(() => {
    const _activeOptionIdx = options.findIndex(
      (option) => option.value === activeValue
    );

    updateActiveOptionIdx(_activeOptionIdx);
  }, [activeValue]);

  const translateX = `translateX(${100 * activeOptionIdx}%)`;

  return (
    <div
      vkuiClass={classNames(getClassName("SegmentedControl", platform))}
      {...restProps}
    >
      <input type="hidden" name={name} value={activeValue} />
      <div vkuiClass={classNames("SegmentedControl__in")}>
        <div
          aria-hidden="true"
          vkuiClass={classNames("SegmentedControl__slider")}
          style={{
            width: `${100 / options.length}%`,
            transform: translateX,
            WebkitTransform: translateX,
          }}
        />
        {options.map(({ value, label, ...optionProps }, idx) => (
          <SegmentedControlButton
            key={`${value}${idx}`}
            {...optionProps}
            selected={activeValue === value}
            onClick={() => updateActiveValue(value)}
            type="button"
          >
            {label}
          </SegmentedControlButton>
        ))}
      </div>
    </div>
  );
};
