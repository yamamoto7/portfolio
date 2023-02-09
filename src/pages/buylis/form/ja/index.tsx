import * as React from 'react';

const Component: React.FC = () => {
  React.useEffect(() => {
    window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLScIq5olkqW5iIw1PdxWeNKoIx9YBvcsu6YaOOwclsPywcfEbg/viewform?usp=sf_link';
  }, []);

  return null;
};

export default Component;

