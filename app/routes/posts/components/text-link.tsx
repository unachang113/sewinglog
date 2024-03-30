type Properties = {
  readonly path: string;
};

export function TextLink({path}: Properties) {
  return <a href={path}>Click me</a>;
}
