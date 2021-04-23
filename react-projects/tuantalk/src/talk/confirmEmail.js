import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Link, Redirect } from 'react-router-dom'
import useCountDown from 'react-countdown-hook'
import { useSelector } from 'react-redux'

import Constant from '../Constant'
import Validate from '../Validate'

export default function ConfirmEmail(props) {
  let accProps =
    props.location.state && props.location.state.acc
      ? props.location.state.acc
      : ''
  let fromProps =
    props.location.state && props.location.state.from
      ? props.location.state.from
      : ''
  let hasMobileProps =
    props.location.state && props.location.state.hasMobile
      ? props.location.state.hasMobile
      : false
  let isVietID =
    props.location.state && props.location.state.isVietID
      ? props.location.state.isVietID
      : false

  let [error, setError] = useState('')
  let [data, setData] = useState('')

  // Android không hiện màn successLogin và setName
  let [isLogin, setLogin] = useState('')

  // otp
  let [otpArr, setOTP] = useState([])
  let [code1, setCode1] = useState('')
  let [code2, setCode2] = useState('')
  let [code3, setCode3] = useState('')
  let [code4, setCode4] = useState('')
  let [code5, setCode5] = useState('')
  let [code6, setCode6] = useState('')

  const inputE1 = useRef(null)
  const inputE2 = useRef(null)
  const inputE3 = useRef(null)
  const inputE4 = useRef(null)
  const inputE5 = useRef(null)
  const inputE6 = useRef(null)

  // countdown
  const initialTime = 30 * 1000
  const interval = 1000
  const [timeLeft, { start }] = useCountDown(initialTime, interval)
  useEffect(() => {
    start()
  }, [])

  const restart = useCallback(() => {
    const newTime = 30 * 1000
    start(newTime)
  }, [])

  // call sdk show/hide keyboard
  useEffect(() => {
    let agent = window.navigator.userAgent
    if (agent.indexOf('Android ') > -1) {
      window.sendActionToNative('show_keyboard')
      window.ee.addListener('show_keyboard', showKeyboard)
      window.KingIDSdk.onShowKeyBoard()
      return () => {
        window.KingIDSdk.onHideKeyBoard()
      }
    }
  }, [])

  useEffect(() => {
    if (otpArr.length === 0) {
      setError('')
      setCode1('')
      setCode2('')
      setCode3('')
      setCode4('')
      setCode5('')
      setCode6('')
    }

    if (otpArr.length > 0) {
      setError('')
      if (otpArr.length === 1) {
        setCode1(otpArr[0])
        setCode2('')
        setCode3('')
        setCode4('')
        setCode5('')
        setCode6('')
      }

      if (otpArr.length === 2) {
        setCode1(otpArr[0])
        setCode2(otpArr[1])
        setCode3('')
        setCode4('')
        setCode5('')
        setCode6('')
      }

      if (otpArr.length === 3) {
        setCode1(otpArr[0])
        setCode2(otpArr[1])
        setCode3(otpArr[2])
        setCode4('')
        setCode5('')
        setCode6('')
      }

      if (otpArr.length === 4) {
        setCode1(otpArr[0])
        setCode2(otpArr[1])
        setCode3(otpArr[2])
        setCode4(otpArr[3])
        setCode5('')
        setCode6('')
      }

      if (otpArr.length === 5) {
        setCode1(otpArr[0])
        setCode2(otpArr[1])
        setCode3(otpArr[2])
        setCode4(otpArr[3])
        setCode5(otpArr[4])
        setCode6('')
      }

      if (otpArr.length === 6) {
        setCode1(otpArr[0])
        setCode2(otpArr[1])
        setCode3(otpArr[2])
        setCode4(otpArr[3])
        setCode5(otpArr[4])
        setCode6(otpArr[5])
        loginByOTP2(`${code1 + code2 + code3 + code4 + code5 + otpArr[5]}`)
      }
    }
  }, [otpArr])

  function showKeyboard(cb) {
    if (cb === -1 || cb === '-1') {
      setOTP((otpArr) => otpArr.slice(0, otpArr.length - 1))
    } else {
      setOTP((otpArr) => {
        return otpArr.length < 6 ? otpArr.concat(cb) : otpArr
      })
    }
  }

  function showError() {
    if (error !== null) {
      return <div className='text-orange font15 marginT16'>{error}</div>
    }
  }

  function handleResendOTP() {
    let tmp_time = timeLeft / 1000

    if (tmp_time === 0 || tmp_time < 0) {
      return (
        <div className='resent' onClick={() => resendOTP(accProps)}>
          Gửi lại mã OTP
        </div>
      )
    } else {
      if (tmp_time > 0 && tmp_time < 10) {
        return (
          <div className='resent resent-countdown'>
            Gửi lại sau 00:0{tmp_time > 0 ? tmp_time : 0}
          </div>
        )
      } else {
        return (
          <div className='resent resent-countdown'>
            Gửi lại sau 00:{tmp_time > 0 ? tmp_time : 0}
          </div>
        )
      }
    }
  }

  function onPaste(e) {
    let text = e.clipboardData.getData('Text')
    setCode1(text.slice(0, 1))
    setCode2(text.slice(1, 2))
    setCode3(text.slice(2, 3))
    setCode4(text.slice(3, 4))
    setCode5(text.slice(4, 5))
    setCode6(text.slice(5, 6))
    inputE6.current.focus()
  }

  function handleCode1(e) {
    setError('')
    if (e.length === 1) {
      setCode1(e)
      inputE2.current.focus()
    }

    if (e.length === 6) {
      setCode1(e.slice(0, 1))
      setCode2(e.slice(1, 2))
      setCode3(e.slice(2, 3))
      setCode4(e.slice(3, 4))
      setCode5(e.slice(4, 5))
      setCode6(e.slice(5, 6))
      inputE6.current.focus()
      loginByOTP2(e)
    }
  }

  function handleCode2(e) {
    setError('')
    if (e.length === 1) {
      inputE3.current.focus()
      setCode2(e)
    }

    if (e.length === 6) {
      inputE3.current.focus()
      setCode2(e.slice(1, 2))
    }
  }

  function handleCode3(e) {
    setError('')
    if (e.length === 1) {
      inputE4.current.focus()
      setCode3(e)
    }
  }

  function handleCode4(e) {
    setError('')
    if (e.length === 1) {
      inputE5.current.focus()
      setCode4(e)
    }
  }

  function handleCode5(e) {
    setError('')
    if (e.length === 1) {
      inputE6.current.focus()
      setCode5(e)
    }
  }

  function handleCode6(e) {
    setError('')
    if (e.length === 1) {
      setCode6(e)
      loginByOTP2(`${code1 + code2 + code3 + code4 + code5 + e}`)
    }

    if (e.length >= 2) {
      setCode6(e.substring(e.length - 1, e.length))
    }
  }

  function handleKeyUp(e) {
    let keycode = e.keyCode || e.which
    if (keycode === 8 || keycode === 46 || keycode === 0 || keycode === 229) {
      setCode1('')
      setCode2('')
      setCode3('')
      setCode4('')
      setCode5('')
      setCode6('')
      inputE1.current.focus()
    }
  }

  function handleFocus() {
    if (!inputE1.current.value) inputE1.current.focus()
  }

  function getCallBack() {
    if (!accProps) {
      setError('Có lỗi xảy ra. Vui lòng thử lại')
      return
    }

    var data = JSON.stringify({
      acc: accProps,
    })

    var dataKibana = JSON.stringify({
      acc: accProps,
    })

    Validate.sendSuccess(
      'click-getCallBack',
      accProps,
      window.location.href,
      Constant.API_BASE_URL + 'getCallBack',
      JSON.stringify(dataKibana),
      'success'
    )

    Validate.requestPost(
      Constant.API_BASE_URL + 'getCallBack',
      data,
      function (error, dataRes) {
        if (error) {
          setError('Đường truyền mạng không ổn định. Vui lòng thử lại.')
          Validate.sendError(
            'successLogin',
            accProps,
            window.location.href,
            Constant.API_BASE_URL + 'getCallBack',
            JSON.stringify(data),
            'Đường truyền mạng không ổn định. Vui lòng thử lại.',
            JSON.stringify(data)
          )
        } else {
          Validate.sendSuccess(
            'successLogin',
            accProps,
            window.location.href,
            Constant.API_BASE_URL + 'getCallBack',
            JSON.stringify(data),
            JSON.stringify(dataRes)
          )
          if (dataRes.signal !== 0) {
            if (Validate.validateMobile(accProps.toLowerCase())) {
              window.sendActionToNative('type_login:mobile')
            } else {
              window.sendActionToNative('type_login:email')
            }
            setLogin(dataRes)
          } else {
            setError('Có lỗi xảy ra. Vui lòng thử lại')
          }
        }
      }
    )
  }

  function loginByOTP2(otp) {
    setError('')
    if (!otp) {
      setError('Vui lòng nhập mã xác thực.')
      Validate.sendError(
        'confirmEmail',
        accProps,
        window.location.href,
        Constant.API_BASE_URL + 'confirmAccount',
        '',
        'Vui lòng nhập mã xác thực.'
      )
      return
    }

    var data = JSON.stringify({
      acc: accProps,
      otp: otp,
      password: '*****',
    })

    var dataKibana = JSON.stringify({
      acc: accProps,
      otp: otp,
      password: '*****',
    })

    Validate.sendSuccess(
      'confirmEmail',
      accProps,
      window.location.href,
      Constant.API_BASE_URL + 'confirmAccount',
      JSON.stringify(dataKibana),
      'success'
    )

    Validate.requestPost(
      Constant.API_BASE_URL + 'confirmAccount',
      data,
      function (error, dataRes) {
        if (error) {
          setError('Đường truyền mạng không ổn định. Vui lòng thử lại.')
          Validate.sendError(
            'confirmEmail',
            accProps,
            window.location.href,
            Constant.API_BASE_URL + 'confirmAccount',
            JSON.stringify(dataKibana),
            'Đường truyền mạng không ổn định. Vui lòng thử lại.',
            JSON.stringify(dataKibana)
          )
        } else {
          if (dataRes.signal !== 0) {
            Validate.sendSuccess(
              'confirmEmail',
              accProps,
              window.location.href,
              Constant.API_BASE_URL + 'confirmAccount',
              JSON.stringify(dataKibana),
              JSON.stringify(dataRes)
            )

            setData(dataRes)
            getCallBack()

            let agent = window.navigator.userAgent
            if (agent.indexOf('Android ') > -1) {
              window.KingIDSdk.onHideKeyBoard()
              window.ee.removeListener('show_keyboard')
            }
          } else {
            Validate.sendError(
              'confirmEmail',
              accProps,
              window.location.href,
              Constant.API_BASE_URL + 'confirmAccount',
              JSON.stringify(dataKibana),
              JSON.stringify(dataRes)
            )
            setError(dataRes.message)
            if (
              dataRes.message ===
              'Quá số lần nhập sai. Vui lòng thử lại sau 5 phút.'
            ) {
              restart()
            }
          }
        }
      }
    )
  }

  function resendOTP(acc) {
    Validate.sendSuccess(
      'talk_resend_otp_click',
      acc,
      window.location.href,
      Constant.API_BASE_URL + 'resendOTP',
      '',
      'success'
    )
    restart()

    if (window.ee) {
      window.ee.addListener('secureSDK', getSecure)
    }
    window.sendActionToNative(accProps.toLowerCase())
  }

  function getSecure(cb) {
    var data = JSON.stringify({
      acc: accProps.toLowerCase(),
      dataNative: cb,
    })

    Validate.requestPost(
      Constant.API_BASE_URL + 'resendOTP',
      data,
      function (error, dataRes) {
        if (window.ee) {
          window.ee.removeListener('secureSDK', getSecure)
        }

        if (error) {
          setError('Đường truyền mạng không ổn định. Vui lòng thử lại.')
          Validate.sendError(
            'confirmEmail',
            accProps.toLowerCase(),
            window.location.href,
            Constant.API_BASE_URL + 'resendOTP',
            JSON.stringify(data),
            'Đường truyền mạng không ổn định. Vui lòng thử lại.',
            JSON.stringify(data)
          )
        } else {
          if (dataRes.signal !== 0) {
            Validate.sendSuccess(
              'confirmEmail',
              accProps.toLowerCase(),
              window.location.href,
              Constant.API_BASE_URL + 'resendOTP',
              JSON.stringify(data),
              JSON.stringify(dataRes)
            )
          } else {
            setError('Quá số lần gửi.')
            Validate.sendError(
              'confirmEmail',
              accProps.toLowerCase(),
              window.location.href,
              Constant.API_BASE_URL + 'resendOTP',
              JSON.stringify(data),
              JSON.stringify(dataRes)
            )
          }
        }
      }
    )
  }

  function handleSecure() {
    window.sendActionToNative(accProps.toLowerCase())
  }

  function onRegisterCallBackNative(dataNative) {
    if (dataNative) {
      window.callback = 1
    } else {
      window.callback = 0
    }
  }

  function hideKeyBoard() {
    let agent = window.navigator.userAgent
    if (agent.indexOf('Android ') > -1) {
      window.KingIDSdk.onHideKeyBoard()
      window.ee.removeListener('show_keyboard')
    }
  }

  function showInputOTP() {
    let agent = window.navigator.userAgent

    if (agent.indexOf('Android ') === -1) {
      return (
        <div className='wrap-digit'>
          <input
            type='tel'
            pattern='\d*'
            className='input-digit'
            onPaste={onPaste}
            ref={inputE1}
            value={code1}
            autoFocus
            autoComplete='one-time-code'
            id='single-factor-code-text-field'
            onChange={(e) => handleCode1(e.target.value)}
            onKeyUp={handleKeyUp}
          />
          <input
            type='tel'
            pattern='\d*'
            className='input-digit'
            ref={inputE2}
            value={code2}
            id='digit-2'
            onChange={(e) => handleCode2(e.target.value)}
            onKeyUp={handleKeyUp}
            onKeyDown={handleKeyUp}
            onKeyPress={handleKeyUp}
            onFocus={handleFocus}
          />
          <input
            type='tel'
            pattern='\d*'
            className='input-digit'
            ref={inputE3}
            value={code3}
            id='digit-3'
            onChange={(e) => handleCode3(e.target.value)}
            onKeyUp={handleKeyUp}
            onKeyDown={handleKeyUp}
            onKeyPress={handleKeyUp}
            onFocus={handleFocus}
          />
          <input
            type='tel'
            pattern='\d*'
            className='input-digit'
            ref={inputE4}
            value={code4}
            id='digit-4'
            onChange={(e) => handleCode4(e.target.value)}
            onKeyUp={handleKeyUp}
            onKeyDown={handleKeyUp}
            onKeyPress={handleKeyUp}
            onFocus={handleFocus}
          />
          <input
            type='tel'
            pattern='\d*'
            className='input-digit'
            ref={inputE5}
            value={code5}
            id='digit-5'
            onChange={(e) => handleCode5(e.target.value)}
            onKeyUp={handleKeyUp}
            onKeyDown={handleKeyUp}
            onKeyPress={handleKeyUp}
            onFocus={handleFocus}
          />
          <input
            type='tel'
            pattern='\d*'
            className='input-digit'
            ref={inputE6}
            value={code6}
            id='digit-6'
            onChange={(e) => handleCode6(e.target.value)}
            onKeyUp={handleKeyUp}
            onKeyDown={handleKeyUp}
            onKeyPress={handleKeyUp}
            onFocus={handleFocus}
          />
        </div>
      )
    } else {
      return (
        <div className='wrap-digit android'>
          <input
            type='tel'
            className='input-digit'
            defaultValue={code1 ? code1 : ''}
            disabled
          />
          <input
            type='tel'
            className='input-digit'
            defaultValue={code2 ? code2 : ''}
            disabled
          />
          <input
            type='tel'
            className='input-digit'
            defaultValue={code3 ? code3 : ''}
            disabled
          />
          <input
            type='tel'
            className='input-digit'
            defaultValue={code4 ? code4 : ''}
            disabled
          />
          <input
            type='tel'
            className='input-digit'
            defaultValue={code5 ? code5 : ''}
            disabled
          />
          <input
            type='tel'
            className='input-digit'
            defaultValue={code6 ? code6 : ''}
            disabled
          />
        </div>
      )
    }
  }

  let dataState = {
    acc: accProps,
    from: fromProps,
  }

  if (data.signal === 1) {
    // quên mật khẩu
    if (fromProps === 'enterPassword')
      return (
        <Redirect to={{ pathname: '/talk/setPassword', state: dataState }} />
      )

    // tài khoản có cả email và sđt không password
    if (hasMobileProps && fromProps === 'index' && isLogin.signal === 1) {
      return window.location.replace(
        isLogin.data ? isLogin.data : Constant.REDIRECT_URL
      )
    }

    return <Redirect to={{ pathname: '/talk/addMobile', state: dataState }} />
  } else {
    let back =
      fromProps === 'enterPassword' ? (
        <Link
          className='img-back'
          to='/talk/enterPassword'
          onClick={() => hideKeyBoard()}
        >
          <img src='https://mingid.mediacdn.vn/king/image/back.png' alt='' />
        </Link>
      ) : (
        <Link
          className='img-back'
          to={{ pathname: '/talk/index' }}
          onClick={() => hideKeyBoard()}
        >
          <img src='https://mingid.mediacdn.vn/king/image/back.png' alt='' />
        </Link>
      )

    let classImg = isVietID ? (
      <div className='img-logo marginT64'>
        <img
          src='https://mingid.mediacdn.vn/king/image/logo-vietid.png'
          alt='Lotus'
        />
      </div>
    ) : (
      ''
    )

    let classTitle = isVietID ? 'title marginT24' : 'title'

    return (
      <div className='wrapper-enter-otp'>
        {back}
        {classImg}
        <div className={classTitle}>
          Nhập mã xác thực được gửi về Email <span>{accProps}</span>
        </div>

        <div className='wrapper-input'>
          <div className='item'>{showInputOTP()}</div>
        </div>

        {showError()}

        <div className='error'>
          <div className='detail'>
            Bạn không nhận được mã OTP?
            {handleResendOTP()}
          </div>
        </div>
      </div>
    )
  }
}
