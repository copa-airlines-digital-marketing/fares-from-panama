import { any, isEmpty } from "ramda";

export const isAnyEmpty = (...args: unknown[]) => any(isEmpty, args)