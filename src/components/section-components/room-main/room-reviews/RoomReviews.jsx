import React, { useContext, useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { uniqueId } from 'lodash';
import roomPreviewLocalization from '../../../../constants/roomPreviewLocalization';
import { roomContext } from '../../../../store/context/roomContext';
import { NO_REVIEW } from '../../../../constants/reviews';
import reviewsAPI from '../../../../api/reviews/reviewsAPI';
import { ReviewForm } from './ReviewForm';

const LIST_STYLE = {
  width: '100%',
  maxWidth: 360,
  height: 450,
  bgcolor: 'background.paper',
  fontSize: 14,
  overflowY: 'auto',
};
const TYPOGRAPHY_STYLE = { display: 'inline', fontSize: 14, fontWeight: 'bold' };

const RoomReviews = function () {
  const { reviews } = useContext(roomContext);
  const [comments, setComments] = useState(reviews);
  const [isActiveModal, setModalActive] = useState(false);

  const addReview = (comment) => {
    reviewsAPI.review(comment)
      .then(({ data }) => {
        const { listing } = data;
        const { reviews: newReviews } = listing;
        setComments(newReviews);
        setModalActive(false);
      })
      .catch((err) => {
        setModalActive(false);
        return err.message;
      });
  };

  useEffect(() => {}, [comments]);

  return (
    <div className="room-component">
      <Grid
        container
        justifyContent="space-around"
        alignItems="center"
      >
        <Typography variant="h6">
          {comments?.length ? `${comments.length} ${roomPreviewLocalization.reviews}` : NO_REVIEW}
        </Typography>
        <ReviewForm
          addComment={addReview}
          isActiveModal={isActiveModal}
          modalToggle={(value) => setModalActive(value)}
        />
      </Grid>
      <List sx={LIST_STYLE}>
        {comments?.map((el) => (
          <ListItem alignItems="flex-start" key={uniqueId()}>
            <ListItemText
              secondary={(
                <div style={{
                  fontSize: 14,
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
