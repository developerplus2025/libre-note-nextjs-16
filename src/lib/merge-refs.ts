import type * as React from 'react';

export function mergeRefs<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref && 'current' in ref) {
        try {
          (ref as React.MutableRefObject<T | null>).current = value;
        } catch {
          // ignore if ref is not mutable
        }
      }
    });
  };
}
