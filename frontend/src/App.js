import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import toast, {Toaster} from "react-hot-toast"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDataProduct } from './redux/productSlice';
// for animation after successful login -> react-hot-toast dependency used


function App() {

  // fetch the products 
  // see app.get("/product") in backend
  const dispatch = useDispatch()
  const productData = useSelector((state)=>state.product)
  
  useEffect(()=>{
    //immediate callback
    (async()=>{
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/product`)
      // we need in json format
      const resData = await res.json()
      // console.log(resData)
      // resData is coming from server
      dispatch(setDataProduct(resData))
      // now in payload all the data will be coming
    })()
    // can see the data coming in home page console
  },[])

  // console.log(productData)
  return (
    <>
    <Toaster />
    <div>
      <Header />
      <main className='pt-16 bg-slate-100 min-h-[calc(100vh)]'>
        {/* 100vh will help cover the body completely */}
        {/* padding given so that the content can be displayed ignoring the navbar*/}
        {/* when we click the link we get route to that page */}
        <Outlet />
      </main>
    </div>
    </>
  );
}

export default App;
