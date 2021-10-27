import '@testing-library/jest-dom';
import {
  render,
} from '@testing-library/react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Card from './Card';
import apartments from '../../../mocks/mocks-constants/mockDataApartments';

describe('Card component', () => {
  let unmount;
  const mockData = apartments[0];

  beforeEach(() => {
    const { unmount: currentUnmount } = render(<Card
      id={mockData._id}
      name={mockData.name}
      img={mockData.img}
      rating={mockData.rating}
      reviews={mockData.reviews}
      city={mockData.city}
      address={mockData.address}
      price={mockData.price}
      homeDetails={mockData.guestLabel}
      images={mockData.images}
    />);
    unmount = currentUnmount;
  });

  afterEach(() => {
    unmount();
  });

  it('should render Image Slider', () => {
    const options = {
      perPage: 1,
      perMove: 1,
      rewind: true,
      fixedWidth: '350px',
      fixedHeight: '250px',
      cover: 'true',
      pagination: true,
    };
    // eslint-disable-next-line max-len
    render(<Splide options={options}><SplideSlide><img src={mockData.images[0].picture} alt={mockData.name} /></SplideSlide></Splide>);
  });
});
