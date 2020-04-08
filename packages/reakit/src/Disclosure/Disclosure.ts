import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import { useButton, ButtonOptions, ButtonHTMLProps } from "../Button/Button";
import { useDisclosureState, DisclosureStateReturn } from "./DisclosureState";

export type DisclosureOptions = ButtonOptions &
  Pick<Partial<DisclosureStateReturn>, "visible"> &
  Pick<DisclosureStateReturn, "toggle" | "baseId">;

export type DisclosureHTMLProps = ButtonHTMLProps;

export type DisclosureProps = DisclosureOptions & DisclosureHTMLProps;

export const useDisclosure = createHook<DisclosureOptions, DisclosureHTMLProps>(
  {
    name: "Disclosure",
    compose: useButton,
    useState: useDisclosureState,

    useProps(
      options,
      { onClick: htmlOnClick, "aria-controls": ariaControls, ...htmlProps }
    ) {
      const controls = ariaControls
        ? `${ariaControls} ${options.baseId}`
        : options.baseId;

      const onClick = (event: React.MouseEvent) => {
        htmlOnClick?.(event);
        if (event.defaultPrevented) return;
        options.toggle?.();
      };

      return {
        "aria-expanded": !!options.visible,
        "aria-controls": controls,
        onClick,
        ...htmlProps,
      };
    },
  }
);

export const Disclosure = createComponent({
  as: "button",
  useHook: useDisclosure,
});
