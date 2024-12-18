import { useEffect } from 'react';

import { handleRouteChangeComplete } from './utils/handle-route-change-complete';
import { useRouter } from '@tanstack/react-router';

export function useTransitionRouterEvents() {
  const router = useRouter();

  useEffect(() => {
    router.subscribe('onLoad', () => {
      handleRouteChangeComplete(router.history.location.state.key);
    })
  }, []);
}