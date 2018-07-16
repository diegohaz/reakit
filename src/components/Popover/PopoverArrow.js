import styled from "styled-components";
import { prop } from "styled-tools";
import as from "../../enhancers/as";
import Perpendicular from "../Perpendicular";
import Arrow from "../Arrow";
import Box from "../Box";

const PerpendicularArrowBox = Perpendicular.as([Arrow, Box]);

const PopoverArrow = styled(PerpendicularArrowBox)`
  color: white;
  border: inherit;
  border-top: 0;
  font-size: 1.25em;
  border-radius: 0;
  ${prop("theme.PopoverArrow")};
`;

PopoverArrow.defaultProps = {
  pos: "top",
  align: "center",
  gutter: "0px",
  rotate: true,
  reverse: true
};

export default as("div")(PopoverArrow);
