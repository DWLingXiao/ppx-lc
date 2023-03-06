export interface ElementNode {
  /**
   * 元素唯一类型 type
   */
  type: string

  /**
   * 组件的各种属性：
   * 扩展的、UI的
   */
  props: {
    [propsKey: string]: any
  }

  /**
   * 子组件
   */
  children?:ElementNode[]
}