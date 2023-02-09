import * as React from 'react';
import { BrowserRouter, Routes, Route, Redirect } from "react-router-dom";

const Component: React.FC = () => {
return 
  <BrowserRouter>
    <Routes>
      <Route path="/" component={<div>sss</div>}>
        <Redirect to="https://forms.gle/pyYhgqJsHXvNohs49" />
      </Route>
    </Routes>
  </BrowserRouter>
};

export default Component;

