import getKeyCode from "keycode";
import {
  getPreviousTabbableIn,
  getNextTabbableIn,
  isFocusable
} from "reakit-utils/tabbable";
import { fireEvent } from "./fireEvent";
import { focus } from "./focus";

const beforeKeyUpMap: Record<
  string,
  (element: Element, options: KeyboardEventInit) => void
> = {
  Tab(element, { shiftKey }) {
    const document = element.ownerDocument || window.document;
    const tabbable = shiftKey
      ? getPreviousTabbableIn(document.body)
      : getNextTabbableIn(document.body);
    if (tabbable) {
      focus(tabbable);
      // TODO: select if it's input and has value
    }
  },
  Enter(element, options) {
    if (options.metaKey) return;
    if (
      element instanceof HTMLInputElement &&
      !["hidden", "radio", "checkbox"].includes(element.type)
    ) {
      const { form } = element;
      if (!form) return;
      const elements = Array.from(form.elements);
      const validInputs = elements.filter(
        el =>
          el instanceof HTMLInputElement &&
          !["hidden", "button", "submit", "reset"].includes(el.type)
      );
      const submitButton = elements.find(
        el =>
          (el instanceof HTMLInputElement || el instanceof HTMLButtonElement) &&
          el.type === "submit"
      );

      if (validInputs.length === 1 || submitButton) {
        fireEvent.submit(form, options);
      }
    } else if (isFocusable(element)) {
      fireEvent.click(element, options);
    }
  }
};

const afterKeyUpMap: Record<
  string,
  (element: Element, options: KeyboardEventInit) => void
> = {
  " ": (element, options) => {
    if (options.metaKey) return;
    // TODO: click on radio and checkbox
    if (element instanceof HTMLButtonElement) {
      fireEvent.click(element, options);
    }
  }
};

export function press(
  key: string,
  element?: Element | null,
  options: KeyboardEventInit = {}
) {
  if (element == null) {
    element = document.activeElement || document.body;
  }

  if (!element) return;

  const keyCode = getKeyCode(key);
  // TODO: Test with key.charCodeAt(0) instead of getKeyCode
  // Add which and code

  let event: KeyboardEvent = new KeyboardEvent("keydown");

  const assignEvent = (evt: KeyboardEvent) => {
    event = evt;
  };

  element.addEventListener("keydown", assignEvent);
  element.addEventListener("keyup", assignEvent);

  fireEvent.keyDown(element, { key, keyCode, ...options });

  if (!event.defaultPrevented && key in beforeKeyUpMap) {
    beforeKeyUpMap[key](element, options);
  }
  // Add keypress here if alphanumeric
  // Add input if input or textarea is focused

  fireEvent.keyUp(element, { key, keyCode, ...options });

  if (!event.defaultPrevented && key in afterKeyUpMap) {
    afterKeyUpMap[key](element, options);
  }
}

function createPress(key: string, defaultOptions: KeyboardEventInit = {}) {
  return (element?: Element | null, options: KeyboardEventInit = {}) =>
    press(key, element, { ...defaultOptions, ...options });
}

press.Escape = createPress("Escape");
press.Tab = createPress("Tab");
press.ShiftTab = createPress("Tab", { shiftKey: true });
press.Enter = createPress("Enter");
press.Space = createPress(" ");
press.ArrowUp = createPress("ArrowUp");
press.ArrowRight = createPress("ArrowRight");
press.ArrowDown = createPress("ArrowDown");
press.ArrowLeft = createPress("ArrowLeft");
press.End = createPress("End");
press.Home = createPress("Home");
press.PageUp = createPress("PageUp");
press.PageDown = createPress("PageDown");
