// routes
import Router from "./routes";
// theme
import ThemeProvider from './theme';
// components
import ThemeSettings from './components/settings';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar } from "./redux/slices/app";


const vertical = "bottom";
const horizontal = "center";

function App() {
  const dispatch = useDispatch();
  const {open,message,severity} = useSelector((state)=>state.app.snackbar)
  return (
    <>
    <ThemeProvider>
        <ThemeSettings>
          {" "}
          <Router />{" "}
        </ThemeSettings>
      </ThemeProvider>
      {message && open ? 
      <Snackbar 
      anchorOrigin={{vertical,horizontal}} 
      open={open} 
      autoHideDuration={4000}
      key={vertical+horizontal}
      onClose={()=>{dispatch(closeSnackbar())}}>
        <Alert severity={severity}
              sx = {{width:"100%"}}>
              {message}
        </Alert>
      </Snackbar>
      :<></>
     }
     </> 
  );
}

export default App;
