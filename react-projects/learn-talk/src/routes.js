import {
  AddMobile,
  ConfirmEmail,
  ConfirmMobileInApp,
  ComfirmMobile,
  EnterPassword,
  Home,
  LoginApple,
  RegisterAccount,
  Rule,
  SetPasswordOk,
  SetPassword,
  UpdateMobileApple,
  UpdateMobile,
} from './pages'

const routes = [
  { path: '/', element: <Home /> },
  {
    path: 'talk',
    children: [
      { path: 'addMobile', element: <AddMobile /> },
      { path: 'confirmEmail', element: <ConfirmEmail /> },
      { path: 'confirmMobile', element: <ComfirmMobile /> },
      { path: 'confirmMobileInApp', element: <ConfirmMobileInApp /> },
      { path: 'enterPassword', element: <EnterPassword /> },
      { path: 'loginAppleBlank', element: <LoginApple /> },
      { path: 'registerAccount', element: <RegisterAccount /> },
      { path: 'rule', element: <Rule /> },
      { path: 'setPassword', element: <SetPassword /> },
      { path: 'setPasswordOk', element: <SetPasswordOk /> },
      { path: 'updateMobile', element: <UpdateMobile /> },
      { path: 'updateMobileApple', element: <UpdateMobileApple /> },
    ],
  },
]

export default routes
