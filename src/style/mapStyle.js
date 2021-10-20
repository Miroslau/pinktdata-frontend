import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mapContentWrapper: {
    width: '45.2vw',
    padding: '46px 0',
  },
  mapContent: {
    padding: '0 40px',
    margin: '17px 0',
  },
  mapTabs: {
    margin: '27px 0',
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
  contentData: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: '1rem',
    width: '505px',
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
  map: {
    width: '53.8vw',
    height: '100vh',
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
  },
  heart: {
    display: 'block',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  // heartHover: {
  //   display: 'none',
  // },
});

export default useStyles;
