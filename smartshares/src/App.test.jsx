import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { it } from 'vitest';
import App from './App';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

it('renders without crashing', async () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  await act(async () => root.render(<App />));
  root.unmount();
});
