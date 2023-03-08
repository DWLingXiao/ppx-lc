import React, {
  CSSProperties,
  FC,
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export interface ElementNodeDesiginWrapperProps {
  nodePath?: string;

  isSelected?: boolean;

  onClick?: () => void;
}

export const ElementNodeDesiginWrapper: FC<
  PropsWithChildren<ElementNodeDesiginWrapperProps>
> = (props) => {
  const { nodePath, isSelected = false, children, onClick } = props;
  const [targetNodeType, setTargetNodeType] = useState<string>();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref || !ref.current) {
      return;
    }
    const currentElement = ref.current;
    const elementNodeType = currentElement.firstChild.nodeName;
    setTargetNodeType(elementNodeType);
  });

  const style: CSSProperties = useMemo(() => {
    const inlineBlockElement = ["A", "SPAN", "BUTTON", "B", "I"];
    return {
      boxSizing: "border-box",
      outline: isSelected ? "2px solid blue" : "1px dashed gray",
      display: inlineBlockElement.includes(targetNodeType)
        ? "inline-block"
        : "",
      padding: "3px",
      margin: "3px",
    };
  }, [isSelected, targetNodeType]);

  return (
    <div
      key={nodePath + "_wrapper_key"}
      style={style}
      ref={ref}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
    >
      {children}
    </div>
  );
};
