import React, { useContext } from 'react'; import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Rating } from '@mui/material';
import roomPreviewLocalization from '../../../../../constants/roomPreviewLocalization';
import { roomContext } from '../../../../../store/context/roomContext';
import { ratingLabels } from '../../../../../constants/ratingLabels';

const RoomStars = () => {
  const roomCtx = useContext(roomContext);
  const [value, setValue] = React.useState(roomCtx.rating);
  const [expanded, setExpanded] = React.useState('panel');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Accordion className="accordion-item" expanded={expanded === 'panel'} onChange={handleChange('panel')}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography>{roomPreviewLocalization.stars}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ display: 'flex' }}>
        <Rating
          name="size-large"
          value={value}
          size="large"
          precision={0.5}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
        <Box sx={{ ml: 2, display: 'inline-block', mt: '5px' }}>{ratingLabels[Math.ceil(value)]}</Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default RoomStars;
