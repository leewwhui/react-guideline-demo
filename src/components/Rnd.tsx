import { FC } from "react";
import { positionType } from "../config/type";
import { css } from "@emotion/css";

interface RndProps {
  position: positionType;
  children: React.ReactNode;
  onDragStart: (e: MouseEvent) => void;
  onDrag: (e: MouseEvent) => void;
  onDragStop: (e: MouseEvent) => void;
}

export const Rnd: FC<RndProps> = (props) => {
  const { children, position, onDrag, onDragStart, onDragStop } = props;

  const classes = css`
    position: absolute;
    box-sizing: border-box;
    width: fit-content;
    left: ${position.x}px;
    top: ${position.y}px;

    &:hover {
      cursor: move;
    }
  `;

  const handleMouseDown = (e: React.MouseEvent) => {
    onDragStart(e.nativeEvent);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp)
  };

  const handleMouseMove = (e: MouseEvent) => {
    onDrag(e);
  }

  const handleMouseUp = (e: MouseEvent) => {
    onDragStop(e);
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
  }

  return (
    <div className={classes} onMouseDown={handleMouseDown}>
      {children}
    </div>
  );
};
