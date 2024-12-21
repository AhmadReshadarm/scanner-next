'use client';

// import { ErrorBoundary } from 'react-error-boundary';

function FallbackRender({ error, resetErrorBoundary }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p>Что-то пошло не так:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
      <button onClick={() => resetErrorBoundary()}>Перезагрузить</button>
    </div>
  );
}

export default FallbackRender;
