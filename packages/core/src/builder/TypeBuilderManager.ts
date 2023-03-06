import { TypeBuilder, TypeBuilderConstructor } from "./TypeBuilder";
import { PageTypeBuilder } from "./impl/PageTypeBuilder";
import { ButtonTypeBuilder } from "./impl/ButtonTypeBuilder";
import { InputTypeBuilder } from "./impl/InputTypeBuilder";

class TypeBuilderManager {
  private static instance: TypeBuilderManager;

  /**
   *
   * 单例模式
   */
  static getInstance(): TypeBuilderManager {
    if (!TypeBuilderManager.instance) {
      TypeBuilderManager.instance = new TypeBuilderManager();
    }

    return TypeBuilderManager.instance;
  }

  private constructor() {}

  // 类型映射
  private typeBuilderConstructors: Record<string, TypeBuilderConstructor> = {
    page: PageTypeBuilder,
    button: ButtonTypeBuilder,
    input: InputTypeBuilder,
  };

  // 根据类型获取对应构造器
  getTypeBuilder(elementType: string): TypeBuilder {
    if (!this.typeBuilderConstructors.hasOwnProperty(elementType)) {
      throw new Error(`${elementType}:找不到对应类型`);
    }
    return Reflect.construct(this.typeBuilderConstructors[elementType], []);
  }

  // 添加新的类型构造器
  addTypeBuilder(
    elementType: string,
    typeBuilderConstructor: TypeBuilderConstructor
  ): void {
    if (this.typeBuilderConstructors.hasOwnProperty(elementType)) {
      console.warn(
        `当前TypeBuilderManager已经存在处理 elementType = ${elementType} 的Builder，本次添加对其覆盖。`
      );
    }
    this.typeBuilderConstructors[elementType] = typeBuilderConstructor;
  }

  // 移除指定类型的构造器
  removeTypeBuilder(elementType: string): void {
    delete this.typeBuilderConstructors[elementType];
  }

  // 获取当前存在的构造器能够处理的类型
  getHandledElementTypes(): string[] {
    return Object.keys(this.typeBuilderConstructors);
  }
}

export { TypeBuilderManager };
