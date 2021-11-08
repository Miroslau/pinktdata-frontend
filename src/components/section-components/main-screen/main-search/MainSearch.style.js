import { makeStyles } from '@mui/styles';
import { PINK_COLOR, GREY_COLOR, BLUE_COLOR } from '../../../../constants/colors';

const useStyles = makeStyles({
  form: {
    display: 'flex',
    padding: '2rem',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    boxShadow: '1px 1px 25px 13px rgba(34, 60, 80, 0.14)',
    borderRadius: '1rem',
    margin: '0 auto',
    marginTop: '4rem',
  },
  locationWrapper: {
    width: 200,
    display: 'flex',
  },
  location: {
    '& .MuiInput-root:before': {
      border: 'none',
    },
  },
  date: {
    width: 200,
    borderLeft: `1px solid ${GREY_COLOR}`,
    '& .MuiInputLabel-root': {
      marginTop: '1rem',
      marginLeft: '2.2rem',
      fontSize: '22px',
      fontWeight: 'bold',
    },
    '& .MuiOutlinedInput-root': {
      flexDirection: 'row-reverse',
    },
    '& .MuiOutlinedInput-root .MuiOutlinedInput-input': {
      padding: 0,
      marginTop: '33px',
      marginLeft: '13px',
    },
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  },
  bedroom: {
    width: 200,
    borderLeft: `1px solid ${GREY_COLOR}`,
    cursor: 'pointer',
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '& #input-search-bedrooms': {
      width: 130,
      cursor: 'pointer',
    },
  },
  roomIcon: {
    marginTop: 17,
    marginRight: 10,
    color: GREY_COLOR,
  },
  searchButton: {
    borderRadius: '.6rem',
    backgroundColor: `${PINK_COLOR} !important`,
    '&:hover': {
      backgroundColor: `${BLUE_COLOR} !important`,
    },
  },
  searchButtonDisabled: {
    borderRadius: '.6rem',
    backgroundColor: `${GREY_COLOR} !important`,
    opacity: '0.5',
    '&:hover': {
      backgroundColor: `${GREY_COLOR} !important`,
    },
  },
});

export default useStyles;
