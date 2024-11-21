import { render as testingLibraryRender } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';


export function render(ui) {
  return testingLibraryRender(ui, {
    wrapper: ({ children }) => (
      <MantineProvider>{children}</MantineProvider>
    ),
  });
}