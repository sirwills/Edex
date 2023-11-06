import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { BrowserRouter } from 'react-router-dom';
import {PersistGate} from 'redux-persist/integration/react'
import { persistor, store } from './redux/store';
import { Provider } from 'react-redux';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
// import HomeScreen from './components/Screens/HomeScreen';
// import Login from './components/Screens/Login';
import HomeScreen from './components/Screens/HomeScreen';
import Login from './components/Screens/Login';
import Register from './components/Screens/Register';
import PopUp from './components/popUp/PopUp';
import PopUpComment from './components/commentsComponent/PopUpComment';
// import PostsDisplay from './components/PostDisplay/PostsDisplay';

const router = createBrowserRouter(
   createRoutesFromElements(
      <Route path='/' element={<App/>}>
         <Route path='/' index={true} element={<HomeScreen/>}/>
         <Route path ="/login" element = {<Login/>}/>
         <Route path ="/register" element = {<Register/>}/>
         <Route path='/:postId/comment' element= {<PopUpComment/>}/>
         <Route path='comment/:postId/:commentId' element= {<PopUpComment/>}/>
         {/* <Route path='/:postId/comment' element= {<PostsDisplay/>}/> */}
      </Route>
   )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
   <Provider store = {store} >
    <PersistGate persistor={persistor}>
   
    <RouterProvider router={router}/>
   

    </PersistGate>

   </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
