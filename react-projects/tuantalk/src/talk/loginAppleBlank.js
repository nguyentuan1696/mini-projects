import React, { useEffect, useState } from 'react';
import Constant from "../Constant";
import Validate from "../Validate";

var md5 = require('md5');
var sha256 = require('sha256');

export default function LoginAppleBlank() {
    let time = (new Date()).getTime();
    let encryptMD5 = md5('khonggica123123' + time);
    let encryptAndroid = sha256(encryptMD5 + time);
    let dataApple = JSON.stringify({
        data: '123123',
        data_encrypt: encryptAndroid,
        time: time
    });

    let dataApple2 = JSON.stringify({ dataNative: dataApple });

    useEffect(() => {
        Validate.requestPost(Constant.API_BASE_URL + "getUrlAppleID", dataApple2, function (error, dataRes) {
            if (error) {
            } else {
                if (dataRes.signal === 1) {
                    return (window.location.replace(dataRes.data ? dataRes.data : Constant.REDIRECT_URL));
                }
            }
        });
    }, []);

    function handleBack() {
        if (window && window.sendActionToNative) window.sendActionToNative("exit_login");
    }
    
    return (
        <div className="wrapper-index">
            <img src="https://mingid.mediacdn.vn/king/image/logo-index.png" style={{ marginTop: '40%' }} alt="" />

            <div className="footer-index">
                <div className="login-index" onClick={() => handleBack()}>Quay lại</div>
            </div>
        </div>
    )
}
