import React, { useState } from 'react';

import Constant from "../Constant";
import Validate from "../Validate";

export default function SetPasswordOK(props) {
    let accProps = (props.location.state && props.location.state.acc) ? props.location.state.acc : '';

    let [error, setError] = useState('');
    let [data, setData] = useState('');

    function showError() {
        if (error !== null) {
            return (<div className="text-orange text-center font15 marginT16">{error}</div>)
        }
    }

    function skip() {
        if (!accProps) {
            setError("Có lỗi xảy ra. Vui lòng thử lại");
            return;
        }

        var data = JSON.stringify({
            'acc': accProps
        });

        var dataKibana = JSON.stringify({
            'acc': accProps
        });

        Validate.sendSuccess("click-skip", accProps, window.location.href, Constant.API_BASE_URL + "getCallBack", JSON.stringify(dataKibana), "success");

        Validate.requestPost(Constant.API_BASE_URL + "getCallBack", data, function (error, dataRes) {
            if (error) {
                setError("Đường truyền mạng không ổn định. Vui lòng thử lại.");
                Validate.sendError("setPassword", accProps, window.location.href, Constant.API_BASE_URL + "getCallBack", JSON.stringify(data), "Đường truyền mạng không ổn định. Vui lòng thử lại.", JSON.stringify(data));
            } else {
                if (dataRes.signal !== 0) {
                    if (Validate.validateMobile(accProps.toLowerCase())) {
                        window.sendActionToNative('type_login:mobile')
                    } else {
                        window.sendActionToNative('type_login:email')
                    }
                    setData(dataRes);
                    Validate.sendSuccess("setPassword", accProps, window.location.href, Constant.API_BASE_URL + "getCallBack", JSON.stringify(data), JSON.stringify(dataRes));
                } else {
                    setError("Có lỗi xảy ra. Vui lòng thử lại");
                }
            }
        });
    }

    if (data.signal === 1) {
        return (window.location.replace(data.data ? data.data : Constant.REDIRECT_URL))
    } else {
        return (
            <div className="wrapper-index">
                <img src="https://mingid.mediacdn.vn/king/image/success.png" alt="" />
                <h2>Đặt lại mật khẩu thành công</h2>
                <p className="title-index">Từ nay bạn hãy dùng mật khẩu tài khoản ViệtID để đăng nhập Lotus Chat</p>
                <button className="submit-btn btn-login" onClick={() => skip()}>Tiếp tục đăng nhập</button>

                {showError()}
            </div>
        )
    }
}