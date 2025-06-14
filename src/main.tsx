
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
import { Provider } from 'react-redux';
import store from './common/store/store';




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
const ComplaintStatus = React.lazy(() =>
  import("./components/pages/authentication/complaintstatus/complaintstatus")
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

const PrivacyPolicy = React.lazy(() =>
  import("./components/pages/authentication/privacypolicy/privacypolicy")
)

const GatePassApproval = React.lazy(() =>
  import("./components/pages/authentication/gatepassapproval/gatepassapproval")
)

const CelebrationBooking = React.lazy(() =>
  import("./components/pages/authentication/celebrationbooking/celebrationbooking")
)

const Cheque = React.lazy(() =>
  import("./components/pages/authentication/cheque/cheque")
)

const FlatResale = React.lazy(() =>
  import("./components/pages/authentication/flatresale/flatresale")
)
const DocumentSubmission = React.lazy(() =>
  import("./components/pages/authentication/documentsubmission/documentsubmission")
)

const Approve = React.lazy(() =>
  import("./components/pages/authentication/approve/approve")
)

//Form
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const Main = () => {
  const { allowedRoute } = useAuth();


  return (
    <React.Fragment>
      <BrowserRouter>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <React.Suspense fallback={<Loader />}>
            <Routes>
              <Route path={`${import.meta.env.BASE_URL}`} element={<Auth />}>
                <Route index element={<SignIn />} />
              </Route>
              <Route path={`${import.meta.env.BASE_URL}`} element={<ProtectedRoutes><App /></ProtectedRoutes>} >
                {Routingdata.map((idx, index) => (
                  <Route path={idx.path} element={isAuthorizedRoute(allowedRoute, idx.path) ? (
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
                <Route path={`${import.meta.env.BASE_URL}complaintstatus`} element={<ComplaintStatus />} />
                <Route path={`${import.meta.env.BASE_URL}pages/authentication/404error`} element={<Error404 />} />
                <Route path={`${import.meta.env.BASE_URL}pages/authentication/500error`} element={<Error500 />} />
                <Route path={`${import.meta.env.BASE_URL}pages/authentication/privacypolicy`} element={<PrivacyPolicy />} />
                <Route path={`${import.meta.env.BASE_URL}gatepassapproval`} element={<GatePassApproval />} />
                <Route path={`${import.meta.env.BASE_URL}celebrationbooking`} element={<CelebrationBooking />} />
                <Route path={`${import.meta.env.BASE_URL}cheque`} element={<Cheque />} />
                <Route path={`${import.meta.env.BASE_URL}flatresale`} element={<FlatResale />} />
                <Route path={`${import.meta.env.BASE_URL}documentsubmission`} element={<DocumentSubmission />} />
                <Route path={`${import.meta.env.BASE_URL}ap`} element={<Approve />} />
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
  <Provider store={store}>
    <AuthContextProvider>
      <Main />
    </AuthContextProvider>
  </Provider>
);

