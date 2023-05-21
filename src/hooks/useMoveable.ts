import Moveable, { MoveableOptions } from "moveable";
import { useEffect, useMemo, useRef, useState } from "react";

export const useMoveable = () => {
  const [targets, setTargets] = useState<HTMLElement[]>();
  const [container, setContainer] = useState<HTMLElement>();

  const config: MoveableOptions = useMemo(() => {
    return {
      draggable: true,
      rotatable: true,
      container,
    };
  }, [container]);

  useEffect(() => {
    moveable.current.target = targets;
  }, [targets]);

  const moveable = useRef<Moveable>(new Moveable(document.body, config));

  return { moveable: moveable.current, setTargets, setContainer };
};
