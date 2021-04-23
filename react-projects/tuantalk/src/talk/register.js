import React, { useState, useRef, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";

import Constant from "../Constant";
import Validate from "../Validate";
import CustomScroll from "../CustomScroll";
import { useSelector } from "react-redux";

export default function Inxdex(props) {
    let accProps = (props.location.state && props.location.state.acc) ? props.location.state.acc : '';

    let [account, setAccount] = useState('');
    let [error, setError] = useState(null);
    let [data, setData] = useState('');
    let [isChecked, setChecked] = useState(true);

    let myRef = useRef(null)
    let heightKeyBoard = useSelector(({ scroll }) => scroll.values);

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

    function handleChange(e) {
        setAccount(e);
        setError('');
    }

    function showError() {
        if (error !== null) {
            return (<div className="text-orange font15 marginT16">{error}</div>)
        }
    }

    function handleLogin() {
        if (!account && !accProps) {
            setError("Vui lòng nhập Số điện thoại/Email.");
            Validate.sendError("register", "", window.location.href, Constant.API_BASE_URL + "checkpass", "", "", "Vui lòng nhập Số điện thoại/Email.");
            return;
        }

        account = account.trim();
        account = account.toLowerCase();

        Validate.sendSuccess("click-register", account, window.location.href, Constant.API_BASE_URL + "checkpass", "", "success");

        if (!Validate.validateMobile(account) && !Validate.validateMobile(accProps)) {
            setError("Vui lòng nhập đúng định dạng Số điện thoại");
            Validate.sendError("register", account ? account.toLowerCase() : accProps.toLowerCase(), window.location.href, Constant.API_BASE_URL + "checkpass", "", "", "Vui lòng nhập đúng định dạng Số điện thoại");
            return;
        }

        if (window.ee) {
            window.ee.addListener('secureSDK', getSecure);
        }

        window.sendActionToNative(account ? account.toLowerCase() : accProps.toLowerCase());
    }

    function getSecure(cb) {
        var data = JSON.stringify({
            'acc': account ? account.toLowerCase() : accProps.toLowerCase(),
            'dataNative': cb,
            'reg': true
        });

        Validate.requestPost(Constant.API_BASE_URL + "checkpass", data, function (error, dataRes) {
            if (window.ee) {
                window.ee.removeListener('secureSDK', getSecure);
            }

            if (error) {
                setError("Đường truyền mạng không ổn định. Vui lòng thử lại.");
                Validate.sendError("register", account.toLowerCase() ? account.toLowerCase() : accProps.toLowerCase(), window.location.href, Constant.API_BASE_URL + "checkpass", JSON.stringify(data), "Đường truyền mạng không ổn định. Vui lòng thử lại.", JSON.stringify(data));
            } else {
                if (dataRes.signal !== 0) {
                    Validate.sendSuccess("register", account.toLowerCase() ? account.toLowerCase() : accProps.toLowerCase(), window.location.href, Constant.API_BASE_URL + "checkpass", JSON.stringify(data), JSON.stringify(dataRes));
                    setData(dataRes);
                } else {
                    Validate.sendError("register", account.toLowerCase() ? account.toLowerCase() : accProps.toLowerCase(), window.location.href, Constant.API_BASE_URL + "checkpass", JSON.stringify(data), JSON.stringify(dataRes), dataRes.message);
                    setError(dataRes.message);
                }
            }
        });
    }

    function handleSecure() {
        window.sendActionToNative(account);
    }

    function onRegisterCallBackNative(dataNative) {
        if (dataNative) {
            window.callback = 1;
        } else {
            window.callback = 0;
        }
    }

    let dataState = null;

    if (data) {
        dataState = {
            acc: account ? account.toLowerCase() : accProps.toLowerCase(),
            mobile: account ? account.toLowerCase() : accProps.toLowerCase(),
            from: 'register'
        };
        return (<Redirect to={{ pathname: '/talk/confirmMobile', state: dataState }} />)
    } else {
        let className = error ? "input-danger enter-txt" : "enter-txt";

        return (
            <div className="wrapper-enter-phone">
                <Link className="img-back" to={{ pathname: "/talk/index" }}>
                    <img src="https://mingid.mediacdn.vn/king/image/back.png" alt="" />
                </Link>
                <div className="img-logo">
                    <img src="https://mingid.mediacdn.vn/king/image/logo-vietid.png" alt="Lotus" />
                </div>
                <div className="title">Đăng ký tài khoản VietID để sử dụng Lotus chat</div>
                <div className="wrapper-input">
                    <input
                        type="text"
                        name="account"
                        ref={myRef}
                        placeholder="Nhập số điện thoại"
                        defaultValue={(accProps && Validate.validateMobile(accProps)) ? accProps : ''}
                        className={className}
                        onChange={(e) => handleChange(e.target.value)}
                    />
                </div>
                <button className="submit-btn btn-login" onClick={() => handleLogin()}>Tiếp tục</button>
                {showError()}


                <div>
                    <label className="containe">
                        <span className="text font15 text-black font-SF-Pro-Display-Regular"> Tôi đồng ý với các
                            <Link to="/talk/rule"><span style={{ color: '#1F9FFC' }} className="font15"> điều khoản </span></Link>
                            của ViệtID
                        </span>
                        <input type="checkbox" defaultChecked={isChecked} />
                        <span className="checkmark" onClick={() => setChecked(!isChecked)}></span>
                    </label>
                </div>
            </div>
        )
    }
}
