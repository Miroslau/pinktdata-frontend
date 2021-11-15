import { useNavigate } from 'react-router-dom';

const useRedirectToMainPage = () => {
  const history = useNavigate();

  const redirectFunction = () => history('/');

  return redirectFunction;
};

export default useRedirectToMainPage;
