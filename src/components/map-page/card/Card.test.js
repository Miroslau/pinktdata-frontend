import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { Splide, SplideSlide } from '@splidejs/react-splide';

import { server } from '../../../mocks/server';
import apartments from '../../../mocks/mocks-constants/mockDataApartments';
import Card from './Card';

describe('Card Component', () => {
  process.env.REACT_APP_IS_MOCKING = true;
  const mockData = apartments[0];

  beforeAll(() => server.listen({
    onUnhandledRequest: 'error',
  }));
  afterEach(() => server.restoreHandlers());
  afterAll(() => server.close());

  it('renders card component', () => {
    render(<Card />);
  });

  it('city has in card component', async () => {
    const { findByText } = render(<Card city={mockData.city} />);
    expect(await findByText('Philadelphia')).toBeInTheDocument();
  });

  it('name has in card component', async () => {
    const { findByText } = render(<Card name={mockData.name} />);
    expect(await findByText('Free Parking guaranteed')).toBeInTheDocument();
  });

  describe('image slider', () => {
    let container;
    let unmount;

    beforeEach(() => {
      const options = {
        perPage: 1,
        perMove: 1,
        rewind: true,
        fixedWidth: '350px',
        fixedHeight: '250px',
        cover: 'true',
        pagination: true,
      };
      const component = render(
        <Splide options={options}>
          <SplideSlide><img src={mockData.images[0].picture} alt={mockData.name} /></SplideSlide>
          <SplideSlide><img src={mockData.images[1].picture} alt={mockData.name} /></SplideSlide>
        </Splide>,
      );
      container = component.container;
      unmount = component.unmount;
    });

    afterEach(() => {
      unmount();
    });

    it('should render Image Slider', () => {
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should switch slides when arrow button clicked', () => {
      const button = container.querySelector('.splide__arrow--next');
      const slides = container.querySelector('.splide__list');
      expect(slides.firstChild.classList.contains('is-active')).toBe(true);
      fireEvent.click(button);
      expect(slides.firstChild.classList.contains('is-active')).toBe(false);
      expect(slides.firstChild.classList.contains('is-prev')).toBe(true);
    });
  });
});
