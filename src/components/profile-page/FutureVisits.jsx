import React, { } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
// import { uniqueId } from 'lodash';
import useStyles from './Profile.style';
import useRedirectToPreviewPageById from '../../hooks/useRedirectToPreviewPageById';
// import getFutureRooms from '../../api/popular-future-rooms/getFutureRooms';
// import useMountedState from '../../hooks/useMountedState';

const futureRooms = [
  {
    img: 'https://media-cdn.tripadvisor.com/media/photo-s/16/45/16/dd/the-mood-luxury-rooms.jpg',
    name: 'Free Parking guaranteed',
    data: '11/11/2021 - 16/11/2021',
    id: '6017d723055800005800986e',
  },
  {
    img: 'https://media.architecturaldigest.com/photos/584ada2946458b735ce19242/master/w_2957,h_1882,c_limit/wallpaper-rooms-01.jpg',
    name: 'Close to Everything the Poconos has to Offer',
    data: '11/09/2021',
    id: '6017d723055800005800986f',
  },
  {
    img: 'https://media-cdn.tripadvisor.com/media/photo-s/16/45/16/dd/the-mood-luxury-rooms.jpg',
    name: 'Cottage by the Water',
    data: '11/10/2021',
    id: '6017d7240558000058009872',
  },
  {
    img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/edc-web-tour-natasha-bardaran-9-1607305891.jpg',
    name: 'The J-Spot - A Great value in the Poconos',
    data: '14/10/2021',
    id: '6017d7240558000058009873',
  },
  {
    img: 'https://media-cdn.tripadvisor.com/media/photo-s/16/45/16/dd/the-mood-luxury-rooms.jpg',
    name: 'Poconos Hideaway @ A Great Value (up to 4 guests)',
    data: '03/10/2021',
    id: '6017d723055800005800986e',
  },
  {
    img: 'https://media.architecturaldigest.com/photos/584ada2946458b735ce19242/master/w_2957,h_1882,c_limit/wallpaper-rooms-01.jpg',
    name: 'The J-Spot - A Great value in the Poconos',
    data: '19/4/2021',
    id: '6017d723055800005800986e',
  },
];

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const FutureVisits = function () {
  // const hasMounted = useMountedState();
  // const [majorCities, setMajorCities] = useState([]);

  const classes = useStyles();
  return (
    <Box sx={{ width: '100%' }} className={classes.box}>
      <Typography variant="subtitle1" gutterBottom component="div" className={classes.subtitle}>
        Upcoming Trips
      </Typography>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Item>
            <ImageList sx={{ width: 500, height: 450 }}>
              <ImageListItem key="Subheader" cols={2}>
                <ListSubheader component="div">List of future visits</ListSubheader>
              </ImageListItem>
              {futureRooms.map((item) => (
                <ImageListItem key={item.img}>
                  <img
                    src={`${item.img}?w=248&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.name}
                    loading="lazy"
                    title={item.name}
                  />
                  <ImageListItemBar
                    title={item.name}
                    subtitle={item.data}
                    actionIcon={(
                      <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        aria-label={`info about ${item.name}`}
                        onClick={useRedirectToPreviewPageById(item.id)}
                      >
                        <InfoIcon />
                      </IconButton>
                      )}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            2
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>3</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>4</Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FutureVisits;
