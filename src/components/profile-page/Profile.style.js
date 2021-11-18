import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  wrapper: {
    padding: '120px 20px 0',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: 'lightslategray',
  },
  box: {
    position: 'relative',
    padding: '10px 30px',
    marginBottom: '20px',
  },
  subtitle: {
    color: 'black',
  },
});

export default useStyles;
