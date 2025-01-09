
import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./layout/firebase/auth";
import "./index.scss";
import Loader from './layout/layoutcomponent/loaders';
import { Routingdata } from './common/routingdata';
import { GoogleOAuthProvider } from "@react-oauth/google"
import { ProtectedRoutes } from './common/utilities/protectedRoute';
import { isAuthorizedRoute } from './common/utilities/authorizedRoute';
import { AuthContextProvider, useAuth } from './common/utilities/authContext';




const App = React.lazy(() => import("./layout/App"));
const Custompages = React.lazy(() => import("./layout/custompages"));

//pages
const SignUp = React.lazy(() =>
  import("./components/pages/authentication/signup/signup")
);
const SignIn = React.lazy(() =>
  import("./components/pages/authentication/signin/signin")
);
const ForgotPassword = React.lazy(() =>
  import("./components/pages/authentication/forgotpassword/forgotpassword")
);
const Lockscreen = React.lazy(() =>
  import("./components/pages/authentication/lockscreen/lockscreen")
);
const ResetPassword = React.lazy(() =>
  import("./components/pages/authentication/resetpassword/resetpassword")
);
const Error404 = React.lazy(() =>
  import("./components/pages/authentication/404error/404error")
);
const Error500 = React.lazy(() =>
  import("./components/pages/authentication/500error/500error")
);
const VerifyEmail = React.lazy(() =>
  import("./components/pages/authentication/verifyemail/verifyemail")
)

//Form
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const Main=()=>{
const { allowedRoute } = useAuth();


return(
  <React.Fragment>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <React.Suspense fallback={<Loader />}>
          <Routes>
            <Route path={`${import.meta.env.BASE_URL}`} element={<Auth />}>
              <Route index element={<SignIn />} />
            </Route>
            <Route path={`${import.meta.env.BASE_URL}`} element={<ProtectedRoutes><App /></ProtectedRoutes>} >
              {Routingdata.map((idx,index) => (
                <Route path={idx.path} element={isAuthorizedRoute( allowedRoute, idx.path) ? (
                  <ProtectedRoutes>{idx.element}</ProtectedRoutes>
                ) : (
                  <Navigate to="/" replace />
                )} key={index} />
              ))}
            </Route>
            <Route path={`${import.meta.env.BASE_URL}`} element={<Custompages />}>
              <Route path={`${import.meta.env.BASE_URL}pages/authentication/sigin`} element={<SignIn />} />
              <Route path={`${import.meta.env.BASE_URL}pages/authentication/sigup`} element={<SignUp />} />
              <Route path={`${import.meta.env.BASE_URL}pages/authentication/forgotpassword`} element={<ForgotPassword />} />
              <Route path={`${import.meta.env.BASE_URL}/resetpassword`} element={<ResetPassword />} />
              <Route path={`${import.meta.env.BASE_URL}verifyemail`} element={<VerifyEmail />} />
              <Route path={`${import.meta.env.BASE_URL}pages/authentication/lockscreen`} element={<Lockscreen />} />
              <Route path={`${import.meta.env.BASE_URL}pages/authentication/404error`} element={<Error404 />} />
              <Route path={`${import.meta.env.BASE_URL}pages/authentication/500error`} element={<Error500 />} />

              <Route path="*" element={<Error404 />} />
            </Route>
            <Route></Route>
          </Routes>
        </React.Suspense>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </React.Fragment>
);
}

root.render(
  <AuthContextProvider>
    <Main />
  </AuthContextProvider>
);

