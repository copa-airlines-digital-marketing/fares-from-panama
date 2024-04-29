import { any, equals } from "ramda";

export const isAnyTrue = any(equals(true))