import { BuildEngine } from "./BuildEngine";
import { ElementNode } from "../meta/ElementNode";

export class RuntimeBuildEngine {
  private readonly _buildEngine: BuildEngine;

  constructor() {
    this._buildEngine = new BuildEngine();
    this._buildEngine.elementNodeResolveAspectHandle = (elementNode, ctx) => {
      console.debug(
        `[elementNodeResolveAspectHandler] 元素节点解析切面-当前节点: ${elementNode.type}, path: ${ctx.path}`
      );
      return elementNode;
    };
    this._buildEngine.componentBuildAspectHandler = (reactNode, ctx) => {
      console.debug("[componentBuildAspectHandler] 组件构建切面-当前组件: ",reactNode);
      return reactNode;
    };
  }
  build(rootEleNode: ElementNode) {
    return this._buildEngine.build(rootEleNode);
  }
}
