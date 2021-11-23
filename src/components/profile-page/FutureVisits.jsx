import React, { useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom';
import useStyles from './Profile.style';
import getFutureRooms from '../../api/future-rooms/getFutureRooms';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const FutureVisits = function () {
  const [bedroomData, setBedroomData] = React.useState([]);

  const history = useNavigate();
  const useRedirectToPreviewPageById = (pageId) => {
    const redirectFunction = () => history(`/apartments/${pageId}`);
    return redirectFunction;
  };

  useEffect(async () => {
    const { data } = await getFutureRooms.futureRooms();
    setBedroomData(data);
  }, [bedroomData]);

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
              {bedroomData.map((item) => (
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
