import './css/Top.css';
import './css/Reset.css';
import image from './img/Hello.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Top() {
    const url = 'http://localhost:5050';
    const movePage = useNavigate();
    const goToInput = () => {
        movePage('/input');
    }
    const goToBoard = () => {
        movePage('/board');
    }
    const goToMyPage = () => {
        movePage('/mypage');
    }

    const logout = () => {
        if(sessionStorage.getItem('USERID')) {
            const info = {
                id: sessionStorage.getItem('USERID'),
                nickname: sessionStorage.getItem('NICKNAME')
            }
            axios({
                method: 'post',
                header: { 'Content-Type': 'application/json; charset=UTF-8' },
                url: url + "/logout",
                data : info
            })
                .then(() => {
                    
                })
            alert('로그아웃을 완료했습니다.');
            sessionStorage.removeItem('USERID');
            sessionStorage.removeItem('NICKNAME');
            movePage('/');
        } else {
            movePage('/');
        }
    }

    return (

        <div className="container">
            <div className="col-md-12">
                <header id="header">
                    <div className="slider">
                        <div id="carousel-example-generic" className="carousel slide" data-ride="carousel" data-interval="500">
                            <div className="carousel-inner" role="listbox">
                                <div className="item active">
                                    <img src={image} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <nav className="navbar navbar-default">
                        <div className="navbar-header">

                            <a  className="navbar-brand" href='javascript:void(0)' ><img className="img-responsive" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="이미지 불러오기 실패" /></a>

                            <span className="site-name"><b>{sessionStorage.getItem('USERID') ? sessionStorage.getItem('NICKNAME') : 'GUEST'}</b></span>
                            <span className="site-description" onClick={logout}>{sessionStorage.getItem('USERID') ? '로그아웃' : '로그인' }</span>
                        </div>
                        <div className="collapse navbar-collapse" id="mainNav">
                            <ul className="nav main-menu navbar-nav">
                                <li><a className="cursor" onClick={goToBoard}><i className="fa fa-home"></i> 자유게시판</a></li>
                                {sessionStorage.getItem('USERID') && (
                                    <li><a className="cursor" onClick={goToInput}>글 작성하기</a></li>
                                )}
                                {sessionStorage.getItem('USERID') && (
                                    <li><a className="cursor" onClick={goToMyPage}>마이페이지</a></li>
                                )}
                            </ul>
                        </div>
                    </nav>
                </header>
                {/* <body>
                    <Input />
                </body> */}
            </div>
        </div>
    );
}

export default Top;