import * as React from 'react';

const Component: React.FC = () => {
  React.useEffect(() => {
    window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSd348HvOthOtcODUkDo_HYG8QR9S_JdkdsmKPVJCHB2xBaQTA/viewform?usp=sf_link';
  }, []);

  return null;
};

export default Component;

