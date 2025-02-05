
/* 
  Helper functions to convert between camelCase (server internal) and snake_case (client messages)
*/

// Convert a camelCase string to snake_case.
const toSnakeCase = (str: string): string =>
    str.replace(/[A-Z]/g, letter => "_" + letter.toLowerCase());

// Recursively convert all keys in an object from camelCase to snake_case.
export const convertKeysToSnakeCase = (obj: any): any => {
    if (Array.isArray(obj)) {
        return obj.map(item => convertKeysToSnakeCase(item));
    } else if (obj !== null && typeof obj === "object") {
        const newObj: any = {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const snakeKey = toSnakeCase(key);
                newObj[snakeKey] = convertKeysToSnakeCase(obj[key]);
            }
        }
        return newObj;
    }
    return obj;
};

// Convert a snake_case string to camelCase.
const toCamelCase = (str: string): string =>
    str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

// Recursively convert all keys in an object from snake_case to camelCase.
export const convertKeysToCamelCase = (obj: any): any => {
    if (Array.isArray(obj)) {
        return obj.map(item => convertKeysToCamelCase(item));
    } else if (obj !== null && typeof obj === "object") {
        const newObj: any = {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const camelKey = toCamelCase(key);
                newObj[camelKey] = convertKeysToCamelCase(obj[key]);
            }
        }
        return newObj;
    }
    return obj;
};