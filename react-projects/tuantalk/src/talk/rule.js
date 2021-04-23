import React from 'react';
import { Link } from "react-router-dom";

export default function Rule(props) {
    let fromState = (props.location.state && props.location.state.from) ? props.location.state.from : '';

    let back = <Link to='/talk/registerAccount'><img src="https://mingid.mediacdn.vn/king/image/chevron-left.png" alt="" /></Link>;

    return (
        <div className="select-country">
            <div className="top-search">
                <div className="clearfix top">
                    {back}
                    <span className="title-li font17 text-black">Điều khoản sử dụng</span>
                </div>
            </div>

            <div className="body-content font-SF-Pro-Display-Regular font15 text-black">
                <span className="title-li font15 text-black">1. QUY ĐỊNH CHUNG</span>
                <div className="marginB8"></div>

                <span>
                    Thỏa thuận cung và sử dụng dịch vụ mạng xã hội www.congdong.vietid.net là
                    những điều khoản hợp pháp đối với việc sử dụng các dịch vụ mà chúng tôi cung cấp.
                    Việc sử dụng các dịch vụ của chúng tôi đồng nghĩa với việc bạn đồng ý với bản quy định này,
                    cho dù bạn là Khách viếng thăm (những người chỉ xem các nội dung có trên hệ thống www.congdong.vietid.net)
                    hay là Thành viên (những người đăng ký và sử dụng đầy đủ các dịch vụ).
                    Thuật ngữ Người Sử Dụng được sử dụng trong văn bản này bao gồm cả Khách viếng thăm và Thành viên.
                    Nội dung của văn bản này có thể được thay đổi mà không cần thông báo trước khi chúng tôi cảm thấy nó không còn phù hợp.
                    Bạn có trách nhiệm theo dõi thường xuyên các thông tin được đưa lên mạng để cập nhật những thay đổi mới nhất.
                    Việc tiếp tục sử dụng dịch vụ sau khi được cập nhật đồng nghĩa với việc bạn chấp nhận và đồng ý tuân theo những quy định của bản quy định mới.
                    Chúng tôi yêu cầu bất kỳ Người Sử Dụng nào khi sử dụng dịch vụ của www.congdong.vietid.net phải
                    chấp nhập tất cả các Điều khoản và Điều kiện của bản quy định này/bản quy định mới nhất kể từ thời điểm bắt đầu
                    sử dụng dịch vụ mà không có bất kỳ giới hạn nào. Nếu bạn không chấp thuận những điều khoản này, bạn cần phải ngưng sử dụng các dịch vụ của Chúng tôi.
                    <br />
                    <br />
                    Quy định này cũng ghi rõ những điều khoản đối với việc sử dụng những thông tin,
                    nội dung được gửi lên hệ thống www.congdong.vietid.net, bao gồm cả quyền,
                    nghĩa vụ và giới hạn. Đi kèm với văn bản này là quy định về bảo mật thông tin cá nhân.
                </span>

                <div className="marginB24"></div>
                <span className="title-li font15 text-black">2. ĐIỀU KHOẢN ĐĂNG KÝ</span>
                <div className="marginB8"></div>

                <span>
                    Trong quá trình thực hiện việc đăng ký, Chúng tôi yêu cầu tất cả Người Sử Dụng cung cấp đầy đủ, trung thực,
                    chính xác những thông tin dùng để đăng ký tài khoản của mình. Nếu phát hiện có thông tin không chính xác,
                    thiếu trung thực, Chúng tôi có quyền tạm khóa hoặc đình chỉ việc sử dụng tài khoản của Người Sử
                    Dụng mà không cần thông báo cho bạn cũng như không phải chịu bất cứ trách nhiệm nào.
                    Người Sử Dụng hoàn toàn chịu trách nhiệm việc giữ quyền kiểm soát mật khẩu của mình,
                    không sử dụng tài khoản của Người Sử Dụng khác cũng như không chia sẻ thông tin tài khoản của mình cho bất kỳ
                    Người Sử Dụng nào. Trong bất cứ trường hợp nào, bạn sẽ phải chịu trách nhiệm cho tất cả
                    những hành động có liên quan đến việc sử dụng mật khẩu của mình trên hệ thống.
                    Nếu bạn phát hiện những nghi vấn về việc sử dụng trái phép tài khoản của mình, bạn có thể liên hệ với chúng tôi để được hỗ trợ.
                    <br />
                    <br />
                    Quy trình đăng ký thành viên của www.congdong.vietid.net như sau:
                    <br />
                    <br />
                    Bước 1: Người dùng truy cập vào www.congdong.vietid.net, click đúp vào ô đăng ký tại góc phải màn hình.<br />
                    Bước 2: Người dùng nhập các thông tin cá nhân bắt buộc theo yêu cầu.<br />
                    Bước 3: Sau khi người dùng hoàn thành việc khai báo thông tin, hệ thống sẽ gửi email đến địa chỉ hộp thư điện
                    tử người dùng đã đăng ký để xác thực thông tin và việc sử dụng dịch vụ của người dùng.<br />
                    Bước 4: Người dùng kích hoạt tài khoản theo email hướng dẫn của hệ thống.
                    Hoàn thành thao tác này, người dùng đã chính thức trở thành thành viên của www.congdong.vietid.net
                    và được sử dụng mọi tiện ích của mạng xã hội www.congdong.vietid.net.
                    Trong quá trình sử dụng các dịch vụ của mạng xã hội www.congdong.vietid.net,
                    trường hợp thành viên có nhu cầu thay đổi các thông tin cá nhân đã đăng ký, người dùng đăng nhập hệ
                    thống và chọn chức năng quản lý cá nhân để thực hiện việc sửa đổi và cập nhật thông tin theo nhu cầu của mình.
                    Các tính năng và tiện ích tại trang cá nhân rất thân thiện và dễ dàng sử dụng.<br />
                </span>

                <div className="marginB24"></div>
                <span className="title-li font15 text-black">3. CÁC NỘI DUNG CẤM TRAO ĐỔI, CHIA SẺ TRÊN MẠNG XÃ HỘI</span>
                <div className="marginB8"></div>
            </div>
        </div>
    )
}