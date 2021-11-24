import React, { useContext } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import roomPreviewLocalization from '../../../../constants/roomPreviewLocalization';
import { roomContext } from '../../../../store/context/roomContext';
import { NO_REVIEW } from '../../../../constants/reviews';

const LIST_STYLE = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
  fontSize: 12,
};
const TYPOGRAPHY_STYLE = { display: 'inline', fontSize: 12, fontWeight: 'bold' };

const RoomReviews = function () {
  const { review } = useContext(roomContext);
  return (
    <div className="room-component room-reviews">
      <h4>
        {review?.length ? `${review.length} ${roomPreviewLocalization.reviews}` : NO_REVIEW}
      </h4>
      <List sx={LIST_STYLE}>
        {review?.map((el) => (
          <ListItem alignItems="flex-start" key={el.id}>
            <ListItemText
              secondary={(
                <div style={{
                  fontSize: 12,
                }}
                >
                  <Typography
                    sx={TYPOGRAPHY_STYLE}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {el.name}
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
