import React, { useState, useRef, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Constant from '../../utilities/Constant'
import Validate from '../../utilities/Validate'
import CustomScroll from '../../utilities/CustomScroll'

const AddMobilePage = () => {
  let [mobile, setMobile] = useState('')
  const [error, setError] = useState(null)
  const [data, setData] = useState('')
  const [exist, setExist] = useState(null)
  const [redirect, setRedirect] = useState(false)

  const accProps = ''
  const mobileProps = ''

  const myRef = useRef(null)

  useEffect(() => {
    CustomScroll.scrollToTop()
  }, [])

  const handleChangeMobile = (e) => {
    setMobile(e)
    setError(null)
    setExist(null)
  }

  const handleAddMobile = () => {
    if (!mobile && !mobileProps) {
      setError('Vui lòng nhập Số điện thoại')
      Validate.sendError(
        'addMobile',
        '',
        window.location.href,
        Constant.API_BASE_URL + 'checkMobile',
        '',
        '',
        'Vui lòng nhập Số điện thoại'
      )
      return
    }

    if (!mobile) mobile = mobileProps
    mobile = mobile.trim()

    Validate.sendSuccess(
      'click-addMobile',
      mobile,
      window.location.href,
      Constant.API_BASE_URL + 'checkMobile',
      '',
      'success'
    )

    if (!Validate.validateMobile(mobile)) {
      setError(
        'Đây không phải số điện thoại hợp lệ. Vui lòng nhập lại số điện thoại của bạn'
      )
      Validate.sendError(
        'addMobile',
        mobile,
        window.location.href,
        Constant.API_BASE_URL + 'checkMobile',
        '',
        '',
        'Đây không phải số điện thoại hợp lệ. Vui lòng nhập lại số điện thoại của bạn'
      )

      return
    }
    if (window.ee) {
      window.ee.addListener('secureSDK', getSecure)
    }
  }

  const getSecure = (callback) => {
    let data = JSON.stringify({
      acc: accProps,
      mobile: mobile,
      dataNative: callback,
    })

    Validate.requestPost(
      Constant.API_BASE_URL + 'checkMobile',
      data,
      function (error, dataRes) {
        if (window.ee) {
          window.ee.removeListener('secureSDK', getSecure)
        }

        if (error) {
          setError('Đường truyền mạng không ổn định. Vui lòng thử lại.')
          Validate.sendError(
            'addMobile',
            mobile,
            window.location.href,
            Constant.API_BASE_URL + 'checkMobile',
            JSON.stringify(data),
            '"Đường truyền mạng không ổn định. Vui lòng thử lại.',
            JSON.stringify(data)
          )
        } else {
          if (dataRes.signal === 1) setData(dataRes)
          if (dataRes.signal === 2) {
            setExist(
              'Số điện thoại đã được đăng ký. Vui lòng nhập lại SĐT khác hoặc đăng nhập với SĐT này'
            )
          } else {
            Validate.sendError(
              'addMobile',
              mobile,
              window.location.href,
              Constant.API_BASE_URL + 'checkMobile',
              JSON.stringify(data),
              JSON.stringify(dataRes),
              dataRes.message
            )
            setError(dataRes.message)
          }
        }
      }
    )
  }

  const showError = () => {
    if (error !== null && data.signal !== 2) {
      return <div className='text-orange font15 marginT16'>{error}</div>
    }
  }

  const showError2 = () => {
    if (exist !== null) {
      return (
        <div className='modal-wrapper'>
          <div className='modal-content'>
            <div className='new-phone-modal'>
              <div className='modal-header-new-phone'>
                <img
                  src='https://mingid.mediacdn.vn/king/image/logo-lotus.png'
                  alt='lotus'
                ></img>
                <span onClick={() => setExist(null)}>
                  <img
                    src='https://mingid.mediacdn.vn/king/image/close.png'
                    alt=''
                  ></img>
                </span>
              </div>

              <div className='modal-body-new-phone'>
                <h3>
                  Số điện thoại
                  <span className='blue-text'>{mobile}</span>
                  đã là tài khoản ViệtID nên không thể cập nhật vào tài khoản
                  này
                </h3>
                <p>
                  Bạn có thể đăng nhập bằng số điện thoại này hoặc nhập lại số
                  điện thoại khác
                </p>
                <div
                  className='login-index marginB31'
                  onClick={() => goToIndex}
                >
                  Đăng nhập với SĐT này
                </div>

                <div className='modal-footer-new-phone'>
                  <hr className='marginB31' />
                  <span>Hoặc</span>
                  <p
                    className='register-index color616161'
                    onClick={() => setExist(null)}
                  >
                    Nhập lại
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
  const goToIndex = () => {}
  return (
    <div className='wrapper-chua-sdt'>
      <div className='img-back'></div>
      <img
        src='https://mingid.mediacdn.vn/king/image/logo-chua-sdt.png'
        alt=''
      ></img>
      <h2>
        Tài khoản chưa cập nhật số điện thoại. Hãy cập nhật để chat với bạn bè
        dễ dàng hơn
      </h2>
      <div className='wrapper-input'>
        <input
          type='text'
          name='account'
          placeholder='Nhập số điện thoại'
          className='enter-txt'
          ref={myRef}
          defaultValue=''
          onChange={(e) => handleChangeMobile(e.target.value)}
        />
      </div>
      <button className='submit-btn btn-login' onClick={() => handleAddMobile}>
        Tiếp tục
      </button>
      {showError()}
      {showError2()}
    </div>
  )
}

export default AddMobilePage
