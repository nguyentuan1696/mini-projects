import React, { useState, useRef, useEffect, useMemo } from 'react'
import { Link, Redirect } from 'react-router-dom'

import Validate from '../../utilities/Validate'
import Constant from '../../utilities/Constant'
import CustomScroll from '../../utilities/CustomScroll'

const HomePage = ({ location }) =>
{
  // GET STATE

  // MANAGEMENT LOCAL STATE
  const [account, setAccount] = useState(null)
  const [error, setError] = useState(null)
  const [data, setData] = useState('')
  const [popUp, setPopUp] = useState(false)
  const [quickLogin, setQuickLogin] = useState(false)
  const [login, setLogin] = useState('')
  const [loading, setLoading] = useState(false)
  const [accCookie, setAccCookie] = useState(null)
  const [userInfoCookie, setUserInfoCookie] = useState({
    avatar: '',
    fullname: '',
    username: '',
  })

  let myRef = useRef(null)

  // Handle Cookies
  useEffect(() => {
    if (accCookie) return handleAccCookie()
  }, [accCookie])
  const handleAccCookie = () => {
    if (!accCookie) {
      setError('Vui lòng nhập Số điện thoại/Email.')
      Validate.sendError(
        'login',
        '',
        window.location.href,
        Constant.API_BASE_URL + 'checkLoginInfo',
        '',
        '',
        'Vui lòng nhập Số điện thoại/Email.'
      )
      setLoading(false)
      return
    }
  }


  const getCallBack = () => {
    if (!accCookie) {
      setError('Có lỗi xảy ra. Vui lòng thử lại')
      return
    }

    const data = JSON.stringify({
      acc: accCookie,
    })

    const dataKibana = JSON.stringify({
      acc: accCookie,
    })

    Validate.sendSuccess(
      'click-getCallBack',
      accCookie,
      window.location.href,
      Constant.API_BASE_URL + 'getCallBack',
      data,
      (error, dataRes) => {
        if (error) {
          setError('Đường truyền mạng không ổn định. Vui lòng thử lại.')
          Validate.sendError(
            'successLogin',
            accCookie,
            window.location.href,
            Constant.API_BASE_URL + 'getCallBack',
            JSON.stringify(data),
            'Đường truyền mạng không ổn định. Vui lòng thử lại.',
            JSON.stringify(dataRes)
          )
        }

        if (!error) {
          Validate.sendSuccess(
            'successLogin',
            accCookie,
            window.location.href,
            Constant.API_BASE_URL + 'getCallBack',
            JSON.stringify(data),
            JSON.stringify(dataRes)
          )
          if (dataRes.signal !== 0) {
            if (Validate.validateMobile(accCookie)) {
              window.sendActionToNative('type_login:mobile')
            } else {
              window.sendActionToNative('type_login: email')
            }
            setLogin(false)
          } else {
            setError('Có lỗi xảy ra. Vui lòng thử lại')
          }
        }
      }
    )
  }

  // BAT DAU CAC HAM SU LI CAC SU KIEN

  // ham close popup neu nguoi dung dang nhap lai
  const closePopUpCookie = () => {
    setUserInfoCookie(null)
    setAccCookie(null)
  }

  const handleLogin = () =>
  {
    setLoading(true)
    
    if (!account) {
      setError('Vui lòng nhập Số điện thoại/Email.')

      Validate.sendError(
        'login',
        '',
        window.location.href,
        Constant.API_BASE_URL + 'checkpass',
        '',
        '',
        'Vui lòng nhập Số điện thoại/Email.'
      )

      setLoading(false)

      return

      
  }


  // 1. Button submit
  useEffect(() => {
    if (accCookie) handleAccCookie()
  }, [accCookie])
  const buttonContinue = useMemo(() => {
    if (loading) return loadingSpinner()
    return 'Tiếp tục'
  }, [loading])

  const loadingSpinner = () => {
    return (
      <div className='lds-ring'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    )
  }

  const showQuickLoginCookie = () => {
    const avatar =
      userInfoCookie && userInfoCookie.avatar ? userInfoCookie.avatar : ''
    const username =
      userInfoCookie && userInfoCookie.username ? userInfoCookie.username : ''
    const fullname =
      userInfoCookie && userInfoCookie.fullname ? userInfoCookie.fullname : ''

    if (username || fullname) {
      return (
        <div className='modal-wrapper'>
          <div className='modal-content'>
            <div className='new-phone-modal paddingT24'>
              <div className='modal-header-new-phone marginB24'>
                <div className='info-user small'>
                  <img src={avatar} alt='Lotus' className='avatar-user' />
                  <div className='info'>
                    <h5 className='username'>
                      {fullname ? fullname : username}
                    </h5>
                    <p className='email'>{accCookie}</p>
                  </div>
                </div>
              </div>

              <div className='modal-body-new-phone'>
                <p className='color16161F'>
                  Tài khoản này đang được đăng nhập trên thiết bị hiện tại. Bạn
                  có muốn đi tới tài khoản này không?
                </p>
                <button
                  className='submit-btn btn-login login-index marginB31'
                  onClick={() => getCallBack()}
                >
                  Đi tới tài khoản này
                </button>
              </div>

              <div className='modal-footer-new-phone'>
                <hr className='marginB31' />
                <span>Hoặc</span>
                <p
                  className='register-index color616161'
                  onClick={() => closePopUpCookie()}
                >
                  Hủy
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  const handleBack = () => {
    if (window && window.sendActionToNative) {
      return window.sendActionToNative('exit_login')
    }
  }

  const dataState = {
    acc: account ? account.toLowerCase() : '',
    from: 'index',
    hasMobile:
      data && data.data & data.data.hasmobile ? data.data.hasmobile : false,
  }

  if (data.signal === 2 || login.signal === 2) {
    return (
      <Redirect to={{ pathname: '/talk/confirmMobile', state: dataState }} />
    )
  }

  if (data.signal === 3 || login.signal === 3) {
    return (
      <Redirect to={{ pathname: '/talk/confirmEmail', state: dataState }} />
    )
  }

  if (data.signal === 1 || login.signal === 4) {
    return (
      <Redirect to={{ pathname: '/talk/enterPassword', state: data.data }} />
    )
  }

  if (data.signal === 7) {
    return (
      <Redirect to={{ pathname: '/talk/updateMobile', state: dataState }} />
    )
  }

  if (login.signal === 1) {
    return window.location.replace(
      login.data ? login.data : Constant.REDIRECT_URL
    )
  }

  if (!data.signal || !login.signal) {
    let className = error ? 'input-danger enter-txt' : 'enter-txt'
    let srcImg = 'https://mingid.mediacdn.vn/king/image/logo-vietid.png'

    return (
      <div className='wrapper-enter-phone'>
        <div className='img-back' onClick={() => handleBack()}>
          <img
            src='https://mingid.mediacdn.vn/king/image/back.png'
            alt='back-button'
          />
        </div>

        <div className='img-logo'>
          <img src={srcImg} alt='lotus' />
        </div>

        <div className='title'>
          Đăng nhập tài khoản của bạn để tiếp tục sử dụng Lotus Chat
        </div>

        <div className='wrapper-input'>
          <input
            type='text'
            name='account'
            placeholder='Nhập số điện thoại hoặc Email'
            defaultValue={account ? account : ''}
            ref={myRef}
            onChange={(event) => handleChange(event.target.value)}
          />
        </div>
      </div>
    )
  }

  // Loading - Spinner
  return <h1>Homepage</h1>
}

export default HomePage
