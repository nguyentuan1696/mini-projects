import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Link, Redirect } from 'react-router-dom'
import useCountDown from 'react-countdown-hook'
import { useSelector } from 'react-redux'

import Constant from '../../utilities/Constant'
import Validate from '../../utilities/Validate'

const ConfirmEmailPage = () => {
  const [error, setError] = useState('')
  const [data, setData] = useState('')
  const [isLogin, setLogin] = useState('')

  const [otpArr, setOTP] = useState([])
  const [code1, setCode1] = useState('')
  const [code2, setCode2] = useState('')
  const [code3, setCode3] = useState('')
  const [code4, setCode4] = useState('')
  const [code5, setCode5] = useState('')
  const [code6, setCode6] = useState('')

  const inputE1 = useRef(null)
  const inputE2 = useRef(null)
  const inputE3 = useRef(null)
  const inputE4 = useRef(null)
  const inputE5 = useRef(null)
  const inputE6 = useRef(null)

  const loginByOTP2 = (otp) =>
  {
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

    let data = JSON.stringify({
      acc: accProps,
      otp: otp,
      password: '*****'
    })

    let dataKibana = JSON.stringify({
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
      function (error, dataRes)
      {
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
            getCallback()

            let agent = window.location.userAgent
            if (agent.indexOf('Android') > -1) {
              window.KingIDSdk.onHideKeyBoard()
              window.ee.removeListener('show_keyboard')
            }
          }
        }
      }
    )
  }

  const getCallback = () =>
  {
    if (!accProps) {
      setError('Có lỗi xảy ra. Vui lòng thử lại')
      return
    }
  }

  const handleCode1 = (e) => {
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

  let accProps = ''
  let fromProps = ''
  let hasMobileProps = ''
  let isVietID = ''

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

  useEffect(() => {
    const agent = window.navigator.userAgent
    if (agent.indexOf('Android') > -1) {
      window.sendActionToNative('show_keyboard')
      window.ee.addListener('show_keyboard', showKeyboard)
      window.KingIDSdk.onShowKeyBoard()
      return () => {
        window.KingIDSdk.onHideKeyboard()
      }
    }
  })

  const showKeyboard = (callback) => {
    if (callback === -1 || callback === '-1') {
      setOTP((otpArr) => otpArr.slice(0, otpArr.length - 1))
    } else {
      setOTP((otpArr) => {
        return otpArr.length < 6 ? otpArr.concat(callback) : otpArr
      })
    }
  }

  const hideKeyBoard = () => {
    const agent = window.navigator.userAgent
    if (agent.indexOf('Android') > -1) {
      window.KingIDSdk.onHideKeyBoard()
      window.ee.removeListener('show_keyboard')
    }
  }

  const onPaste = () => {}

  const handleKeyUp = () => {}

  const showInputOTP = () => {
    let agent = window.navigator.userAgent
    if (agent.indexOf('Android') === -1) {
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
        </div>
      )
    }
  }

  const showError = () => {
    if (error !== null) {
      return <div className='text-orange font15 marginT16'>{error}</div>
    }
  }

  let dataState = {
    acc: accProps,
    from: fromProps,
  }

  if (data.signal === 1) {
    if (fromProps === 'enterPassword') {
      return (
        <Redirect to={{ pathname: '/talk/setPassword', state: dataState }} />
      )
    }

    if (hasMobileProps && fromProps === 'index' && isLogin.signal === 1) {
      return window.location.replace(
        isLogin.data ? isLogin.data : Constant.REDIRECT_URL
      )
    }

    return <Redirect to={{ pathname: '/talk/addMobile', state: dataState }} />
  } else {
    const back =
      fromProps === 'enterPassword' ? (
        <Link
          className='img-back'
          to='/talk/enterPassword'
          onClick={() => hideKeyBoard}
        >
          <img
            src='https://mingid.mediacdn.vn/king/image/back.png'
            alt=''
          ></img>
        </Link>
      ) : (
        <Link
          className='img-back'
          to={{ pathname: '/talk/index' }}
          onClick={() => hideKeyBoard()}
        >
          <img
            src='https://mingid.mediacdn.vn/king/image/back.png'
            alt=''
          ></img>
        </Link>
      )

    let classImg = isVietID ? (
      <div className='img-logo marginT64'>
        <img
          src='https://mingid.mediacdn.vn/king/image/logo-vietid.png'
          alt=''
        ></img>
      </div>
    ) : (
      ''
    )

    let classTitle = isVietID ? 'title marginT24' : 'title'

    return (
      <div className='wrapper-enter-otp'>
        {back}
        {classImg}
        <div className='classTitle'>
          Nhập mã xác thực được gửi về Email <span>{accProps}</span>
        </div>

        <div className='wrapper-input'>
          <div className='item'>{showInputOTP}</div>
        </div>

        {showError}
      </div>
    )
  }
}

export default ConfirmEmailPage
