import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vitest } from 'vitest';

import Home from './Home';

const mockedUseNavigate = vitest.fn();
vitest.mock("react-router-dom", async () => {
  const mod = await vitest.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  };
});

describe('Home', () => {
  it('renders Home component', () => {
    render(<Home />);

    screen.getByRole('link');
    expect(screen.getByText(/Login/)).toBeInTheDocument();
  });
});