import { useState,useEffect } from 'react'
import './App.css'
import { storage } from './filrebase'
import { ref, uploadBytes,listAll,getDownloadURL } from 'firebase/storage'
import {v4} from 'uuid'


import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Button, ImageList, ImageListItem, Alert } from '@mui/material';


function App() {

  // State
const [imageUpload,setImageUpload] = useState(null);
const [imageList,setImageList] = useState([])
const [load,setLoad] = useState(false)

// Uploade Images
const uploadImage = () => {
  if(imageUpload == null) return;
  const imageRef = ref(storage,`images/${imageUpload + v4() }`)   // ที่อยู่ของโฟลเดอร์
  uploadBytes(imageRef, imageUpload).then((snapshot) => {
   getDownloadURL(snapshot.ref).then((url) => {
    setImageList((prev) => [...prev,url])
    setLoad(true)
    setTimeout(() => {
      setLoad(false);
    }, 4000);
   })
  })
}

// Download Images
const imageListRef = ref(storage, 'images/')

useEffect(() => {
  listAll(imageListRef).then((response) => {
    response.items.forEach((item) => {
      getDownloadURL(item).then((url) => {
        setLoad(true)
        setImageList((prev) => [...prev,url]);
        setLoad(false)
      })
    })
  })
},[])

  return (
    <div>
      <div className='headder'>
      <h1 style={{marginBottom:"10px"}}>Firebase Storage</h1> <p style={{fontSize:"13px",color:"#848484"}}>Created by ridwan</p>
      <input className='form-control' type="file" onChange={(e) => setImageUpload(e.target.files[0])} />
      <Button style={{marginTop:"1rem",marginBottom:"1rem"}} variant='contained' onClick={uploadImage}>Uploade file</Button> 

      {imageUpload ? (
        load ? (
          <Alert severity="success">อัพโหลดรูปภาพสำเร็จ</Alert>
        ) : (
          <Alert severity="info">ในการอัพโหลดรูปภาพต้องใช้เวลาสักครู่</Alert>
        )
      ) :null }
            </div>
      
      <ImageList variant="masonry" cols={3} gap={8}>
      {imageList.map((url) => {
       return <ImageListItem key={url} >
       <img
          src={`${url}?w=248&fit=crop&auto=format`}
          srcSet={`${url}?w=248&fit=crop&auto=format&dpr=2 2x`}
          alt={url}
          loading="lazy"
       />
     </ImageListItem>
      })}
      </ImageList>
    </div>
  )
}

export default App
