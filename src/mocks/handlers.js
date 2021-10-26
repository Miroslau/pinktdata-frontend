// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';
import mockDataForPopularRooms from '../constants/mockDataForPopularRooms';

export const handlers = [
  rest.post('/api/auth/registration', (req, res, ctx) => {
    const {
      firstName, lastName, email, password,
    } = req.body;
    return res(ctx.status(200), ctx.json({
      id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
      firstName,
      lastName,
      email,
      password,
      accessToken: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
    }));
  }),
  rest.post('/api/auth/login', (req, res, ctx) => {
    const {
      email, password,
    } = req.body;

    if (email !== 'mira2408@mail.ru' || password !== 'Mira$1234') {
      return res(ctx.status(403), ctx.json({
        message: 'Invalid email or password',
      }));
    }

    return res(ctx.status(200), ctx.json({
      id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
      firstName: 'Miraslau',
      lastName: 'Rabikau',
      email,
      password,
      accessToken: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
    }));
  }),
  rest.get('/api/apartments/popular/images', (req, res, ctx) => res(ctx.status(200), ctx.json(mockDataForPopularRooms))),
  rest.get('/api/apartments/locations/most-apartments', (req, res, ctx) => res(ctx.json([
    {
      city: 'Philadelphia',
      publicAddress: 'Philadelphia, PA, United States',
      imageUrl: 'https://i.imgur.com/1Jfb8wW.jpg',
      count: 2229,
    },
    {
      city: 'Brooklyn',
      publicAddress: 'Brooklyn, NY, United States',
      imageUrl: 'https://i.imgur.com/Iib8dAg.jpg',
      count: 1589,
    },
    {
      city: 'Queens',
      publicAddress: 'Queens, NY, United States',
      imageUrl: 'https://i.imgur.com/mAKbasG.jpg',
      count: 1303,
    },
    {
      city: 'New York',
      publicAddress: 'New York, NY, United States',
      imageUrl: 'https://i.imgur.com/0yMeCVU.jpg',
      count: 1254,
    }, {
      city: 'Washington',
      publicAddress: 'Washington, DC, United States',
      imageUrl: 'https://i.imgur.com/3v3tAiB.jpg',
      count: 1184,
    }]))),
  rest.get('/api/apartments/search', (req, res, ctx) => {
    const location = req.url.searchParams.get('location');
    const apartments = [
      {
        _id: '6017d723055800005800986e',
        name: 'Free Parking guaranteed',
        img: 'https://a0.muscache.com/im/pictures/791e6c34-c71c-4090-92d4-c87a7a803162.jpg?im_w=720',
        rating: 4.85,
        reviews: 13,
        city: 'Philadelphia',
        address: 'Philadelphia, PA, United States',
        price: '$45',
        location: {
          lat: 39.93034,
          lon: -75.19131,
        },
        guestLabel: '2 guests',
      },
      {
        _id: '6017d723055800005800986f',
        name: 'Your Quiet Cozy Space in South Philly',
        img: 'https://a0.muscache.com/im/pictures/b5a928fb-9b80-44ee-8322-fcb95a3a8114.jpg?im_w=720',
        rating: 4.95,
        reviews: 114,
        city: 'Philadelphia',
        address: 'Philadelphia, PA, United States',
        price: '$29',
        location: {
          lat: 39.93009,
          lon: -75.19098,
        },
        guestLabel: '2 guests',
      },
      {
        _id: '6017db0e055800005800bdea',
        name: 'BRAND NEW Apartment in South Park Slope',
        img: 'https://a0.muscache.com/im/pictures/63d2ce8b-8786-442b-a15a-1358e8905803.jpg?im_w=720',
        rating: null,
        reviews: 0,
        city: 'Brooklyn',
        address: 'Brooklyn, NY, United States',
        price: '$74',
        location: {
          lat: 40.66028,
          lon: -73.99124,
        },
        guestLabel: '2 guests',
      },
      {
        _id: '6017db0e055800005800bdec',
        name: 'Close2Manhattan,walk2Shops ferry&subway.Clean NYC!',
        img: 'https://a0.muscache.com/im/pictures/ddf569f1-d6be-40d8-b51b-7fd162a8cd0d.jpg?im_w=720',
        rating: 4.68,
        reviews: 71,
        city: 'Brooklyn',
        address: 'Brooklyn, NY, United States',
        price: '$61',
        location: {
          lat: 40.6448,
          lon: -74.01448,
        },
        guestLabel: '3 guests',
      },
      {
        _id: '6017db9e055800005800c48c',
        name: 'NEWLY RENOVATED!!! LUCAS 1BR APT NEAR JFK/LGA',
        img: 'https://a0.muscache.com/im/pictures/506758b1-e17f-4074-bd8d-70e08cff4330.jpg?im_w=720',
        rating: 4.81,
        reviews: 103,
        city: 'Queens',
        address: 'Queens, NY, United States',
        price: '$61',
        location: {
          lat: 40.65536,
          lon: -73.74467,
        },
        guestLabel: '4 guests',
      },
      {
        _id: '6017db9e055800005800c48d',
        name: 'Homy Abode',
        img: 'https://a0.muscache.com/im/pictures/483ac329-d97e-4e3d-947f-d192c369db9f.jpg?im_w=720',
        rating: 4.98,
        reviews: 47,
        city: 'Queens',
        address: 'Queens, NY, United States',
        price: '$65',
        location: {
          lat: 40.6528,
          lon: -73.73308,
        },
        guestLabel: '2 guests',
      },
    ];
    return res(ctx.json(apartments.filter((item) => item.address === location)));
  }),
  rest.get('/api/auth/logout', (req, res, ctx) => res(ctx.status(204))),
  rest.get('/api/search/location', (req, res, ctx) => res(ctx.status(200), ctx.json({
    title: 'test',
  }))),
  rest.get('/api/search/rooms', (req, res, ctx) => {
    const images = [
      {
        image: 'https://cdn.shopify.com/s/files/1/1765/3959/collections/Screen_Shot_2021-06-30_at_9.24.07_AM_0af7c44d-82f5-4497-a242-67ef3c78e9e6_700x.png?v=1627574426',
        id: 12312,
      },
      {
        image: 'https://media.architecturaldigest.com/photos/584ada2946458b735ce19242/master/w_2957,h_1882,c_limit/wallpaper-rooms-01.jpg',
        id: 12312,
      },
      {
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/16/45/16/dd/the-mood-luxury-rooms.jpg',
        id: 12312,
      },
      {
        image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/edc-web-tour-natasha-bardaran-9-1607305891.jpg?crop=1.00xw:0.713xh;0,0.238xh&resize=1200:*',
        id: 12312,
      },
    ];

    return res(ctx.status(200), ctx.json({
      images,
    }));
  }),
];
