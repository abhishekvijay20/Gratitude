import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  text: {
    color: '#5b5b5b'
  },
  title: {
    fontFamily: 'Gloria Hallelujah, curive',
    marginBottom: '4px',
    backgroundColor: '#F3DBE9',
    fontSize: '15px',
    color: 'gray'
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    fontFamily: 'Lato, sans-serif',
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
  webSearchBtn: {
    margin: '10px 0'
  },
  switch: {
    display: 'flex', 
    alignItems: 'center' 
  }
}));