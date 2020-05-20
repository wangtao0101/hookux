import * as React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

export function forwardComponent(
  forwardRef: any,
  Component: any,
  WrappedComponent: any,
  name: any
) {
  // @ts-ignore
  Component.WrappedComponent = WrappedComponent;
  const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  const displayName = `${name}(${wrappedComponentName})`;
  // @ts-ignore
  Component.displayName = displayName;

  if (forwardRef) {
    const forwarded: any = React.forwardRef(function(props, ref) {
      return <Component {...props} forwardedRef={ref} />;
    });

    forwarded.displayName = displayName;
    forwarded.WrappedComponent = WrappedComponent;
    return hoistNonReactStatic(forwarded, WrappedComponent);
  }

  return hoistNonReactStatic(Component, WrappedComponent);
}
