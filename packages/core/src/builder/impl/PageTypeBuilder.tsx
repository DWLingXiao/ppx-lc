import React, { CSSProperties, ReactNode } from "react";
import { TypeBuilder, TypeBuilderContext } from "../TypeBuilder";

export class PageTypeBuilder implements TypeBuilder {
  build(
    builderContext: TypeBuilderContext,
    childrenReactNode?: React.ReactNode[]
  ): React.ReactNode {
    const style: CSSProperties = {
      width: "100%",
      height: "100%",
      padding: "10px",
    };
    return <div style={style}>{childrenReactNode}</div>;
  }
}
