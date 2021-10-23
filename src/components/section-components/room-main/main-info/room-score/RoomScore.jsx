import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import roomPreviewLocalization from '../../../../../constants/roomPreviewLocalization';

const RoomScore = () => (
  <Accordion className="accordion-item">
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
    >
      <Typography>{roomPreviewLocalization.reviewScore}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        {roomPreviewLocalization.loremText}
      </Typography>
    </AccordionDetails>
  </Accordion>
);

export default RoomScore;
