import { FC } from "react";
import { positionType } from "../config/type";
import { css } from "@emotion/css";

interface GuideLineProps {
  from: positionType;
  to: positionType;
}

export const GuideLine: FC<GuideLineProps> = (props) => {
  const { from, to } = props;
  const width = Math.max(Math.abs(to.x - from.x), 2);
  const height = Math.max(Math.abs(to.y - from.y), 2);

  const classes = css`
    position: absolute;
    width: ${width}px;
    height: ${height}px;
    background-color: #000;
    left: ${Math.min(from.x, to.y)}px;
    top: ${Math.min(from.y, to.y)}px;
  `;

  return (
    <div className={classes} />
  )
};
