import React from 'react';
import './App.css';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Users } from './components/Users/Users';
import { Autification } from './components/Autification/Autification';
import { Registration } from './components/Registration/Registration';
import { EditUser } from './components/EditUser/EditUser';
import { DeleteUser } from './components/DeleteUser/DeleteUser';


function App() {
  const { token } = useSelector(state => state.authReducer);

  return (
    <div className="App">
      <Header />
      <main className="main">
        <Switch>
          {token 
            ? (
              <>
                <Route exact path="/users" render={() => <Users />} />
                <Route exact path="/registration" render={() => <Registration />} />
                <Route path="/users/:id" render={() => <EditUser />} />
                <Route path="*" render={() => <Redirect to="/users" />} />
              </>
            )
            : (
              <>
                <Route exact path="/auth" render={() => <Autification /> } />
                <Route path="*" render={() => <Redirect to="/auth" />} />
              </>
            )
          }
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
