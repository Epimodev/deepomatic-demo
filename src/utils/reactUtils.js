// @flow
import * as React from 'react';

/**
 * Check if a react element is a specific component
 * We use defaultProps to check if component are equals because
 * child.type is a clone of component with some additional props like "displayName"
 * @param {*} child - React element
 * @param {*} component - React component
 */
export function childIsComponent(child: React.Element<*>, component: React.ComponentType<*>) {
  if (child.type && child.type.defaultProps && component.defaultProps) {
    return child.type.defaultProps === component.defaultProps;
  }
  if (!component.defaultProps) {
    console.warn(`Default props is missing in "childIsComponent"
    Check component ${component.name}
    `);
  }
  return false;
}
