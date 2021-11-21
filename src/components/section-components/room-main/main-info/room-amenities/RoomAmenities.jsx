import React, { useContext } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import roomPreviewLocalization from '../../../../../constants/roomPreviewLocalization';
import { roomContext } from '../../../../../store/context/roomContext';
import useHandleAccordion from '../../../../../hooks/useHandleAccordion';

const RoomAmenities = function () {
  const roomCtx = useContext(roomContext);
  const { expanded, handleAccordionChange } = useHandleAccordion();

  return (
    <Accordion className="accordion-item" expanded={expanded} onChange={handleAccordionChange}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography>{roomPreviewLocalization.amenities}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {roomCtx.bathroomLabel}
          <br />
          {roomCtx.bedroomLabel}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default RoomAmenities;
