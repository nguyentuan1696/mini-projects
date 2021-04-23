import React, { useState, useRef, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";

import Constant from "../Constant";
import Validate from "../Validate";
import CustomScroll from "../CustomScroll";
import {useSelector} from "react-redux";

export default function SetPasswprd(props) {
    let accProps = (props.location.state && props.location.state.acc) ? props.location.state.acc : '';
    let fromProps = (props.location.state && props.location.state.from) ? props.location.state.from : '';

    let [error, setError] = useState('');
    let [password, setPass] = useState('');
    let [confirmPass, setConfirmPass] = useState('');
    let [data, setData] = useState('');
    let [showPass, setShowPass] = useState(false);
    let [showPass2, setShowPass2] = useState(false);

    let [myRef, setRef] = useState(true);
    let input1 = useRef(null);
    let input2 = useRef(null);
    let heightKeyBoard = useSelector(({scroll}) => scroll.values);

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

    function handleSetConfirmPass(e) {
        setConfirmPass(e);
        setError('');
    }

    function handleSetPass(e) {
        setPass(e);
        setError('');
    }

    function setPassword() {
        var data = JSON.stringify({
            'acc': accProps,
            'password': password,
            'confirm_pass': confirmPass
        });

        var dataKibana = JSON.stringify({
            'acc': accProps,
            'password': '*****',
            'confirm_pass': '*****'
        });

        Validate.sendSuccess("click-setPassword", accProps, window.location.href, Constant.API_BASE_URL + "setPassword", JSON.stringify(dataKibana), "success");

        Validate.requestPost(Constant.API_BASE_URL + "setPassword", data, function (error, dataRes) {
            if (error) {
                setError("Đường truyền mạng không ổn định. Vui lòng thử lại.");
                Validate.sendError("setPassword", accProps, window.location.href, Constant.API_BASE_URL + "setPassword", JSON.stringify(dataKibana), "Đường truyền mạng không ổn định. Vui lòng thử lại.", JSON.stringify(data));
            } else {
                if (dataRes.signal !== 0) {
                    Validate.sendSuccess("setPassword", accProps, window.location.href, Constant.API_BASE_URL + "setPassword", JSON.stringify(dataKibana), JSON.stringify(dataRes));
                    setData(dataRes);
                } else {
                    Validate.sendError("setPassword", accProps, window.location.href, Constant.API_BASE_URL + "setPassword", JSON.stringify(dataKibana), JSON.stringify(dataRes), dataRes.message);
                    setError(dataRes.message);
                }
            }
        });
    }

    var dataState = {
        acc: accProps,
        from: fromProps
    };

    if (data.signal === 1) {
        return (<Redirect to={{ pathname: '/talk/setPasswordOk', state: dataState }} />)
    } else {
        let className = error ? "input-danger enter-txt password" : "enter-txt password";
        let type = showPass ? "text" : "password";
        let type2 = showPass2 ? "text" : "password";
        let classInput = showPass ? "wrapper-input-password eye" : "wrapper-input-password eye eye-disable";
        let classInput2 = showPass2 ? "wrapper-input-password eye" : "wrapper-input-password eye eye-disable";
        let text = Validate.validateEmail(accProps) ? "Đặt lại mật khẩu đăng nhập cho Email " : "Đặt lại mật khẩu đăng nhập cho số điện thoại ";
        return (
            <div className="wrapper-enter-phone">
                <Link className="img-back" to="/talk/enterPassword">
                    <img src="https://mingid.mediacdn.vn/king/image/back.png" alt="" />
                </Link>

                <div className="img-logo">
                    <img src="https://mingid.mediacdn.vn/king/image/logo-vietid.png" alt="Lotus" />
                </div>

                <div className="title">
                    {text} <span className="blue-txt">{accProps}</span>
                </div>

                <div className={classInput}>
                    <input
                        type={type}
                        name="password"
                        placeholder="Nhập mật khẩu"
                        ref={input1} onFocus={() => setRef(input1) }
                        className={className}
                        onChange={(e) => handleSetPass(e.target.value)}
                    />
                    <span className="click-eye" onClick={() => setShowPass(!showPass)}></span>
                </div>

                <div className="marginB12"></div>

                <div className={classInput2}>
                    <input
                        type={type2}
                        name="confirm_password"
                        placeholder="Xác nhận mật khẩu"
                        ref={input2} onFocus={() => setRef(input2)  }
                        className={className}
                        onChange={(e) => handleSetConfirmPass(e.target.value)}
                    />
                    <span className="click-eye" onClick={() => setShowPass2(!showPass2)}></span>
                </div>
                <button className="submit-btn" id="add-password" onClick={() => setPassword()}>Tiếp tục</button>
                {showError()}
            </div>
        )
    }
}
