import React, { ReactNode } from "react";
import { TypeBuilder, TypeBuilderContext } from "../TypeBuilder";
import { Button } from "antd";

export class ButtonTypeBuilder implements TypeBuilder {
  build(
    builderContext: TypeBuilderContext,
    childrenReactNode?: React.ReactNode[]
  ): React.ReactNode {
    const { elementNode, path } = builderContext;
    const { text = "button" } = elementNode.props;

    return <Button key={path} type="primary">{text}</Button>;
  }
}
