import React from 'react';
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import { api } from '../utils/api';
import * as auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoToltipPopupOpen, setIsInfoToltipPopupOpen] = React.useState(false);

  const [loggedIn, setLoggedIn] = React.useState(false)
  const [userData, setUserData] = React.useState({})
  const history = useHistory();

  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);


  React.useEffect(() => {
    Promise.all([api.getUserProfile(), api.getInitialCards()])
      .then(([user, data]) => {
        setCurrentUser(user);
        setCards(data);
      })
      .catch((error) => {
        console.log(error);
      });
      checkToken();
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      history.push('/main');
    }
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleInfoTooltipClick() {
    setIsInfoToltipPopupOpen(true)
  }

  function handleCardClick(item) {
    setSelectedCard(item);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoToltipPopupOpen(false)
    setSelectedCard({});
  }

  function handleOverlayClose(evt) {
    const evtTarget = evt.target;
    if (evtTarget.classList.contains('popup')) {
      closeAllPopups();
    }
  }

  function handleUpdateUser(data) {
    api.setUserProfile(data)
      .then((dataInfo) => {
        setCurrentUser(dataInfo);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUpdateAvatar(data, onSuccess) {
    api.setUserAvatar(data)
      .then((dataAvatar) => {
        setCurrentUser(dataAvatar);
        closeAllPopups();
        onSuccess();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleAddPlaceSubmit(data, onSuccess) {
    api.addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
        onSuccess();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCardDelete(card) {
    api.removeCard(card._id)
      .then(() => {
        setCards((state) => state.filter(c => c._id !== card._id))
      })
      .catch((error) => {
        console.log(error);
      }); 
  }

  function handleRegister({ password, email }) {
    auth.register(password, email)
      .then(user => {
        const { data } = user;
        const { _id, email } = data;
        setUserData({
          _id, email
        });
        setLoggedIn(true);
        handleInfoTooltipClick();
      })
     .catch(error => {
      console.log(error);
      handleInfoTooltipClick();
     });
       
  }

  function handleLogin({ password, email })  {
    auth.authorize(password, email)
      .then(data => {
        localStorage.setItem('jwt', data.token)
        setLoggedIn(true);
        checkToken();
      })
      .catch(error => console.log(error));
  }

  function checkToken() {
    const jwt = localStorage.getItem('jwt')

    if (jwt) {
      auth.getContent(jwt)
        .then(user => {
          const { data } = user;
          const { _id, email } = data;
          setUserData({
            _id, email
          });
          setLoggedIn(true);
        })
        .catch(error => console.log(error));
    }
  }

  function handleLogout() {
    setUserData({});
    setLoggedIn(false);
    localStorage.removeItem('jwt');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="body">
        <div className="page">
          
          <Switch>
            <ProtectedRoute path='/main' component={Main} loggedIn={loggedIn} userData={userData} handleLogout={handleLogout} onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} cards={cards}>
            </ProtectedRoute>
            <Route path="/signup">
              <Register handleRegister={handleRegister} />
            </Route>
            <Route path="/signin">
              <Login handleLogin={handleLogin} />
            </Route>
            <Route exact path="/">
              {loggedIn ? <Redirect to="/main" /> : <Redirect to="/signin" />}
            </Route>
          </Switch>

          <InfoTooltip isOpen={isInfoToltipPopupOpen} loggedIn={loggedIn} handleClickClose={handleOverlayClose} onClose={closeAllPopups} />
            
          <ImagePopup card={selectedCard} handleClickClose={handleOverlayClose} onClose={closeAllPopups} />

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} handleClickClose={handleOverlayClose} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} /> 

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} handleClickClose={handleOverlayClose} onUpdateUser={handleUpdateUser} /> 

          <AddPlacePopup isOpen={isAddPlacePopupOpen} handleClickClose={handleOverlayClose} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        </div>

      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
