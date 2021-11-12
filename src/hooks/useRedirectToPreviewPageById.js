import { useNavigate } from 'react-router-dom';

const useRedirectToPreviewPageById = (pageId) => {
  const history = useNavigate();

  const redirectFunction = () => history(`/apartments/${pageId}`);

  return redirectFunction;
};

export default useRedirectToPreviewPageById;
