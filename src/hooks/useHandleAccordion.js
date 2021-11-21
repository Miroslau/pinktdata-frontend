import { useState } from 'react';

const useHandleAccordion = () => {
  const [expanded, setExpanded] = useState(true);

  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };

  return {
    expanded, handleAccordionChange,
  };
};

export default useHandleAccordion;
