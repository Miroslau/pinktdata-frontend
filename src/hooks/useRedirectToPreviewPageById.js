import { useHistory } from 'react-router-dom';

const useRedirectToPreviewPageById = (pageId) => {
  const history = useHistory();

  const redirectFunction = () => history.push(`/apartments/${pageId}`);

  return redirectFunction;
};

export default useRedirectToPreviewPageById;
