import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  wrapper: {
    height: '100vh',
    overflow: 'hidden',
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'row',
    paddingTop: '90px',
    justifyContent: 'space-between',
  },
  mapContentWrapper: {
    height: '100vh',
    width: '45.2vw',
    padding: '46px 0',
    overflow: 'hidden',
  },
  mapWrapper: {
    overflow: 'scroll',
    overflowX: 'hidden',
    transition: 'ease 0.5s',
    height: '100vh',
    '&:hover': {
      '-webkit-overflow-scrolling': 'touch',
      '-moz-overflow-scrolling': 'touch',
      '-ms-overflow-scrolling': 'touch',
      '-o-overflow-scrolling': 'touch',
      overflowScrolling: 'touch',
      '&::-webkit-scrollbar-thumb': {
        borderRadius: '4px',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        '&::-webkit-box-shadow': '0 0 1px rgba(255,255,255,0.5)',
      },
    },
    '&::-webkit-scrollbar': {
      '-webkit-appearance': 'none',
      width: '7px',
    },

  },
  mapContent: {
    padding: '0 40px',
    margin: '17px 0',
  },
  contentImgSlider: {
    width: '350px',
    height: '250px',
    marginRight: '20px',
  },
  mapTabs: {
    margin: '27px 0',
  },
  userIcon: {
    fontSize: '38px',
  },
  userBlock: {
    backgroundColor: '#E7E7E7 !important',
    color: 'black !important',
    textTransform: 'capitalize !important',
  },
  divider: {
    backgroundColor: 'rgba(0, 0, 0, 0.09)',
    width: '1px',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dialog: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    alignItems: 'center',
  },
  filter: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    alignItems: 'center',
    width: '400px',
  },
  contentData: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: '1rem',
    width: '505px',
    padding: '0 0 0 20px',
  },
  dataRight: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dataText: {
    marginBottom: '32px',
    columnGap: '10px',
  },
  toggleButton: {
    borderLeft: '4px',
    borderRadius: '4px',
    borderColor: 'black',
  },
  contentImg: {
    width: '300px',
    height: '300px',
    marginBottom: '-90px',
  },
  img: {
    objectFit: 'cover',
    width: '100%',
    maxHeight: '70%',
    borderRadius: '10px',
  },
  city: {
    color: 'grey',
    paddingBottom: '10px',
  },
  address: {
    color: 'grey',
    padding: '10px 0 20px 0',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  available: {
    padding: '10px 0',
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
  },
  starIcon: {
    color: '#FFD700',
  },
  reviews: {
    color: 'grey',
  },
  price: {
    fontSize: '1.3rem',
    fontWeight: '600',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  heart: {
    display: 'block',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  name: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

export default useStyles;
