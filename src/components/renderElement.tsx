import { FC } from "react";
import { css } from "@emotion/css";
import { ElementEnums, ShapeElement } from "../config/type";

interface RenderElementProps {
  element: ShapeElement;
  onClick: (id: string) => void;
}

const shapes = {
  [ElementEnums.RECTANGLE]: () => {
    return "M 0 0 L 200 0 L 200 200 L 0 200 Z";
  },

  [ElementEnums.TRANGLE]: () => {
    return "M 0 0 L 0 200 L 200 200 Z";
  },
};

export const RenderElement: FC<RenderElementProps> = (props) => {
  const { element, onClick } = props;
  const { type, position, rotation, width, height, fill, id } = element;

  const classes = css`
    position: absolute;
    left: ${position.x}px;
    top: ${position.y}px;
    transform: rotate(${rotation}deg);
    width: ${width}px;
    height: ${height}px;
  `;

  const scaleX = width / 200;
  const scaleY = height / 200;

  return (
    <div
      className={classes}
      data-element-id={id}
      onClick={() => onClick(id)}
    >
      <svg width={width} height={height}>
        <g transform={`scale(${scaleX}, ${scaleY})`}>
          <path d={shapes[type]()} fill={fill} />
        </g>
      </svg>
    </div>
  );
};
