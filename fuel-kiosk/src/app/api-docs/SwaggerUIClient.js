'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import SwaggerErrorBoundary from './SwaggerErrorBoundary';
import 'swagger-ui-react/swagger-ui.css';
import './swagger-ui-custom.css';

// Dynamically import SwaggerUI with no SSR
const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export default function SwaggerUIClient() {
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    fetch('/api/docs')
      .then(res => res.json())
      .then(data => setSpec(data))
      .catch(err => console.error('Error loading API docs:', err));
  }, []);

  if (!spec) {
    return <div>Loading API documentation...</div>;
  }

  return (
    <SwaggerErrorBoundary>
      <SwaggerUI 
        spec={spec}
        defaultModelsExpandDepth={-1} // Hide schemas by default
        docExpansion="list" // Show operations collapsed
      />
    </SwaggerErrorBoundary>
  );
} 