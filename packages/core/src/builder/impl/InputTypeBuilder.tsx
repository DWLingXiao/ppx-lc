import React, { CSSProperties, ReactNode } from "react";
import { TypeBuilder, TypeBuilderContext } from "../TypeBuilder";
import { Input } from "antd";

export class InputTypeBuilder implements TypeBuilder {
  build(
    builderContext: TypeBuilderContext,
    childrenReactNode?: ReactNode[]
  ): ReactNode {
    const { path } = builderContext;
    return <Input key={path} />;
  }
}
