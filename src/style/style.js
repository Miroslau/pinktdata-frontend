import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mapContentWrapper: {
    width: '51.2vw',
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
    alignItems: 'center',
  },
  contentData: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: '1rem',
  },
  dataRight: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  dataText: {
    marginBottom: '56px',
  },
  toggleButton: {
    borderLeft: '4px',
    borderRadius: '4px',
    borderColor: 'black',
  },
  map: {
    width: '48.8vw',
    height: '100vh',
  },
});

export default useStyles;
