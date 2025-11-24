import _ from "lodash";

export function mergeRecursive<T extends Object>(...args: Partial<T>[]): T {
    let obj = {};
    args.forEach(mergeObj => {
        _.merge(obj, mergeObj)
    });
    return obj as T;
}