import React from 'react';
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import AddPlacePopup from './AddPlacePopup';
import DelPlacePopup from './DelPlacePopup';
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
  const [isDelPlacePopupOpen, setDelPlacePopupOpen] = React.useState(false);
  const [tooltipStatus, setTooltipStatus] = React.useState();

  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cardForDelete, setCardForDelete] = React.useState(null);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [email, setEmail] = React.useState('');
  
  const history = useHistory();

  React.useEffect(() => {
    if(loggedIn) {
      Promise.all([api.getUserProfile(), api.getInitialCards()])
      .then(([user, data]) => {
        setCurrentUser(user);
        setCards(data.reverse());
        history.push('/main')
      })
      .catch((error) => {
        console.log(error);
      });
    }
    checkToken();
  }, [history, loggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(item) {
    setSelectedCard(item);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setTooltipStatus();
    setDelPlacePopupOpen(false);
    setSelectedCard({});
  }

  React.useEffect(() => {

    function handleEscClose(evt) {
      const ESC_KEYCODE = 'Escape';
      evt.key === ESC_KEYCODE && closeAllPopups();
    }

    function handleOverlayClose(evt) {
      const evtTarget = evt.target;
      if (evtTarget.classList.contains('popup')) {
        closeAllPopups();
      }
    }

    window.addEventListener('keydown', handleEscClose);
    window.addEventListener('click', handleOverlayClose);

    return () => {
      window.removeEventListener('click', handleOverlayClose);
      window.removeEventListener('keydown', handleEscClose);
    };

  }, []);

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
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCardDeleteRequest(card) {
    setDelPlacePopupOpen(true);
    setCardForDelete(card)
  }

  function handleCardDelete() {
    api.removeCard(cardForDelete._id)
      .then(() => {
        setCards((state) => state.filter(c => c._id !== cardForDelete._id));
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      }); 
  }

  function handleRegister({ email, password }) {
    auth.register(email, password)
      .then(user => {
        history.push('/signin')
        setTooltipStatus({
          text: 'Вы успешно зарегистрировались', 
          iconType: 'success'
        });
        
      })
     .catch(error => {
      console.log(error);
      setTooltipStatus({
        text: 'Что-то пошло не так!  Попробуйте ещё раз.', 
        iconType: 'error'
      });
     });
  }

  function handleLogin({ email, password })  {
    auth.authorize(email, password)
      .then(data => {
        localStorage.setItem('jwt', data.token)
        setLoggedIn(true);
        setEmail(email);
      })
      .catch(error => console.log(error));
  }

  function checkToken() {
    const jwt = localStorage.getItem('jwt')

    if (jwt) {
      auth.getContent(jwt)
        .then(user => {
          const { email } = user;
          setEmail(email);
          setLoggedIn(true);
        })
        .catch(error => console.log(error));
    }
  }

  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="body">
        <div className="page">
          <Header email={email} onSignOut={handleLogout} />
          <Switch>
            <ProtectedRoute path='/main' component={Main} loggedIn={loggedIn} onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDeleteRequest} cards={cards}>
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

          <InfoTooltip isOpen={!!tooltipStatus} status={tooltipStatus} loggedIn={loggedIn} onClose={closeAllPopups} />
            
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} /> 

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} /> 

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

          <DelPlacePopup isOpen={isDelPlacePopupOpen} onClose={closeAllPopups} onDelPlace={handleCardDelete} />

        </div>

      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
