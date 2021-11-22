import React, { useContext } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import roomPreviewLocalization from '../../../../constants/roomPreviewLocalization';
import { roomContext } from '../../../../store/context/roomContext';
import { ReviewForm } from './ReviewForm';

const RoomReviews = function () {
  const roomCtx = useContext(roomContext);
  return (
    <div className="room-component">
      <ReviewForm />
      <h4>
        {' '}
        {roomCtx.review?.length && roomCtx.review?.length }
        {' '}
        {roomCtx.review?.length ? roomPreviewLocalization.reviews : 'No reviews (yet)'}
      </h4>
      <List sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        fontSize: 12,
      }}
      >
        {roomCtx.review?.map((el) => (
          <ListItem alignItems="flex-start">
            <ListItemText
              secondary={(
                <div style={{
                  fontSize: 12,
                }}
                >
                  <Typography
                    sx={{ display: 'inline', fontSize: 12, fontWeight: 'bold' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {el.name }
                  </Typography>
                  -
                  {' '}
                  {el.comment}
                </div>
                            )}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default RoomReviews;
