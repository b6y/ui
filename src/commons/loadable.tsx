import React, { lazy, Suspense } from "react";

import { LoadingIndicator } from "../core/LoadingIndicator";

export const Loadable = <T extends React.ComponentType<Props>, Props = any>(promise: () => Promise<{ default: T }>) => {
  const Component = lazy(promise);
  return (props: any) => {
    return (
      <Suspense fallback={<LoadingIndicator />}>
        <Component {...props} />
      </Suspense>
    );
  };
};
