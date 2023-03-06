import { ReactNode } from "react";
import { ElementNode } from "../meta/ElementNode";
import { TypeBuilderManager } from "../builder/TypeBuilderManager";

export class BuildEngine {
  // 构建：通过传入ElementNode信息，得到该节点对应供React渲染的ReactNode
  build(rootElementNode: ElementNode): ReactNode | undefined {
    return this.innerBuild(rootElementNode, '/' + rootElementNode.type);
  }

  private innerBuild(rootElementNode: ElementNode, rootPath: string): ReactNode | undefined {
    if (!rootElementNode) {
      return undefined;
    }

    const { type, children } = rootElementNode;

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
        elementNode: rootElementNode,
      },
      childrenReactNode
    );

    return reactNode
  }
}
