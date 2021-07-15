export interface BscType {
    isAssignableTo(targetType: BscType): boolean;
    isConvertibleTo(targetType: BscType): boolean;
    toString(): string;
}
