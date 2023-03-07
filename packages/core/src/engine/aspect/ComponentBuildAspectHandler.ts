import { ReactNode } from "react";
import { ElementNode } from "../../meta/ElementNode";

export interface ComponentBuildAspectHandleContext {
  path: string;
  elementNode: Omit<ElementNode, "">;
}

/**
 * 构建切面
 * @param reactNode 通过typeBuilder构建出的reactNode
 * @param handleContext 封装的一些支持切面处理的上下文
 */
export type ComponentBuildAspectHandler = (
  reactNode: ReactNode,
  handleContext: ComponentBuildAspectHandleContext
) => ReactNode;
