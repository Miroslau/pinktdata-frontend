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
    width: '45.2vw',
    overflowX: 'hidden',
  },
  mapWrapper: {
    transition: 'ease 0.5s',
  },
  loadDivider: {
    display: 'block',
    height: '50px',
  },
  mapContent: {
    position: 'sticky',
    background: '#ffffff',
    zIndex: '10',
    top: '0',
    padding: '15px 40px',
    borderBottom: '1px solid #cdcdcd',
  },
  cardContent: {
    padding: '15px 40px',
  },
  contentImgSlider: {
    width: '300px',
    height: '200px',
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
