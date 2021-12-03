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
    position: 'relative',
    width: '45.2vw',
    overflowX: 'hidden',
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
  logoIcon: {
    fontSize: '3rem !important',
    color: 'red',
  },
  mapWrapper: {
    position: 'relative',
    transition: 'ease 0.5s',
  },
  map: {
    position: 'relative',
  },
  emptyData: {
    display: 'inline-flex',
    rowGap: '5px',
    fontSize: '32px',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
  },
  searchSize: {
    fontSize: '1.3rem !important',
  },
  iconSize: {
    fontSize: '10rem !important',
  },
  loadDivider: {
    padding: '20px 20px',
    display: 'block',
    height: '50px',
  },
  mapLoader: {
    position: 'absolute',
    width: '450px',
    left: '50%',
    padding: '20px 20px',
    transform: 'translate(-50%, 0)',
    zIndex: '30',
  },
  fetchBar: {
    position: 'absolute',
    left: '50%',
    top: '70px',
    display: 'inline-flex',
    justifyContent: 'center',
    columnGap: '5px',
    alignItems: 'center',
    padding: '10px !important',
    borderRadius: '8px',
    transform: 'translate(-50%, 0)',
    background: '#ffffff',
    zIndex: '30',
  },
  checkbox: {
    padding: '0 !important',
  },
  contentLoader: {
    position: 'absolute',
    left: '0',
    bottom: '0',
    width: '100%',
    zIndex: '30',
    background: '#ffffff',
  },
  linear: {
    height: '12px !important',
    borderRadius: '5px !important',
  },
  lContainer: {
    zIndex: '25',
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
    cursor: 'pointer',
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
    cursor: 'pointer',
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
  // Modal for add new room
  modalWrapper: {
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
  modalForm: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '20px',
  },
  buttonForm: {
    justifyContent: 'center',
  },
  uploadBtn: {
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'space-around',
    border: '1px solid lightgray',
    borderRadius: '5px',
    height: '100%',
    textAlign: 'center',
  },
  textField: {
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileUpload: {
    maxWidth: '100%',
    marginTop: '20px',
    border: 'dashed 2px lightgray',
  },
});

export default useStyles;
