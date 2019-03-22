import { renderHook, act } from "react-hooks-testing-library";
import { useCheckboxState } from "../CheckboxState";
import { jestSerializerStripFunctions } from "../../__utils/jestSerializerStripFunctions";

expect.addSnapshotSerializer(jestSerializerStripFunctions);

function render(...args: Parameters<typeof useCheckboxState>) {
  return renderHook(() => useCheckboxState(...args)).result;
}

test("initial state", () => {
  const result = render();
  expect(result.current).toMatchInlineSnapshot(`
Object {
  "currentValue": 0,
}
`);
});

test("initial state currentValue", () => {
  const result = render({ currentValue: 1 });
  expect(result.current).toMatchInlineSnapshot(`
Object {
  "currentValue": 1,
}
`);
});

test("initial state array currentValue", () => {
  const result = render({ currentValue: ["a", "b"] });
  expect(result.current).toMatchInlineSnapshot(`
Object {
  "currentValue": Array [
    "a",
    "b",
  ],
}
`);
});

test("update", () => {
  const result = render();
  act(() => result.current.setValue(1));
  expect(result.current).toMatchInlineSnapshot(`
Object {
  "currentValue": 1,
}
`);
});

test("toggle", () => {
  const result = render();
  act(result.current.toggle);
  expect(result.current).toMatchInlineSnapshot(`
Object {
  "currentValue": 1,
}
`);
});

test("toggle value", () => {
  const result = render();
  act(() => result.current.toggle("a"));
  expect(result.current).toMatchInlineSnapshot(`
Object {
  "currentValue": Array [
    "a",
  ],
}
`);
});

test("toggle existing value", () => {
  const result = render({ currentValue: ["a", "b", "c"] });
  act(() => result.current.toggle("b"));
  expect(result.current).toMatchInlineSnapshot(`
Object {
  "currentValue": Array [
    "a",
    "c",
  ],
}
`);
});

test("toggle new value", () => {
  const result = render({ currentValue: ["a"] });
  act(() => result.current.toggle("b"));
  expect(result.current).toMatchInlineSnapshot(`
Object {
  "currentValue": Array [
    "a",
    "b",
  ],
}
`);
});
