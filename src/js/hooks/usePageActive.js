import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

export default function usePageActive(routeStr) {

  const [pageActive, setPageActive] = useState();
  const location = useLocation()

  useEffect(() => {
      setPageActive(location.pathname === routeStr);
  }, [location.pathname, routeStr]);

  return pageActive
}