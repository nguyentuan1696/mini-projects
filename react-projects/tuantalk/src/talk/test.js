import React from 'react';
import { useForm } from 'react-hook-form';

export default function Test() {
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => {
        console.log("data", data);
    }

    if (errors.account || errors.password) {
        console.log("errors", errors);
    }

    return (
        <div className="wrapper-enter-phone">
            <div className="img-logo">
                <img src="https://mingid.mediacdn.vn/king/image/logo-vietid.png" alt="Lotus" />
            </div>

            <div className="title">Đăng nhập tài khoản của bạn để tiếp tục sử dụng Lotus Chat</div>

            <div className="wrapper-input">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Email/SĐT</label>
                    <input ref={register({ required: true })} type="text" name="account" placeholder="Nhập số điện thoại hoặc Email" className="enter-txt" />
                    {errors.account && <div className="text-orange font15 marginT16">Vui lòng nhập số điện thoại hoặc Email</div>}

                    <label className="marginT14">Password</label>
                    <input ref={register({ required: true })} type="password" name="password" placeholder="Nhập password" className="enter-txt" />
                    {errors.password && <div className="text-orange font15 marginT16">Vui lòng nhập password</div>}

                    {/* 
                        input rỗng thì disable
                        dùng useForm thì không disabled đc -> dùng onChange
                    */}
                    <button className="submit-btn btn-login">Tiếp tục</button>
                </form>
            </div>
        </div>
    )
}
