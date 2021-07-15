"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStackedVisitor = void 0;
/**
 * Generic item/parent visitor providing a stack of the parents,
 * and callbacks when pushing/popping the stack.
 */
function createStackedVisitor(visitor, onPush, onPop) {
    const stack = [];
    let curr;
    return (item, parent) => {
        // stack/de-stack
        if (parent !== undefined && parent === curr) {
            stack.push(parent);
            onPush === null || onPush === void 0 ? void 0 : onPush(parent, stack);
        }
        else {
            let last = stack.length;
            while (last > 0 && stack[--last] !== parent) {
                const closed = stack.pop();
                onPop === null || onPop === void 0 ? void 0 : onPop(closed, stack);
            }
        }
        curr = item;
        visitor(item, stack);
    };
}
exports.createStackedVisitor = createStackedVisitor;
//# sourceMappingURL=stackedVisitor.js.map