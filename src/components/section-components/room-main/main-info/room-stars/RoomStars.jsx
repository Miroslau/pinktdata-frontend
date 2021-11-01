import React from 'react'; import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Rating } from '@mui/material';
import roomPreviewLocalization from '../../../../../constants/roomPreviewLocalization';

const RoomStars = () => (
  <Accordion className="accordion-item">
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
    >
      <Typography>{roomPreviewLocalization.stars}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Rating name="size-large" defaultValue={5} size="large" />
    </AccordionDetails>
  </Accordion>
);

export default RoomStars;
