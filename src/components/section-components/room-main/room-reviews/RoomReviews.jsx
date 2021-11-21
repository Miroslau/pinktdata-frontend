import React, { useContext } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import roomPreviewLocalization from '../../../../constants/roomPreviewLocalization';
import { roomContext } from '../../../../store/context/roomContext';

const RoomReviews = function () {
  const roomCtx = useContext(roomContext);
  return (
    <div className="room-component">
      <h1>
        {' '}
        {roomCtx?.review.length}
        {' '}
        {roomPreviewLocalization.reviews}
      </h1>
      <List sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        fontSize: 14,
      }}
      >
        {roomCtx?.review.map((el) => (
          <ListItem alignItems="flex-start">
            <ListItemText
              secondary={(
                <div>
                  <Typography
                    sx={{ display: 'inline' }}
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
