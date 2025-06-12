import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const CouponCleaner = () => {
  const location = useLocation();
  const prevPath = useRef(location.pathname);

  useEffect(() => {

    if (location.pathname !== '/check-out') {
      localStorage.removeItem('appliedCoupon');
    }

    prevPath.current = location.pathname;
  }, [location.pathname]);

  return null;
};

export default CouponCleaner;
