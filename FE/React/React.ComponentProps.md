To get the props type from an existing React component in TypeScript, you can use the React.ComponentProps utility type. This is particularly useful when you need to reuse the prop types of a component, especially if you don't have direct access to its original prop type definition (e.g., if it's from a third-party library).
Here's how to use it: For a custom React component.
TypeScript

    import type { ComponentProps } from 'react';

    // Assume you have a component defined like this:
    interface MyComponentProps {
      name: string;
      age?: number;
      isLoggedIn: boolean;
    }

    const MyComponent = (props: MyComponentProps) => {
      // ... component logic
      return <div>Hello, {props.name}</div>;
    };

    // To get the props type from MyComponent:
    type ExtractedMyComponentProps = ComponentProps<typeof MyComponent>;

    // ExtractedMyComponentProps will be equivalent to MyComponentProps
    const exampleProps: ExtractedMyComponentProps = {
      name: "Alice",
      isLoggedIn: true
    };
For a built-in HTML element (e.g., button, div):
TypeScript

    import type { ComponentProps } from 'react';

    // To get the props type for a standard HTML button element:
    type ButtonElementProps = ComponentProps<'button'>;

    // ButtonElementProps will contain all standard HTML button attributes
    const buttonProps: ButtonElementProps = {
      onClick: () => console.log("Clicked!"),
      disabled: false,
      type: "submit"
    };
Explanation:
ComponentProps<T> is a generic type provided by React.
When you pass typeof MyComponent (for a custom component) or a string literal like 'button' (for a DOM element), TypeScript infers and extracts the corresponding prop types.
This allows you to create new types that are based on the props of existing components, promoting type safety and reusability.
Extracting a specific prop's type:
You can also extract the type of a specific prop from a component's props using indexed access:
TypeScript

import type { ComponentProps } from 'react';

// Using the MyComponent example from above
type MyComponentNamePropType = ComponentProps<typeof MyComponent>['name']; // This will be 'string'
----------------------------
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
