import * as React from "react";
import * as PropTypes from "prop-types";
import use from "reuse";
import { theme } from "styled-tools";
import {
  bool,
  bgColorWithProps,
  textColorWithProps
} from "../_utils/styledProps";
import CSSProps from "../_utils/CSSProps";
import pickCSSProps from "../_utils/pickCSSProps";
import dedupeClassName from "../_utils/dedupeClassName";
import pickHTMLProps from "../_utils/pickHTMLProps";
import styled from "../styled";

type CSSProperties = { [K in keyof typeof CSSProps]?: string | number };

export type BoxProps = React.HTMLProps<any> &
  CSSProperties & {
    use?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
    children?: React.ReactNode;
    static?: boolean;
    absolute?: boolean;
    fixed?: boolean;
    relative?: boolean;
    sticky?: boolean;
    opaque?: boolean;
    palette?: string;
    tone?: number;
  };

const BoxComponent = React.forwardRef<HTMLElement, BoxProps>(
  ({ use: T, ...props }, ref) => {
    const style = pickCSSProps(props);
    if (typeof T === "string") {
      const className = dedupeClassName(props.className);
      const allProps = Object.assign(
        pickHTMLProps(props),
        { className },
        style ? { style } : {}
      );

      return <T {...allProps} ref={ref} />;
    }
    if (T) {
      return <T {...props} style={style} />;
    }
    return null;
  }
);

const positions = ["static", "absolute", "fixed", "relative", "sticky"];

const Box = styled(BoxComponent)`
  margin: unset;
  padding: unset;
  border: unset;
  background: unset;
  font: unset;
  font-family: inherit;
  font-size: 100%;
  box-sizing: border-box;
  background-color: ${bgColorWithProps};
  color: ${textColorWithProps};
  ${theme("Box")};
  &&& {
    ${bool("position", positions)};
  }
`;

const asTypes = [PropTypes.func, PropTypes.string];

// @ts-ignore
Box.propTypes = {
  use: PropTypes.oneOfType([
    ...asTypes,
    PropTypes.arrayOf(PropTypes.oneOfType(asTypes))
  ]),
  opaque: PropTypes.bool,
  palette: PropTypes.string,
  tone: PropTypes.number,
  static: PropTypes.bool,
  absolute: PropTypes.bool,
  fixed: PropTypes.bool,
  relative: PropTypes.bool,
  sticky: PropTypes.bool
};

Box.defaultProps = {
  use: "div"
};

export default use(Box);
