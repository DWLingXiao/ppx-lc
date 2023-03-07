import { ElementNode } from "../../meta/ElementNode";

export interface ElementNodeResolveAspectHandleContext {
  path: string;
}

export type ElementNodeResolveAspectHandle = (
  elementNode: ElementNode,
  context: ElementNodeResolveAspectHandleContext
) => ElementNode | undefined;
