import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, Redirect } from "react-router-dom";

import Constant from "../Constant";
import Validate from "../Validate";
import CustomScroll from "../CustomScroll";
import { useDispatch, useSelector } from "react-redux";

export default function UpdateMobileApple(props) {
    let accProps = (props.location.state && props.location.state.acc) ? props.location.state.acc : '';
    let dispatch = useDispatch();
    let [mobile, setMobile] = useState(accProps);
    let [error, setError] = useState(null);
    let [data, setData] = useState('');
    let [exist, setExist] = useState(null);
    let [callback, setCallBack] = useState(null);
    let [loading, setLoading] = useState(false);

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

    useEffect(() => {
        Validate.requestPost(Constant.API_BASE_URL + "checkLogin", null, function (error, dataRes) {
            Validate.sendSuccess("updateMobileApple", '', window.location.href, Constant.API_BASE_URL + "checkLogin", '', JSON.stringify(dataRes));
            if (error) {
            } else {
                if (dataRes.signal !== 1) {
                    setCallBack(dataRes.cb);
                }
            }
        });
    }, []);

    useEffect(() => {
        window.sendActionToNative("hide_button_back");
    }, []);

    const buttonContinue = useMemo(() => {
        if (loading) return loadingSpinner();
        return "Tiếp tục"
    }, [loading]);

    function loadingSpinner() {
        return (
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        )
    }

    function showError() {
        if (error !== null && data.signal !== 2) {
            return (<div className="text-orange font15 marginT16">{error}</div>)
        }
    }

    function showError2() {
        if (exist !== null) {
            let dataState = {
                acc: mobile,
                from: 'addMobile'
            };

            return (
                <div className="modal-wrapper">
                    <div className="modal-content">
                        <div className="new-phone-modal">

                            <div className="modal-header-new-phone">
                                <img src="https://mingid.mediacdn.vn/king/image/logo-lotus.png" alt="Lotus" />
                                <span onClick={() => setExist(null)}><img
                                    src="https://mingid.mediacdn.vn/king/image/close.png" alt="" /></span>
                            </div>

                            <div className="modal-body-new-phone">
                                <h3>Số điện thoại <span className="blue-txt">{mobile}</span> đã là tài khoản ViệtID nên
                                    không thể cập nhật vào tài khoản này</h3>
                                <p>Bạn có thể đăng nhập bằng số điện thoại này hoặc nhập lại số điện thoại khác</p>
                                <Link className="login-index marginB31" to={{ pathname: '/talk/index', state: dataState }}>Đăng nhập với SĐT này</Link>
                            </div>

                            <div className="modal-footer-new-phone">
                                <hr className="marginB31" />
                                <span>Hoặc</span>
                                <p className="register-index color616161" onClick={() => setExist(null)}>Nhập lại</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    function handleChangeMobile(e) {
        setMobile(e);
        setError(null);
        setExist(null);
    }

    function handleAddMobile() {
        setLoading(true);
        if (!mobile) {
            setError("Vui lòng nhập Số điện thoại");
            Validate.sendError("updateMobileApple", "", window.location.href, Constant.API_BASE_URL + "checkMobile", "", "", "Vui lòng nhập Số điện thoại");
            setLoading(false);
            return;
        }

        mobile = mobile.trim();

        Validate.sendSuccess("click-updateMobileApple", mobile, window.location.href, Constant.API_BASE_URL + "checkMobile", "", "success");

        if (!Validate.validateMobile(mobile)) {
            setError("Đây không phải số điện thoại hợp lệ. Vui lòng nhập lại số điện thoại của bạn");
            Validate.sendError("updateMobileApple", mobile, window.location.href, Constant.API_BASE_URL + "checkMobile", "", "", "Đây không phải số điện thoại hợp lệ. Vui lòng nhập lại số điện thoại của bạn");
            setLoading(false);
            return;
        }

        if (window.ee) window.ee.addListener('secureSDK', getSecure);
        window.sendActionToNative(mobile);
    }

    function getSecure(cb) {
        var data = JSON.stringify({
            'acc': mobile,
            'mobile': mobile,
            'dataNative': cb
        });

        Validate.requestPost(Constant.API_BASE_URL + "checkMobile", data, function (error, dataRes) {
            if (window.ee) window.ee.removeListener('secureSDK', getSecure);

            if (error) {
                setError("Đường truyền mạng không ổn định. Vui lòng thử lại.");
                Validate.sendError("updateMobileApple", mobile, window.location.href, Constant.API_BASE_URL + "checkMobile", JSON.stringify(data), "Đường truyền mạng không ổn định. Vui lòng thử lại.", JSON.stringify(data));
                setLoading(false);
            } else {
                if (dataRes.signal !== 0) {
                    Validate.sendSuccess("updateMobileApple", mobile, window.location.href, Constant.API_BASE_URL + "checkMobile", JSON.stringify(data), JSON.stringify(dataRes));
                    if (dataRes.signal === 1) setData(dataRes);
                    if (dataRes.signal === 2) setExist("Số điện thoại đã được đăng ký. Vui lòng nhập lại SĐT khác hoặc đăng nhập với SĐT này");
                    setLoading(false);
                } else {
                    Validate.sendError("updateMobileApple", mobile, window.location.href, Constant.API_BASE_URL + "checkMobile", JSON.stringify(data), JSON.stringify(dataRes), dataRes.message);
                    setError(dataRes.message);
                    setLoading(false);
                }
            }
        });
    }

    function handleSecure() {
        window.sendActionToNative(mobile);
    }

    function onRegisterCallBackNative(dataNative) {
        window.callback = dataNative ? 1 : 0;
    }

    function handleExit() {
        try {
            window.sendActionToNative("exit_login");
            Validate.sendSuccess("click-exitapp", mobile, window.location.href, "", "", "success");
        } catch (error) {
            Validate.sendError("click-exitapp", mobile, window.location.href, "", "", "error");
        }
    }

    let dataState = {
        acc: mobile.trim(),
        mobile: mobile.trim(),
        from: 'updateMobileApple',
    };

    if (callback) {
        return (window.location.replace(callback));
    } else if (data.signal === 1) {
        return (<Redirect to={{ pathname: '/talk/confirmMobile', state: dataState }} />)
    } else {
        let className = !error ? "enter-txt" : "enter-txt input-danger";
        let tmp_input = Validate.validateMobile(accProps ? accProps : '') ? accProps : '';
        return (
            <div className="wrapper-chua-sdt">
                <div className="img-back"></div>
                <p className="img-back" onClick={() => handleExit()}>
                    <img src="https://mingid.mediacdn.vn/king/image/back.png" alt="" />
                </p>
                <img src="https://mingid.mediacdn.vn/king/image/logo-chua-sdt.png" alt="" />

                <h2>Cập nhật số điện thoại để chat với bạn bè dễ dàng hơn trên Lotus Chat</h2>
                <div className="wrapper-input">
                    <input
                        type="tel"
                        name="account"
                        ref={myRef}
                        placeholder="Nhập số điện thoại"
                        className={className}
                        onChange={(e) => handleChangeMobile(e.target.value)}
                        defaultValue={tmp_input}
                    />
                </div>
                <button className="submit-btn btn-login" onClick={() => handleAddMobile()}
                    disabled={
                        (error & error !== "Đường truyền mạng không ổn định. Vui lòng thử lại.")
                        || !mobile || loading}>
                    {buttonContinue}
                </button>

                {showError()}
                {showError2()}
            </div>
        )
    }
}
