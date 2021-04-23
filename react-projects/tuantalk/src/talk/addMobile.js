import React, { useState, useRef, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";

import Constant from "../Constant";
import Validate from "../Validate";
import CustomScroll from "../CustomScroll";
import { useSelector, useDispatch } from "react-redux";

import * as AccountAction from "../store/actions/account/account.actions";

export default function AddMobile(props) {
    let dispatch = useDispatch();

    let accProps = (props.location.state && props.location.state.acc) ? props.location.state.acc : '';
    let mobileProps = (props.location.state && props.location.state.mobile) ? props.location.state.mobile : '';

    let [mobile, setMobile] = useState('');
    let [error, setError] = useState(null);
    let [data, setData] = useState('');
    let [exist, setExist] = useState(null);
    let [redirect, setRedirect] = useState(false);

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

    function showError() {
        if (error !== null && data.signal !== 2) {
            return (<div className="text-orange font15 marginT16">{error}</div>)
        }
    }

    function goToIndex() {
        let userInfo = {
            avatar: '',
            name: '',
            acc: mobile
        };

        dispatch(AccountAction.setDataAccount(userInfo));
        setRedirect(true);
    }

    function showError2() {
        if (exist !== null) {
            return (
                <div className="modal-wrapper">
                    <div className="modal-content">
                        <div className="new-phone-modal">
                            <div className="modal-header-new-phone">
                                <img src="https://mingid.mediacdn.vn/king/image/logo-lotus.png" alt="Lotus" />
                                <span onClick={() => setExist(null)}><img src="https://mingid.mediacdn.vn/king/image/close.png" alt="" /></span>
                            </div>

                            <div className="modal-body-new-phone">
                                <h3>Số điện thoại <span className="blue-txt">{mobile}</span>  đã là tài khoản ViệtID nên không thể cập nhật vào tài khoản này</h3>
                                <p>Bạn có thể đăng nhập bằng số điện thoại này hoặc nhập lại số điện thoại khác</p>
                                <div className="login-index marginB31" onClick={() => goToIndex()}>Đăng nhập với SĐT này</div>
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
        if (!mobile && !mobileProps) {
            setError("Vui lòng nhập Số điện thoại");
            Validate.sendError("addMobile", "", window.location.href, Constant.API_BASE_URL + "checkMobile", "", "", "Vui lòng nhập Số điện thoại");
            return;
        }

        if (!mobile) mobile = mobileProps;
        mobile = mobile.trim();

        Validate.sendSuccess("click-addMobile", mobile, window.location.href, Constant.API_BASE_URL + "checkMobile", "", "success");

        if (!Validate.validateMobile(mobile)) {
            setError("Đây không phải số điện thoại hợp lệ. Vui lòng nhập lại số điện thoại của bạn");
            Validate.sendError("addMobile", mobile, window.location.href, Constant.API_BASE_URL + "checkMobile", "", "", "Đây không phải số điện thoại hợp lệ. Vui lòng nhập lại số điện thoại của bạn");
            return;
        }

        if (window.ee) {
            window.ee.addListener('secureSDK', getSecure);
        }

        window.sendActionToNative(mobile);
    }

    function getSecure(cb) {
        var data = JSON.stringify({
            'acc': accProps,
            'mobile': mobile,
            'dataNative': cb
        });

        Validate.requestPost(Constant.API_BASE_URL + "checkMobile", data, function (error, dataRes) {
            if (window.ee) {
                window.ee.removeListener('secureSDK', getSecure);
            }

            if (error) {
                setError("Đường truyền mạng không ổn định. Vui lòng thử lại.");
                Validate.sendError("addMobile", mobile, window.location.href, Constant.API_BASE_URL + "checkMobile", JSON.stringify(data), "Đường truyền mạng không ổn định. Vui lòng thử lại.", JSON.stringify(data));
            } else {
                if (dataRes.signal !== 0) {
                    Validate.sendSuccess("addMobile", mobile, window.location.href, Constant.API_BASE_URL + "checkMobile", JSON.stringify(data), JSON.stringify(dataRes));

                    if (dataRes.signal === 1) setData(dataRes);
                    if (dataRes.signal === 2) {
                        setExist("Số điện thoại đã được đăng ký. Vui lòng nhập lại SĐT khác hoặc đăng nhập với SĐT này");
                    }
                } else {
                    Validate.sendError("addMobile", mobile, window.location.href, Constant.API_BASE_URL + "checkMobile", JSON.stringify(data), JSON.stringify(dataRes), dataRes.message);
                    setError(dataRes.message);
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

    let dataState = {
        acc: accProps,
        mobile: mobile ? mobile : mobileProps,
        from: 'addMobile',
    };

    if (data.signal === 1) {
        return (<Redirect to={{ pathname: '/talk/confirmMobile', state: dataState }} />)
    } else if (redirect) {
        let data = {
            acc: mobile,
            from: 'addMobile',
        };
        return (<Redirect to={{ pathname: '/talk/index', state: data }} />)
    } else {
        return (
            <div className="wrapper-chua-sdt">
                <div className="img-back"></div>
                <img src="https://mingid.mediacdn.vn/king/image/logo-chua-sdt.png" alt="" />
                <h2>Tài khoản chưa cập nhật số điện thoại. Hãy cập nhật để chat với bạn bè dễ dàng hơn</h2>
                <div className="wrapper-input">
                    <input
                        type="text"
                        name="account"
                        placeholder="Nhập số điện thoại"
                        className="enter-txt"
                        ref={myRef}
                        defaultValue={mobileProps ? mobileProps : ''}
                        onChange={(e) => handleChangeMobile(e.target.value)}
                    />
                </div>
                <button className="submit-btn btn-login" onClick={() => handleAddMobile()}>Tiếp tục</button>

                {showError()}
                {showError2()}
            </div>
        )
    }
}
