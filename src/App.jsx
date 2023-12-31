import {BrowserRouter} from 'react-router-dom';
import RouteApp from "./routes/routes";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App(){
  return(
    <BrowserRouter>
    <ToastContainer autoClose={3000} />
      <RouteApp/>
    </BrowserRouter>
  );
}