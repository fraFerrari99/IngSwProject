import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
        textDecoration: 'none',
        color: 'rgba(255,255,255)',
      },
      menuIcon: {
        color: 'rgba(255,255,255)',
      },
      primaryButton: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
      },
      purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
      },
      userName: {
        display: 'flex',
        alignItems: 'center',
      },
      profile: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '300px',
      },
}));