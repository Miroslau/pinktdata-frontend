import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Tabs from './Tabs';

describe('Tabs Component', () => {
  const elementsTabs = {
    isActiveModal: false,
    setModalActive: true,
  };
  it('renders tabs component', () => {
    render(
      <Tabs
        isActiveModal={elementsTabs.isActiveModal}
        setModalActive={(value) => { elementsTabs.setModalActive(value); }}
      />,
    );
  });

  it('button "all" has in component', () => {
    render(
      <Tabs
        isActiveModal={elementsTabs.isActiveModal}
        setModalActive={(value) => { elementsTabs.setModalActive(value); }}
      />,
    );
    const allButton = screen.getByTestId('all');
    expect(allButton).toBeInTheDocument();
  });
});
