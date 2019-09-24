import React, { lazy, Suspense } from "react";

import LoadingIndicator from "../core/LoadingIndicator";

export default <T extends React.ComponentType<Props>, Props = any>(promise: () => Promise<{ default: T }>) => {
  const Component = lazy(promise);
  return (props: any) => {
    return (
      <Suspense fallback={<LoadingIndicator />}>
        <Component {...props} />
      </Suspense>
    );
  };
};

// export default (promise) =>
//   Loadable({
//     loader: () => {
//       return promise().catch((ex) => {
//         console.trace(ex);
//         throw ex;
//       });
//     },
//     loading: LoadingIndicator,
//   });
