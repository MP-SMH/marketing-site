import React from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import ForeningPage from '@/pages/ForeningPage';
import PageNotFound from '@/lib/PageNotFound';

// The production App remains unchanged. This entry is selected only for the scoped Deploy Preview.
export function ProfilePreviewRoutes(){
 return <Routes>
  <Route path="/forening/:slug" element={<ForeningPage/>}/>
  <Route path="*" element={<PageNotFound/>}/>
 </Routes>;
}
export default function ProfilePreviewApp(){
 return <BrowserRouter><ProfilePreviewRoutes/></BrowserRouter>;
}
