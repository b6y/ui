import nanoid from "nanoid";

export const genid = (name: string, id?: string) => {
  if (id) {
    return `${id}-${nanoid()}`;
  }

  return `${name}-${nanoid()}`;
};
