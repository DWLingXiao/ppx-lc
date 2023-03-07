import { ReactNode } from "react";
import { ElementNode } from "../meta/ElementNode";
import { TypeBuilderManager } from "../builder/TypeBuilderManager";
import {ComponentBuildAspectHandler} from "./aspect/ComponentBuildAspectHandler";
import { ElementNodeResolveAspectHandle } from "./aspect/ElementNodeResolveAspectHandler";

export class BuildEngine {

  private _componentBuildAspectHandler?: ComponentBuildAspectHandler;
  private _elementNodeResolveAspectHandle?: ElementNodeResolveAspectHandle

  set elementNodeResolveAspectHandle(value: ElementNodeResolveAspectHandle | undefined) {
    this._elementNodeResolveAspectHandle = value
  }

  set componentBuildAspectHandler(value: ComponentBuildAspectHandler | undefined) {
    this._componentBuildAspectHandler = value
  }

  // 构建：通过传入ElementNode信息，得到该节点对应供React渲染的ReactNode
  build(rootElementNode: ElementNode): ReactNode | undefined {
    return this.innerBuild(rootElementNode, '/' + rootElementNode.type);
  }

  private innerBuild(originRootEleNode: ElementNode, rootPath: string): ReactNode | undefined {

    let resolvedRootElementNode: ElementNode
    if(this._elementNodeResolveAspectHandle) {
      console.debug('进入节点解析切面处理')
      resolvedRootElementNode = this._elementNodeResolveAspectHandle(originRootEleNode, {
        path: rootPath
      })
    } else {
      resolvedRootElementNode = originRootEleNode
    }


    if (!resolvedRootElementNode) {
      return undefined;
    }

    const { type, children } = resolvedRootElementNode;

    // 递归处理子节点
    const childrenReactNode = (children || []).map((childEleNode, index) => {

      // 子元素路径拼接
      const childPath = `${rootPath}/${childEleNode.type}.${index}`

      return this.innerBuild(childEleNode, childPath);
    });

    // 获取当前类型的构造器
    const typeBuilder = TypeBuilderManager.getInstance().getTypeBuilder(type);

    if (!typeBuilder) {
      console.warn(`找不到type="${type}"的构造器`);
      return undefined;
    }

    const reactNode = typeBuilder.build(
      {
        path: rootPath,
        elementNode: resolvedRootElementNode,
      },
      childrenReactNode
    );

    if(this._componentBuildAspectHandler) {
      console.debug('进入组件构建切面处理')
      return this._componentBuildAspectHandler(reactNode, {
        path: rootPath,
        elementNode: resolvedRootElementNode
      })
    }

    return reactNode
  }
}
