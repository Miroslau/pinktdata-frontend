import React, { useContext } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import roomPreviewLocalization from '../../../../../constants/roomPreviewLocalization';
import { roomContext } from '../../../../../store/context/roomContext';

const RoomAmenities = () => {
  const roomCtx = useContext(roomContext);
  const [expanded, setExpanded] = React.useState('panel');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Accordion className="accordion-item" expanded={expanded === 'panel'} onChange={handleChange('panel')}>
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
