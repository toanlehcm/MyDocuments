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