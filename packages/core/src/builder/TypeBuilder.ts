import { ReactNode } from 'react'
import { ElementNode } from '../meta/ElementNode'

export interface TypeBuilderContext {
  // 节点路径
  path: string;
  // 节点
  elementNode: Omit<ElementNode, ''>;
}

export interface TypeBuilder {
  build(
    builderContext: TypeBuilderContext,
    childrenReactNode?: ReactNode[]
  ): ReactNode
}

/**
 * TypeBuilder构造函数类型
 */
export type TypeBuilderConstructor = new (args: any) => TypeBuilder;