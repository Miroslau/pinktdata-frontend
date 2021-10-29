import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tabs from './Tabs';

describe('Tabs Component', () => {
  let isActiveModal = false;
  const apartmentFilter = () => {};
  const setModalActive = () => true;

  it('renders component tabs', () => {
    render(<Tabs apartmentFilter={apartmentFilter} />);
  });

  it('open modal on click button Filters', async () => {
    isActiveModal = setModalActive();

    render(<Tabs
      apartmentFilter={apartmentFilter}
      isActiveModal={isActiveModal}
      setModalActive={setModalActive}
    />);
    const button = screen.getByText('Filters');

    userEvent.click(button);

    const result = await screen.getByText('Price range');

    expect(result).toBeInTheDocument();
  });

  it('close modal on click button close', async () => {
    isActiveModal = setModalActive();

    const { rerender } = render(<Tabs
      apartmentFilter={apartmentFilter}
      isActiveModal={isActiveModal}
      setModalActive={setModalActive}
    />);

    const button = screen.getByText('Filters');

    userEvent.click(button);

    const closeButton = await screen.getByLabelText('remove', { selector: 'button' });

    userEvent.click(closeButton);

    isActiveModal = false;

    rerender(<Tabs
      apartmentFilter={apartmentFilter}
      isActiveModal={isActiveModal}
      setModalActive={setModalActive}
    />);

    const resultText = await screen.getByText('Price');

    console.log(resultText);

    expect(resultText).toBeInTheDocument();
  });
});
