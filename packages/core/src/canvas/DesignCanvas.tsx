import React from "react";
import { useMemo, useState } from "react";
import { BuildEngine } from "../engine/BuildEngine";
import {
  ElementNodeDesiginWrapper,
  ElementNodeDesiginWrapperProps,
} from "./ElementNodeDesignWrapper";

interface DesignCanvasProps {
  rootNodeJsonSchema: string;
}

export const DesignCanvas = (props: DesignCanvasProps) => {
  const { rootNodeJsonSchema } = props;

  const [selectedPath, setSelectedPath] = useState<string>("");

  const buildEngine = useMemo(() => {
    const engine = new BuildEngine();
    engine.componentBuildAspectHandler = (reactNode, ctx) => {
      const { path } = ctx;

      const WrapperProps: ElementNodeDesiginWrapperProps = {
        nodePath: path,
        isSelected: path === selectedPath,
        onClick: () => {
          console.debug("wrapper onClick");
          setSelectedPath(path);
        },
      };

      return (
        <ElementNodeDesiginWrapper {...WrapperProps}>
          {reactNode}
        </ElementNodeDesiginWrapper>
      );
    };
    return engine;
  }, [selectedPath]);

  const renderComponent = useMemo(() => {
    try {
      const eleNode = JSON.parse(rootNodeJsonSchema);
      return buildEngine.build(eleNode);
    } catch (e) {
      return <div>构建出错：{e.message}</div>;
    }
  }, [rootNodeJsonSchema, selectedPath]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: "5px",
      }}
    >
      {renderComponent}
    </div>
  );
};
