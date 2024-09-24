import { BrowserRouter , Route, Routes } from "react-router-dom";

import LoginForm from "./Components/LoginForm";

import Home from "./Components/Home";

import Trending from "./Components/Trending";

import Gaming from "./Components/Gaming";

import SavedVideos from "./Components/SavedVideos";

import AllVideosDetalis from "./Components/AllVideosDetalis";

import ProtectedRoute from "./Components/ProtectedRoute";

import { useState } from "react";

import './App.css';

function App() {

  const [EachSaveVideo, setSaveVideo] = useState([])

  const handingSaveVidoes = (vidoes) => {
    setSaveVideo((prvSate) => {
      if (prvSate.find((each) => each.id === vidoes.id)){
        return prvSate
      }else{
        return [...prvSate, vidoes];
      }
    })
  }

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element = {<LoginForm/>}/>
      <Route element = {<ProtectedRoute/>}>
        <Route exact path="/" element = {<Home/>}/>
        <Route exact path="/trending" element = { <Trending/>} />
        <Route exact path="/gaming" element = { <Gaming/>} />
        <Route exact path="/savedVideos" element = { <SavedVideos  EachSaveVideo = {EachSaveVideo}/>} />
        <Route exact path="/:id" element = { <AllVideosDetalis onSavedVideos = {handingSaveVidoes}/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    
  )
}

export default App;


