/**
 * Generic item/parent visitor providing a stack of the parents,
 * and callbacks when pushing/popping the stack.
 */
export declare function createStackedVisitor<T>(visitor: (item: T, stack: T[]) => void, onPush?: (item: T, stack: T[]) => void, onPop?: (item: T, stack: T[]) => void): (item: T, parent?: T) => void;
