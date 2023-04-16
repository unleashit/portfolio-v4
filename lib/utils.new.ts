export const findKeyWithValue = <T extends Record<string, unknown>>(
  objs: T[],
  prop: keyof T,
  title: string
) => {
  const found = objs.find(
    (obj) => (obj[prop] as string).toLowerCase() === title.toLowerCase()
  );
  if (!found) {
    throw new Error(`Couldn't find '${title}' block`);
  }
  return found;
};

// shallow equality
export function arrayEquals<T extends unknown[]>(a: T, b: T) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

export const sluggify = (toSlug: string) =>
  toSlug
    .trim()
    .split(' ')
    .join('-')
    .replace(/[^a-zA-Z_-]/g, '')
    .toLowerCase();
