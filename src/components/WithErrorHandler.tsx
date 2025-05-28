import { ParentComponent } from '~/types/general';
import React from 'react';
import { ErrorRouteComponent, NotFoundRouteComponent } from '@tanstack/react-router';

interface Props {
  notFoundComponent?: NotFoundRouteComponent;
  errorComponent?: ErrorRouteComponent | false | null;
  error: Error & { isNotFound: boolean } | Error | null;
}
export const WithErrorHandler: ParentComponent<Props> = ({ errorComponent: ErrorComponent, notFoundComponent: NotFoundComponent, error, children }) => {
  if (error) {
    if ('isNotFound' in error && error.isNotFound) {
      return NotFoundComponent ? <NotFoundComponent data={{}} /> : null;
    }
    return ErrorComponent ? <ErrorComponent reset={() => {}} error={error} /> : null;
  }
  return children
}