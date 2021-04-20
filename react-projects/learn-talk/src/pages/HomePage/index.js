import React, { useState, useRef, useEffect, useMemo } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import Validate from '../../utilities/Validate'
import Constant from '../../utilities/Constant'
import CustomScroll from '../../utilities/CustomScroll'

const HomePage = () => {
  const dispatch = useDispatch()
  // get gia tri accounnt luu tren global store
  const tmp_data = ''
  // const tmp_data = useSelector(({accountStore}) => accountStore.values)

  const [error, setError] = useState(null)
  let [account, setAccount] = useState('')
      const [login, setLogin] = useState('')
  const [accCookie, setAccCookie] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState('')
  const [popUp, setPopUp] = useState(false)
  const [quickLogin, setQuickLogin] = useState(false)
  const [userInfoCookie, setUserInfoCookie] = useState({
    avatar : '',
    fullname: '',
    username: ''
  })
  const myRef = useRef(null)


  const accProps = ''

  useEffect(() => {
    CustomScroll.scrollToTop()
    if (accProps) setAccount(accProps)
  }, [])

  useEffect(() => {
    if (tmp_data) setAccount(tmp_data.acc)
  }, [tmp_data])

  const showQuickLoginCookie = () =>
  {
    let avatar = (userInfoCookie && userInfoCookie.avatar) ? userInfoCookie.avatar : ''
    let username = (userInfoCookie && userInfoCookie.username) ? userInfoCookie. username : ''
    let fullname = (userInfoCookie && userInfoCookie.fullname) ? userInfoCookie.fullname: ''
  }


  
    let dataState = {
      acc: account ? account.toLowerCase() : '',
      from: 'index',
      hasMobile:
        data && data.data && data.data.hasmobile ? data.data.hasmobile : false,
    }
  /* Handle event back button */
  const handleBack = () => {
    if (window && window.sendActionToNative)
      window.sendActionToNative('exit-login')
  }
  /* Handle event change input */
  const handleChange = (e) => {
    setAccount(e)
    setError('')
    setAccCookie(null)
  }

  /* Handle event login */
  const handleLogin = () => {
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

    account = account.trim()
    account = account.toLowerCase()

    Validate.sendSuccess(
      'click-login',
      account,
      window.location.href,
      Constant.API_BASE_URL + 'checkpass',
      'success'
    )

    let isMobile = false
    if (/^\d+$/.test(account) && Validate.validateMobile(account)) {
      isMobile = true
    }

    if (/^\d+$/.test(account) && !isMobile) {
      setError(
        'Đây không phải số điện thoại hợp lệ. Vui lòng nhập lại số điện thoại của bạn'
      )
      Validate.sendError(
        'login',
        account,
        window.localtion.href,
        Constant.API_BASE_URL + 'checkpass',
        '',
        '',
        'Đây không phải số điện thoại hợp lệ. Vui lòng nhập lại số điện thoại của bạn'
      )
      setLoading(false)
      return
    }

    if (!Validate.validateEmail(account) && !isMobile) {
      let text_err = 'Email của bạn không đúng. Vui lòng nhập lại Email của bạn'
      setError(text_err)
      Validate.sendError(
        'login',
        account,
        window.location.href,
        Constant.API_BASE_URL + 'checkpass',
        '',
        '',
        text_err
      )
      setLoading(false)
      return
    }

    if (window.ee) window.ee.addListener('secureSDK', getSecure)
    window.sendActionToNative(account)
  }

  const getSecure = (cb) => {
    const data = JSON.stringify({
      acc: account.toLocaleLowerCase()
        ? account.toLocaleLowerCase()
        : accProps.toLocaleLowerCase(),
      dataNative: cb,
    })

    Validate.requestPost(
      Constant.API_BASE_URL + 'checkpass',
      data,
      function (error, dataRes) {
        if (window.ee) {
          window.ee.removeListener('secureSDK', getSecure)
        }

        if (error) {
          setError('Đường truyền mạng không ổn định. Vui lòng thử lại.')
          Validate.sendError(
            'login',
            account.toLocaleLowerCase()
              ? account.toLocaleLowerCase()
              : accProps.toLocaleLowerCase(),
            window.location.href,
            Constant.API_BASE_URL + 'checkpass',
            JSON.stringify(data),
            'Đường truyền mạng không ổn định. Vui lòng thử lại.',
            JSON.stringify(data)
          )
          setLoading(false)
        } else {
          if (dataRes.signal !== 0) {
            Validate.sendSuccess(
              'login',
              account.toLowerCase()
                ? account.toLowerCase()
                : accProps.toLowerCase(),
              window.location.href,
              Constant.API_BASE_URL + 'checkpass',
              JSON.stringify(data),
              JSON.stringify(dataRes)
            )
            setLoading(false)

            let userInfo = {}
            if (dataRes.signal === 4 || dataRes.signal === 5) {
              userInfo = {
                acc: account.toLocaleLowerCase()
                  ? account.toLocaleLowerCase()
                  : accProps.toLowerCase(),
              }
            } else {
              userInfo = {
                avatar: dataRes.data.avatar,
                name: dataRes.data.fullname
                  ? dataRes.data.fullname
                  : dataRes.data.username,
                acc: dataRes.data.acc,
              }
            }

            // dispatch(AccountAction.setDataAccount(userInfo))

            setData(dataRes)
            if (dataRes.signal === 4 || dataRes.signal === 5) setPopUp(true)
            if (dataRes.signal === 6) setQuickLogin(true)
          } else {
            Validate.sendError(
              'login',
              account.toLocaleLowerCase()
                ? account.toLocaleLowerCase()
                : accProps.toLocaleLowerCase(),
              window.location.href,
              Constant.API_BASE_URL + 'checkpass',
              JSON.stringify(data),
              JSON.stringify(dataRes),
              dataRes.message
            )
          }
        }
      }
    )
  }

  const buttonContinue = useMemo(() => {
    if (loading) return loadingSpinner()
    return 'Tiếp tục'
  }, [loading])

  function loadingSpinner() {
    return (
      <div className='lds-ring'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    )
  }

    if (data.signal === 2 || login.signal === 2) {
        return (<Redirect to={{ pathname: '/talk/confirmMobile', state: dataState }} />)
    } else if (data.signal === 3 || login.signal === 3) {
        // acc kingid là email và không có pass
        return (<Redirect to={{ pathname: '/talk/confirmEmail', state: dataState }} />)
    } else if (data.signal === 1 || login.signal === 4) {
        return (<Redirect to={{ pathname: '/talk/enterPassword', state: { data: data.data } }} />)
    } else if (data.signal === 7) {
        return (<Redirect to={{ pathname: '/talk/updateMobile', state: dataState }} />)
    } else if (login.signal === 1) {
        return (window.location.replace(login.data ? login.data : Constant.REDIRECT_URL))
    } else {
let className = error ? 'input-danger enter-txt' : 'enter-txt'
let srcImg = 'https://mingid.mediacdn.vn/king/image/logo-vietid.png'
return (
  <div className='wrapper-enter-phone'>
    <div className='img-back' onClick={handleBack}>
      <img
        src='https://mingid.mediacdn.vn/king/image/back.png'
        alt='button-back'
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
        className={className}
        ref={myRef}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
    <button
      className='submit-btn btn-login'
      onClick={() => handleLogin}
      disabled={
        (error &&
          error !== 'Đường truyền mạng không ổn định. Vui lòng thử lại.') ||
        (!account && !tmp_data) ||
        loading
      }
    >
      {buttonContinue}
    </button>
  </div>
)
    }


  
}

export default connect()(HomePage)
