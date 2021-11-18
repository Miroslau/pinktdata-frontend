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
  modalTitle: {
    background: '#1976d2',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    borderRadius: '5px',
    marginBottom: '20px',
  },
  modalForm: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '20px',
  },
  buttonForm: {
    justifyContent: 'center',
  },
});

export default useStyles;
