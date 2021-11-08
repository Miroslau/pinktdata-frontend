import { useHistory } from 'react-router-dom';

const useRedirectToMainPage = () => {
  const history = useHistory();

  const redirectFunction = () => history.push('/');

  return redirectFunction;
};

export default useRedirectToMainPage;
