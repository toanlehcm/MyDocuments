React.ComponentProps is a utility type provided by React when using TypeScript, designed to extract the prop types of a React component or a standard HTML element. This type significantly simplifies prop management and ensures type safety in React applications.
How React.ComponentProps is used:
Extracting Props from HTML Elements.
It can be used to get the props of any standard HTML element by passing the element's tag name as a string literal.
TypeScript

    import { ComponentProps } from "react";

    type ButtonProps = ComponentProps<"button">;
    // ButtonProps will now include all standard HTML button attributes like onClick, type, disabled, etc.
Extracting Props from React Components.
It can also be used to extract the prop types of a custom React component. This is achieved by passing the component's type using typeof.
TypeScript

    import { ComponentProps } from "react";

    interface MyCustomComponentProps {
      text: string;
      value: number;
    }

    const MyCustomComponent = (props: MyCustomComponentProps) => {
      // ... component logic
      return <div>{props.text} - {props.value}</div>;
    };

    type ExtractedProps = ComponentProps<typeof MyCustomComponent>;
    // ExtractedProps will be equivalent to MyCustomComponentProps
Including ref Types.
ComponentProps can also be used in conjunction with ref types, particularly when dealing with components that forward refs or when needing to type the ref prop for a DOM element.
Benefits of using React.ComponentProps:
Type Safety: Ensures that components receive the correct types of props, reducing runtime errors.
Code Reusability: Facilitates the reuse of prop definitions across different components, avoiding manual redefinition.
Improved Developer Experience: Enhances autocompletion and type checking in IDEs, making development smoother.
Simplified Maintenance: Centralizes prop definitions, making it easier to manage and update prop types.
--
https://www.totaltypescript.com/react-component-props-type-helper
https://www.totaltypescript.com/tutorials/beginners-typescript/beginner-s-typescript-section/implicit-any-type-error