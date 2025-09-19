ComponentPropsWithoutRef: PropsWithoutRef<ComponentProps<T>>
Used to retrieve the props a component accepts without its ref. Can either be passed a string, indicating a DOM element (e.g. 'div', 'span', etc.) or the type of a React component.

Type Parameters
T extends React.ElementType
See
React TypeScript Cheatsheet

Example
// Retrieves the props an 'input' element accepts
type InputProps = React.ComponentPropsWithoutRef<'input'>;
Copy
Example
const MyComponent = (props: { foo: number, bar: string }) => <div />;

// Retrieves the props 'MyComponent' accepts
type MyComponentPropsWithoutRef = React.ComponentPropsWithoutRef<typeof MyComponent>;