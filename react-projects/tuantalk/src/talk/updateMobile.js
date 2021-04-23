import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Redirect } from "react-router-dom";

import Constant from "../Constant";
import Validate from "../Validate";
import CustomScroll from "../CustomScroll";
import {useSelector} from "react-redux";

export default function UpdateMobile(props) {
    let accProps = (props.location.state && props.location.state.acc) ? props.location.state.acc : '';
    let [mobile, setMobile] = useState('');
    let [account, setAccount] = useState('');
    let [error, setError] = useState(null);
    let [data, setData] = useState('');
    let [popUp, setPopUp] = useState(false);
    let [loading, setLoading] = useState(false);

    let myRef = useRef(null);
    let heightKeyBoard = useSelector(({scroll}) => scroll.values);

    useEffect(() => {
        CustomScroll.scrollToTop();
    }, []);

    useEffect(() => {
        if (heightKeyBoard > 0) {
            CustomScroll.executeScroll(myRef, heightKeyBoard)
        } else {
            CustomScroll.scrollToTop()
        }
    }, [heightKeyBoard]);

    useEffect(() => {
        Validate.requestPost(Constant.API_BASE_URL + "checkLogin", null, function (error, dataRes) {
            if (error) {
            } else {
                if (dataRes.signal !== 0) {
                    let email = (dataRes.data && dataRes.data.email) ? dataRes.data.email : '';
                    let mobile = (dataRes.data && dataRes.data.mobile) ? dataRes.data.mobile : '';
                    setAccount(email ? email : mobile);
                } else {
                    setError(dataRes.message);
                }
            }
        });
    }, []);

    function showError() {
        if (error !== null) {
            return (<div className="text-orange font15 marginT16">{error}</div>)
        }
    }

    function handleChangeMobile(e) {
        setMobile(e);
        setError(null);
    }

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

    function handleUpdateMobile() {
        if (!mobile) {
            setError("Vui lòng nhập Số điện thoại");
            Validate.sendError("updateMobile", "", window.location.href, Constant.API_BASE_URL + "checkMobile", "", "", "Vui lòng nhập Số điện thoại");
            return;
        }

        mobile = mobile.trim();
        Validate.sendSuccess("click-updateMobile", mobile, window.location.href, Constant.API_BASE_URL + "checkMobile", "", "success");

        if (!Validate.validateMobile(mobile)) {
            setError("Đây không phải số điện thoại hợp lệ. Vui lòng nhập lại số điện thoại của bạn");
            Validate.sendError("updateMobile", mobile, window.location.href, Constant.API_BASE_URL + "checkMobile", "", "", "Đây không phải số điện thoại hợp lệ. Vui lòng nhập lại số điện thoại của bạn");
            return;
        }

        if (window.ee) {
            window.ee.addListener('secureSDK', getSecure);
        }

        window.sendActionToNative(mobile);
    }

    function getSecure(cb) {
        var data = JSON.stringify({
            'acc': account,
            'mobile': mobile,
            'dataNative': cb,
            'type': 'update'
        });

        Validate.requestPost(Constant.API_BASE_URL + "checkMobile", data, function (error, dataRes) {
            if (window.ee) {
                window.ee.removeListener('secureSDK', getSecure);
            }

            setPopUp(false);

            if (error) {
                setError("Đường truyền mạng không ổn định. Vui lòng thử lại.");
                Validate.sendError("updateMobile", mobile, window.location.href, Constant.API_BASE_URL + "checkMobile", JSON.stringify(data), "Đường truyền mạng không ổn định. Vui lòng thử lại.", JSON.stringify(data));
            } else {
                if (dataRes.signal !== 0) {
                    Validate.sendSuccess("updateMobile", mobile, window.location.href, Constant.API_BASE_URL + "checkMobile", JSON.stringify(data), JSON.stringify(dataRes));
                    setData(dataRes);
                    if (dataRes.signal === 2) {
                        setError("Số điện thoại đã được đăng ký. Vui lòng nhập lại SĐT khác hoặc đăng nhập với SĐT này");
                    }
                } else {
                    Validate.sendError("updateMobile", mobile, window.location.href, Constant.API_BASE_URL + "checkMobile", JSON.stringify(data), JSON.stringify(dataRes), dataRes.message);
                    setError(dataRes.message);
                }
            }
        });
    }

    function handleSecure() {
        window.sendActionToNative(mobile);
    }

    function onRegisterCallBackNative(dataNative) {
        if (dataNative) {
            window.callback = 1;
        } else {
            window.callback = 0;
        }
    }

    function handleExit() {
        try {
            window.sendActionToNative("exit_login");
            Validate.sendSuccess("click-exitapp", mobile, window.location.href, "", "", "success");
        } catch (error) {
            Validate.sendError("click-exitapp", mobile, window.location.href, "", "", "error");
        }
    }

    function handleShowPopUp() {
        setLoading(true);
        if (!mobile) {
            setError("Vui lòng nhập Số điện thoại");
            Validate.sendError("updateMobile", "", window.location.href, Constant.API_BASE_URL + "checkMobile", "", "", "Vui lòng nhập Số điện thoại");
            return;
        }
        setLoading(false);
        setPopUp(true);
    }

    let dataState = {
        acc: account,
        mobile: mobile,
        from: 'updateMobile',
    };

    if (data.signal === 1) {
        return (<Redirect to={{ pathname: '/talk/confirmMobileInApp', state: dataState }} />)
    } else {
        let className = popUp ? "modal-wrapper" : "modal-wrapper display-none";
        let tmp_input = Validate.validateMobile(accProps ? accProps : '') ? accProps : '';
        return (
            <div className="wrapper-chua-sdt">
                <p className="img-back" onClick={() => handleExit()}>
                    <img src="https://mingid.mediacdn.vn/king/image/back.png" alt="" />
                </p>
                <div className="img-back"></div>
                <img src="https://mingid.mediacdn.vn/king/image/logo-chua-sdt.png" alt="" />
                <h2>Cập nhập số điện thoại mới của bạn</h2>
                <div className="wrapper-input">
                    <input
                        type="tel"
                        name="account"
                        ref={myRef}
                        placeholder="Nhập số điện thoại"
                        className="enter-txt"
                        onChange={(e) => handleChangeMobile(e.target.value)}
                        defaultValue={tmp_input}
                    />
                </div>
                <button className="submit-btn btn-login" onClick={() => handleShowPopUp()} disabled={
                    ( error & error !== "Đường truyền mạng không ổn định. Vui lòng thử lại." )
                    || !mobile || loading}>
                    {buttonContinue}
                </button>

                {showError()}

                <div className={className}>
                    <div className="otp-ok-modal">
                        <div className="modal-body">
                            <p>Bạn có chắc chắn muốn cập nhật số điện thoại mới không?</p>
                        </div>
                        <div className="modal-footer">
                            <p id="close" onClick={() => setPopUp(false)}>Bỏ qua</p>
                            <p className="btn-add-mobile" onClick={() => handleUpdateMobile()}>Đồng ý</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
