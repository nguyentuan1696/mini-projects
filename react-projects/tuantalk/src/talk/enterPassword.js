import React, { useState, useRef, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";

import Constant from "../Constant";
import Validate from "../Validate";
import CustomScroll from "../CustomScroll";
import { useSelector } from "react-redux";

export default function EnterPassword(props) {
    let [password, setPassword] = useState('');
    let [data, setData] = useState('');
    let [error, setError] = useState('');
    let [showPass, setShowPass] = useState(false);
    let [isNext, setNext] = useState(false);

    let accProps = (props.location.state && props.location.state.data.acc) ? props.location.state.data.acc : '';
    let hasMoblileProps = (props.location.state && props.location.state.data.hasmobile) ? props.location.state.data.hasmobile : false;

    let myRef = useRef(null)
    let heightKeyBoard = useSelector(({ scroll }) => scroll.values);
    let tmp_data = useSelector(({ accountStore }) => accountStore.values);

    // không hiện màn successLogin và setName
    let [isLogin, setLogin] = useState('');

    useEffect(() => {
        CustomScroll.scrollToTop();
    }, [])

    useEffect(() => {
        if (heightKeyBoard > 0) {
            CustomScroll.executeScroll(myRef, heightKeyBoard)
        } else {
            CustomScroll.scrollToTop()
        }
    }, [heightKeyBoard]);

    function showError() {
        if (error !== null) {
            return (<div className="text-orange text-center font15 marginT16">{error}</div>)
        }
    }

    function handleChangePass(e) {
        setPassword(e);
        setError('');
    }

    function getCallBack() {
        if (!tmp_data.acc) {
            setError("Có lỗi xảy ra. Vui lòng thử lại");
            return;
        }

        var data = JSON.stringify({
            'acc': tmp_data.acc
        });

        var dataKibana = JSON.stringify({
            'acc': tmp_data.acc
        });

        Validate.sendSuccess("click-getCallBack", tmp_data.acc, window.location.href, Constant.API_BASE_URL + "getCallBack", JSON.stringify(dataKibana), "success");

        Validate.requestPost(Constant.API_BASE_URL + "getCallBack", data, function (error, dataRes) {
            if (error) {
                setError("Đường truyền mạng không ổn định. Vui lòng thử lại.");
                Validate.sendError("successLogin", tmp_data.acc, window.location.href, Constant.API_BASE_URL + "getCallBack", JSON.stringify(data), "Đường truyền mạng không ổn định. Vui lòng thử lại.", JSON.stringify(data));
            } else {
                Validate.sendSuccess("successLogin", tmp_data.acc, window.location.href, Constant.API_BASE_URL + "getCallBack", JSON.stringify(data), JSON.stringify(dataRes));
                if (dataRes.signal !== 0) {
                    if (Validate.validateMobile(tmp_data.acc.toLowerCase())) {
                        window.sendActionToNative('type_login:mobile')
                    } else {
                        window.sendActionToNative('type_login:email')
                    }
                    setLogin(dataRes);
                } else {
                    setError("Có lỗi xảy ra. Vui lòng thử lại");
                }
            }
        });
    }

    function handleNext() {
        return new Promise(function (resolve, reject) {
            var data = JSON.stringify({
                'acc': tmp_data.acc,
                'password': password
            });

            var dataKibana = JSON.stringify({
                'acc': tmp_data.acc,
                'password': '*******'
            });

            Validate.sendSuccess("click-enterPassword", tmp_data.acc, window.location.href, Constant.API_BASE_URL + "enterPassword", JSON.stringify(dataKibana), "success");

            Validate.requestPost(Constant.API_BASE_URL + "enterPassword", data, function (error, dataRes) {
                if (error) {
                    setError("Đường truyền mạng không ổn định. Vui lòng thử lại.");
                    Validate.sendError("enterPassword", tmp_data.acc, window.location.href, Constant.API_BASE_URL + "enterPassword", JSON.stringify(dataKibana), "Đường truyền mạng không ổn định. Vui lòng thử lại.", JSON.stringify(dataKibana));
                } else {
                    if (dataRes.signal !== 0) {
                        Validate.sendSuccess("enterPassword", tmp_data.acc, window.location.href, Constant.API_BASE_URL + "enterPassword", JSON.stringify(dataKibana), JSON.stringify(dataRes));
                        setData(dataRes);
                        getCallBack();
                    } else {
                        Validate.sendError("enterPassword", tmp_data.acc, window.location.href, Constant.API_BASE_URL + "enterPassword", JSON.stringify(dataKibana), JSON.stringify(dataRes));
                        setError(dataRes.message);
                    }
                }
            });
        })
    }

    function forgotPassword() {
        if (!Validate.validateEmail(accProps.toLowerCase()) && !Validate.validateMobile(accProps.toLowerCase())) {
            setError("Vui lòng nhập đúng Email hoặc Số điện thoại");
            Validate.sendError("forgotPassword", accProps.toLowerCase(), window.location.href, Constant.API_BASE_URL + "forgotPassword", "", "Vui lòng nhập đúng Email hoặc Số điện thoại");
            return;
        }

        if (window.ee) {
            window.ee.addListener('secureSDK', getSecure);
        }
        window.sendActionToNative(accProps.toLowerCase());
    }

    function getSecure(cb) {
        var data = JSON.stringify({
            'acc': accProps.toLowerCase(),
            'dataNative': cb
        });

        Validate.sendSuccess("click-forgotPassword", accProps.toLowerCase(), window.location.href, Constant.API_BASE_URL + "forgotPassword", JSON.stringify(data), "success");

        Validate.requestPost(Constant.API_BASE_URL + "forgotPassword", data, function (error, dataRes) {
            if (window.ee) {
                window.ee.removeListener('secureSDK', getSecure);
            }

            if (error) {
                setError("Đường truyền mạng không ổn định. Vui lòng thử lại.");
                Validate.sendError("forgotPassword", accProps.toLowerCase(), window.location.href, Constant.API_BASE_URL + "forgotPassword", JSON.stringify(data), "Đường truyền mạng không ổn định. Vui lòng thử lại.", JSON.stringify(data));
            } else {
                if (dataRes.signal !== 0) {
                    Validate.sendSuccess("forgotPassword", accProps.toLowerCase(), window.location.href, Constant.API_BASE_URL + "forgotPassword", JSON.stringify(data), JSON.stringify(dataRes));
                    setNext(true);
                } else {
                    Validate.sendError("forgotPassword", accProps.toLowerCase(), window.location.href, Constant.API_BASE_URL + "forgotPassword", JSON.stringify(data), JSON.stringify(dataRes));
                    setError(dataRes.message);
                }
            }
        });
    }

    function handleSecure() {
        window.sendActionToNative(accProps);
    }

    function onRegisterCallBackNative(dataNative) {
        if (dataNative) {
            window.callback = 1;
        } else {
            window.callback = 0;
        }
    }

    let dataState = {
        acc: accProps,
        from: 'enterPassword',
        hasMobile: hasMoblileProps
    };

    if (data.signal === 1 && !data.hasmobile) {
        return (<Redirect to={{ pathname: '/talk/addMobile', state: dataState }} />)
    } else if (isLogin.signal === 1) {
        return (window.location.replace(isLogin.data ? isLogin.data : Constant.REDIRECT_URL));
    } else if (isNext) {
        return (<Redirect to={{ pathname: '/talk/confirmEmail', state: dataState }} />)
    } else {
        let className = error ? "input-danger enter-txt password" : "enter-txt password";
        let type = showPass ? "text" : "password";
        let classInput = showPass ? "wrapper-input-password eye" : "wrapper-input-password eye eye-disable";
        return (
            <div className="wrapper-enter-password">
                <Link className="img-back" to={{ pathname: '/talk/index', state: dataState }}>
                    <img src="https://mingid.mediacdn.vn/king/image/back.png" alt="" />
                </Link>

                <div className="info-user">
                    <img src={tmp_data ? tmp_data.avatar : ''} alt="Lotus" className="avatar-user" />
                    <div className="info">
                        <h5 className="username">{tmp_data ? tmp_data.name : ''}</h5>
                        <p className="email">{tmp_data ? tmp_data.acc : ''}</p>
                    </div>
                </div>

                <div className={classInput}>
                    <input
                        type={type}
                        name="password"
                        placeholder="Nhập mật khẩu"
                        className={className}
                        ref={myRef}
                        onChange={(e) => handleChangePass(e.target.value)}
                    />
                    <span className="click-eye" onClick={() => setShowPass(!showPass)}></span>
                </div>
                <button className="submit-btn btn-enter-pass" onClick={() => handleNext()}>Tiếp tục</button>

                {showError()}

                <p className="blue-small text-center" onClick={() => forgotPassword()}>Đặt lại mật khẩu</p>

            </div>
        )
    }
}
