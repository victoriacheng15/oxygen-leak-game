'use client'

import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import the P5Sketch component with SSR disabled
const P5Sketch = dynamic(() => import('./components/P5Sketch'), {
  ssr: false, // Disable server-side rendering for this component
});

const HomePage = () => {
  return (
    <P5Sketch />

  );
};

export default HomePage;