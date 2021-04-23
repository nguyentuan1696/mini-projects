import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Constant from "../Constant";
import Validate from "../Validate";
import CustomScroll from "../CustomScroll";

import * as AccountAction from "../store/actions/account/account.actions";

export default function Inxdex(props)
{
    console.log(props)
    let dispatch = useDispatch();

    let tmp_data = useSelector(({ accountStore }) => accountStore.values);
  
    let divVersion = '';
    let urlParse = Validate.parseURLParams(window.location.href);
    if (urlParse != null && urlParse.version && urlParse.version[0]) {
        localStorage.setItem('version', urlParse.version[0]);
    }

    let versionStorage = localStorage.getItem('version');
    if (versionStorage != null) {
        divVersion = (<div className="marginT14 color616161 text-center">Phiên bản hiện tại {versionStorage}</div>);
    }

    let [accCookie, setAccCookie] = useState(urlParse != null && urlParse.account && urlParse.account[0] ? urlParse.account[0] : '');

    useEffect(() => {
        if (accCookie);
    }, [accCookie]);

    let [userInfoCookie, setUserInfoCookie] = useState({
        avatar: '',
        fullname: '',
        username: ''
    });

    let [account, setAccount] = useState(tmp_data ? tmp_data.acc : '');
    let [error, setError] = useState(null);
    let [data, setData] = useState('');
    let [popUp, setPopUp] = useState(false);
    let [quickLogin, setQuickLogin] = useState(false);
    let [login, setLogin] = useState('');
    let [loading, setLoading] = useState(false);

    let accProps = (props.location.state && props.location.state.acc) ? props.location.state.acc : account;

    let myRef = useRef(null)
    let heightKeyBoard = useSelector(({ scroll }) => scroll.values);

    useEffect(() => {
        CustomScroll.scrollToTop();
        if (accProps) setAccount(accProps);
    }, []);

    useEffect(() => {
        if (tmp_data) setAccount(tmp_data.acc);
    }, [tmp_data])

    useEffect(() => {
        if (heightKeyBoard > 0) {
            CustomScroll.executeScroll(myRef, heightKeyBoard);
        } else {
            CustomScroll.scrollToTop();
        }
    }, [heightKeyBoard]);

    function handleChange(e) {
        setAccount(e);
        setError('');
        setAccCookie(null);
    }

    function showError() {
        if (error !== null) {
            return (<div className="text-orange font15 marginT16">{error}</div>)
        }
    }

    function handleLogin() {
        setLoading(true);
        if (!account) {
           setError("Vui lòng nhập Số điện thoại/Email.");
            Validate.sendError("login", "", window.location.href, Constant.API_BASE_URL + "checkpass", "", "", "Vui lòng nhập Số điện thoại/Email.");
            setLoading(false);
            return;
        }

        account = account.trim();
        account = account.toLowerCase();

        Validate.sendSuccess("click-login", account, window.location.href, Constant.API_BASE_URL + "checkpass", "", "success");

        var isMobile = false;
        if (/^\d+$/.test(account) && Validate.validateMobile(account)) { // check string only numbers
            isMobile = true;
        }

        if (/^\d+$/.test(account) && !isMobile) {
            setError("Đây không phải số điện thoại hợp lệ. Vui lòng nhập lại số điện thoại của bạn");
            Validate.sendError("login", account, window.location.href, Constant.API_BASE_URL + "checkpass", "", "", "Đây không phải số điện thoại hợp lệ. Vui lòng nhập lại số điện thoại của bạn");
            setLoading(false);
            return;
        }

        if (!Validate.validateEmail(account) && !isMobile) {
            let text_err = "Email của bạn không đúng. Vui lòng nhập lại Email của bạn";
            setError(text_err);
            Validate.sendError("login", account, window.location.href, Constant.API_BASE_URL + "checkpass", "", "", text_err);
            setLoading(false);
            return;
        }

        if (window.ee) window.ee.addListener('secureSDK', getSecure);
        window.sendActionToNative(account);
    }

    function getSecure(cb) {
        var data = JSON.stringify({
            'acc': account.toLowerCase() ? account.toLowerCase() : accProps.toLowerCase(),
            'dataNative': cb
        });

        Validate.requestPost(Constant.API_BASE_URL + "checkpass", data, function (error, dataRes) {
            if (window.ee) {
                window.ee.removeListener('secureSDK', getSecure);
            }

            if (error) {
                setError("Đường truyền mạng không ổn định. Vui lòng thử lại.");
                Validate.sendError("login", account.toLowerCase() ? account.toLowerCase() : accProps.toLowerCase(), window.location.href, Constant.API_BASE_URL + "checkpass", JSON.stringify(data), "Đường truyền mạng không ổn định. Vui lòng thử lại.", JSON.stringify(data));
                setLoading(false);
            } else {
                if (dataRes.signal !== 0) {
                    Validate.sendSuccess("login", account.toLowerCase() ? account.toLowerCase() : accProps.toLowerCase(), window.location.href, Constant.API_BASE_URL + "checkpass", JSON.stringify(data), JSON.stringify(dataRes));
                    setLoading(false);

                    let userInfo = {};
                    if (dataRes.signal === 4 || dataRes.signal === 5) {
                        userInfo = {
                            acc: account.toLowerCase() ? account.toLowerCase() : accProps.toLowerCase()
                        }
                    } else {
                        userInfo = {
                            avatar: dataRes.data.avatar,
                            name: dataRes.data.fullname ? dataRes.data.fullname : dataRes.data.username,
                            acc: dataRes.data.acc
                        };
                    }

                    dispatch(AccountAction.setDataAccount(userInfo));

                    setData(dataRes);
                    if (dataRes.signal === 4 || dataRes.signal === 5) setPopUp(true);
                    if (dataRes.signal === 6) setQuickLogin(true);
                } else {
                    Validate.sendError("login", account.toLowerCase() ? account.toLowerCase() : accProps.toLowerCase(), window.location.href, Constant.API_BASE_URL + "checkpass", JSON.stringify(data), JSON.stringify(dataRes), dataRes.message);
                    setLoading(false);
                    setError(dataRes.message);
                }
            }
        });
    }

    function handleAccCookie() {
        if (!accCookie) {
            setError("Vui lòng nhập Số điện thoại/Email.");
            Validate.sendError("login", "", window.location.href, Constant.API_BASE_URL + "checkLoginInfo", "", "", "Vui lòng nhập Số điện thoại/Email.");
            setLoading(false);
            return;
        }

        accCookie = accCookie.trim();
        accCookie = accCookie.toLowerCase();

        Validate.sendSuccess("click-login", accCookie, window.location.href, Constant.API_BASE_URL + "checkLoginInfo", "", "success");

        var isMobile = false;
        if (/^\d+$/.test(accCookie) && Validate.validateMobile(accCookie)) { // check string only numbers
            isMobile = true;
        }

        if (/^\d+$/.test(accCookie) && !isMobile) {
            setError("Đây không phải số điện thoại hợp lệ. Vui lòng nhập lại số điện thoại của bạn");
            Validate.sendError("login", accCookie, window.location.href, Constant.API_BASE_URL + "checkLoginInfo", "", "", "Đây không phải số điện thoại hợp lệ. Vui lòng nhập lại số điện thoại của bạn");
            return;
        }

        if (!Validate.validateEmail(accCookie) && !isMobile) {
            let text_err = "Email của bạn không đúng. Vui lòng nhập lại Email của bạn";
            setError(text_err);
            Validate.sendError("login", accCookie, window.location.href, Constant.API_BASE_URL + "checkLoginInfo", "", "", text_err);
            return;
        }

        var data = JSON.stringify({
            'acc': accCookie.toLowerCase()
        });

        Validate.requestPost(Constant.API_BASE_URL + "checkLoginInfo", data, function (error, dataRes) {
            if (window.ee) {
                window.ee.removeListener('secureSDK', getSecure);
            }

            if (error) {
                setError("Đường truyền mạng không ổn định. Vui lòng thử lại.");
                Validate.sendError("login", accCookie.toLowerCase(), window.location.href, Constant.API_BASE_URL + "checkLoginInfo", JSON.stringify(data), "Đường truyền mạng không ổn định. Vui lòng thử lại.", JSON.stringify(data));

            } else {
                if (dataRes.signal !== 0) {
                    Validate.sendSuccess("login", accCookie.toLowerCase(), window.location.href, Constant.API_BASE_URL + "checkLoginInfo", JSON.stringify(data), JSON.stringify(dataRes));
                    setUserInfoCookie(dataRes.data);
                } else {
                    Validate.sendError("login", account.toLowerCase() ? account.toLowerCase() : accProps.toLowerCase(), window.location.href, Constant.API_BASE_URL + "checkLoginInfo", JSON.stringify(data), JSON.stringify(dataRes), dataRes.message);
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

    function showPopUp() {
        let tmp_acc = accProps ? accProps.toLowerCase() : account.toLowerCase();
        let dataState = {
            acc: tmp_acc,
            from: 'index'
        };

        let options = (Validate.validateEmail(tmp_acc)) ?
            (<div className="modal-body-new-phone">
                <h3>Email <span className="blue-txt">{tmp_acc}</span> chưa được đăng ký</h3>
                <p>Vui lòng nhập lại hoặc ấn nút đăng ký mới với số điện thoại để tham gia Lotus Chat</p>
                <Link className="login-index marginB31" to={{ pathname: '/talk/registerAccount', state: dataState }}>Đăng ký với số điện thoại</Link>
            </div>) :
            (<div className="modal-body-new-phone">
                <h3>Số điện thoại <span className="blue-txt">{tmp_acc}</span> chưa được đăng ký</h3>
                <p>Ấn nút đăng ký tài khoản VietID để tham gia Lotus Chat ngay với số điện thoại này của bạn</p>
                <Link className="login-index marginB31" to={{ pathname: '/talk/registerAccount', state: dataState }}>Đăng ký tài khoản</Link>
            </div>);

        if (popUp) {
            return (
                <div className="modal-wrapper">
                    <div className="modal-content">
                        <div className="new-phone-modal">
                            <div className="modal-header-new-phone">
                                <img src="https://mingid.mediacdn.vn/king/image/logo-lotus.png" alt="Lotus" />
                                <span onClick={() => setPopUp(false)}><img src="https://mingid.mediacdn.vn/king/image/close.png" alt="" /></span>
                            </div>

                            {options}

                            <div className="modal-footer-new-phone">
                                <hr className="marginB31" />
                                <span>Hoặc</span>
                                <p className="register-index color616161" onClick={() => setPopUp(false)}>Quay lại</p>
                            </div>
                        </div>
                    </div>

                </div>
            )
        }
    }

    function handleQuickLogin() {
        if (!account) {
            setError("Vui lòng nhập Số điện thoại/Email.");
            Validate.sendError("quick-login", "", window.location.href, Constant.API_BASE_URL + "quickLogin", "", "", "Vui lòng nhập Số điện thoại/Email.");
            return;
        }

        account = account.trim();
        account = account.toLowerCase();

        Validate.sendSuccess("click-quick-login", account, window.location.href, Constant.API_BASE_URL + "quickLogin", "", "success");

        if (window.ee) window.ee.addListener('secureSDK', getSecureQuickLogin);
        window.sendActionToNative(account);
    }

    function getSecureQuickLogin(cb) {
        var data = JSON.stringify({
            'acc': account.toLowerCase() ? account.toLowerCase() : accProps.toLowerCase(),
            'dataNative': cb
        });

        Validate.requestPost(Constant.API_BASE_URL + "quickLogin", data, function (error, dataRes) {
            if (window.ee) window.ee.removeListener('secureSDK', getSecureQuickLogin);

            if (error) {
                setError("Đường truyền mạng không ổn định. Vui lòng thử lại.");
                Validate.sendError("quick-login", account.toLowerCase() ? account.toLowerCase() : accProps.toLowerCase(), window.location.href, Constant.API_BASE_URL + "quickLogin", JSON.stringify(data), "Đường truyền mạng không ổn định. Vui lòng thử lại.", JSON.stringify(data));
            } else {
                if (dataRes.signal !== 0) {
                    Validate.sendSuccess("quick-login", account.toLowerCase() ? account.toLowerCase() : accProps.toLowerCase(), window.location.href, Constant.API_BASE_URL + "quickLogin", JSON.stringify(data), JSON.stringify(dataRes));
                    if (!window.hasmobile) {
                        setData({ signal: 7 });
                    } else {
                        if (Validate.validateMobile(account.toLowerCase() ? account.toLowerCase() : accProps.toLowerCase())) {
                            window.sendActionToNative('type_login:mobile');
                        } else {
                            window.sendActionToNative('type_login:email');
                        }
                        setLogin(dataRes);
                    }
                } else {
                    Validate.sendError("quick-login", account.toLowerCase() ? account.toLowerCase() : accProps.toLowerCase(), window.location.href, Constant.API_BASE_URL + "quickLogin", JSON.stringify(data), JSON.stringify(dataRes), dataRes.message);
                    setError(dataRes.message);
                }
            }
        });
    }

    function showQuickLogin() {
        let avatar = (data && data.data && data.data.avatar) ? data.data.avatar : "";
        let acc = (data && data.data && data.data.acc) ? data.data.acc : "";
        let username = (data && data.data && data.data.username) ? data.data.username : "";
        let fullname = (data && data.data && data.data.fullname) ? data.data.fullname : "";
        let hasmobile = (data && data.data && data.data.hasmobile) ? data.data.hasmobile : "";
        window.hasmobile = hasmobile;

        if (quickLogin) {
            return (
                <div className="modal-wrapper">
                    <div className="modal-content">
                        <div className="new-phone-modal paddingT24">
                            <div className="modal-header-new-phone marginB24">
                                <div className="info-user small">
                                    <img src={avatar} alt="Lotus" className="avatar-user" />
                                    <div className="info">
                                        <h5 className="username">{fullname ? fullname : username}</h5>
                                        <p className="email">{acc}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-body-new-phone">
                                <p className="color16161F">Tài khoản này đang được đăng nhập trên thiết bị hiện tại. Bạn có muốn đi tới tài khoản này không?</p>
                                <button className="submit-btn btn-login login-index marginB31" onClick={() => handleQuickLogin()}>Đi tới tài khoản này</button>
                            </div>

                            <div className="modal-footer-new-phone">
                                <hr className="marginB31" />
                                <span>Hoặc</span>
                                <p className="register-index color616161" onClick={() => setQuickLogin(false)}>Hủy</p>
                            </div>
                        </div>
                    </div>

                </div>
            )
        }
    }

    function getCallBack() {
        if (!accCookie) {
            setError("Có lỗi xảy ra. Vui lòng thử lại");
            return;
        }

        var data = JSON.stringify({
            'acc': accCookie
        });

        var dataKibana = JSON.stringify({
            'acc': accCookie
        });

        Validate.sendSuccess("click-getCallBack", accCookie, window.location.href, Constant.API_BASE_URL + "getCallBack", JSON.stringify(dataKibana), "success");

        Validate.requestPost(Constant.API_BASE_URL + "getCallBack", data, function (error, dataRes) {
            if (error) {
                setError("Đường truyền mạng không ổn định. Vui lòng thử lại.");
                Validate.sendError("successLogin", accCookie, window.location.href, Constant.API_BASE_URL + "getCallBack", JSON.stringify(data), "Đường truyền mạng không ổn định. Vui lòng thử lại.", JSON.stringify(data));
            } else {
                Validate.sendSuccess("successLogin", accCookie, window.location.href, Constant.API_BASE_URL + "getCallBack", JSON.stringify(data), JSON.stringify(dataRes));
                if (dataRes.signal !== 0) {
                    if (Validate.validateMobile(accCookie)) {
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

    function closePopUpCookie() {
        setUserInfoCookie(null);
        setAccCookie(null);
    }

    function showQuickLoginCookie() {
        let avatar = (userInfoCookie && userInfoCookie.avatar) ? userInfoCookie.avatar : "";
        let username = (userInfoCookie && userInfoCookie.username) ? userInfoCookie.username : "";
        let fullname = (userInfoCookie && userInfoCookie.fullname) ? userInfoCookie.fullname : "";

        if (username || fullname) {
            return (
                <div className="modal-wrapper">
                    <div className="modal-content">
                        <div className="new-phone-modal paddingT24">
                            <div className="modal-header-new-phone marginB24">
                                <div className="info-user small">
                                    <img src={avatar} alt="Lotus" className="avatar-user" />
                                    <div className="info">
                                        <h5 className="username">{fullname ? fullname : username}</h5>
                                        <p className="email">{accCookie}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-body-new-phone">
                                <p className="color16161F">Tài khoản này đang được đăng nhập trên thiết bị hiện tại. Bạn có muốn đi tới tài khoản này không?</p>
                                <button className="submit-btn btn-login login-index marginB31" onClick={() => getCallBack()}>Đi tới tài khoản này</button>
                            </div>

                            <div className="modal-footer-new-phone">
                                <hr className="marginB31" />
                                <span>Hoặc</span>
                                <p className="register-index color616161" onClick={() => closePopUpCookie()}>Hủy</p>
                            </div>
                        </div>
                    </div>

                </div>
            )
        }
        
    }

    function handleBack() {
        if (window && window.sendActionToNative) window.sendActionToNative("exit_login");
    }

    let dataState = {
        acc: account ? account.toLowerCase() : '',
        from: 'index',
        hasMobile: (data && data.data && data.data.hasmobile) ? data.data.hasmobile : false,
    };

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
        let className = error ? "input-danger enter-txt" : "enter-txt";
        let srcImg = "https://mingid.mediacdn.vn/king/image/logo-vietid.png";

        return (
            <div className="wrapper-enter-phone">
                <div className="img-back" onClick={() => handleBack()} >
                    <img src="https://mingid.mediacdn.vn/king/image/back.png" alt="" />
                </div>

                <div className="img-logo">
                    <img src={srcImg} alt="Lotus" />
                </div>

                <div className="title">Đăng nhập tài khoản của bạn để tiếp tục sử dụng Lotus Chat</div>

                <div className="wrapper-input">
                    <input
                        type="text"
                        name="account"
                        placeholder="Nhập số điện thoại hoặc Email"
                        defaultValue={account ? account : ''}
                        className={className}
                        ref={myRef}
                        onChange={(e) => handleChange(e.target.value)}
                    />
                </div>
                <button className="submit-btn btn-login" onClick={() => handleLogin()} disabled={
                    (error & error !== "Đường truyền mạng không ổn định. Vui lòng thử lại.")
                    || (!account && !tmp_data) || loading}>
                    {buttonContinue}
                </button>

                {showError()}

                <div className="footer-index">
                    <hr />
                    <span>Hoặc</span>
                    <Link to="/talk/registerAccount" className="register-index text-bold">Đăng ký tài khoản VietID mới</Link>
                    {divVersion}
                </div>

                {showPopUp()}
                {showQuickLogin()}
                {showQuickLoginCookie()}
            </div>
        )
    }
}
