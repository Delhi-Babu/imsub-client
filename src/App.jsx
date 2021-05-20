import NavBar from './components/Navbar/';
import LoginSection from './components/Pages/loginSection';
import SignUpSection from './components/Pages/signUpSection';
import HomeSection from './components/Pages/HomeSection';
import Dashboard from './components/Pages/Dashboard';
import Logout from './components/Pages/logout.jsx';

import './styles/index.scss';
import {Route, Switch, Redirect} from 'react-router-dom';

// Prime react
import 'primereact/resources/themes/saga-purple/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import {useSelector} from 'react-redux';

function App() {
  const isAuthenticated = useSelector(store => store.auth.isAuthenticated);
  return (
    <div>
      <NavBar />
      {console.log(isAuthenticated)}
      <Switch>
        <Route path='/' exact>
          <HomeSection />
        </Route>
        <Route path='/login'>
          {isAuthenticated ? <Redirect to='/dashboard' /> : <LoginSection />}
        </Route>
        <Route path='/signup'>
          {isAuthenticated ? <Redirect to='/dashboard' /> : <SignUpSection />}
        </Route>
        <Route path='/dashboard'>
          {isAuthenticated ? <Dashboard /> : <Redirect to='/login' />}
        </Route>
        <Route path='/logout'>
          {isAuthenticated ? <Logout /> : <Redirect to='/login' />}
        </Route>
      </Switch>
    </div>
  );
}
export default App;
