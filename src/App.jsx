import NavBar from './components/Navbar/';
import LoginSection from './components/Pages/loginSection';
import SignUpSection from './components/Pages/signUpSection';
import HomeSection from './components/Pages/HomeSection';
import Dashboard from './components/Pages/Dashboard';

import './styles/index.scss';
import {Route, Switch} from 'react-router-dom';

// Prime react
import 'primereact/resources/themes/saga-purple/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path='/' exact>
          <HomeSection />
        </Route>
        <Route path='/login'>
          <LoginSection />
        </Route>
        <Route path='/signup'>
          <SignUpSection />
        </Route>
        <Route path='/dashboard'>
          <Dashboard />
        </Route>
      </Switch>
    </div>
  );
}
export default App;
