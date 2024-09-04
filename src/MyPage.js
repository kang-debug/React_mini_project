import './css/Reset.css';
import './css/MyPage.css';
import Top from './Top.js';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function MyPage() {
    // const movePage = useNavigate();
    const url = 'http://localhost:5050';
    let [board, setBoard] = useState([]);
    let [countBoard, setCountBoard] = useState([]);
    var today = new Date();

    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);

    var dateString = year + '-' + month  + '-' + day;
    useEffect( ()=>{
        const member = {
            id : sessionStorage.getItem('USERID'),
            date : dateString
        }
        axios({
            method: 'post',
            header: { 'Content-Type': 'application/json; charset=UTF-8' },
            url: url + "/getUserBoard",
            data : member
        })
            .then(response => {
                setBoard(response.data.result);
            })
            .catch(() => {
                alert('데이터를 불러오는데 실패하였습니다. 나중에 다시 시도해주세요.');
            })
        axios({
            method: 'post',
            header: { 'Content-Type': 'application/json; charset=UTF-8' },
            url: url + "/userBoardCount",
            data : member
        })
            .then(response => {
                setCountBoard(response.data.result);
            })
            .catch(() => {
                alert('데이터를 불러오는데 실패하였습니다. 나중에 다시 시도해주세요.');
            })
    }, []);

    function userBoardCount() {
        const member = {
            id : sessionStorage.getItem('USERID'),
            date : dateString
        }
        axios({
            method: 'post',
            header: { 'Content-Type': 'application/json; charset=UTF-8' },
            url: url + "/userBoardCount",
            data : member
        })
            .then(response => {
                setCountBoard(response.data.result);
            })
            .catch(() => {
                alert('데이터를 불러오는데 실패하였습니다. 나중에 다시 시도해주세요.');
            })
    }

    function getBoard() {
        const member = {
            id : sessionStorage.getItem('USERID')
        }
        axios({
            method: 'post',
            header: { 'Content-Type': 'application/json; charset=UTF-8' },
            url: url + "/getUserBoard",
            data : member
        })
            .then(response => {
                setBoard(response.data.result);
            })
            .catch(() => {
                alert('데이터를 불러오는데 실패하였습니다. 나중에 다시 시도해주세요.');
            })
    };

    function boardDelete(idx) {
        const info = {idx: idx};
        axios({
            method: 'post',
            header: { 'Content-Type': 'application/json; charset=UTF-8' },
            url: url + "/deleteBoard",
            data : info
        })
            .then(response => {
                if(response.data.result == 200) {
                    alert(response.data.message);
                    getBoard();
                    userBoardCount();
                }
            })
            .catch(() => {
                // alert('데이터를 불러오는데 실패하였습니다. 나중에 다시 시도해주세요.');
            })
            
    }
    return (
        <>
            <Top/>
            <div className="card-container">
                <div className="card-wrap">
                    <div className="infos">
                        <div className="info">
                            <div>
                                <p className="name">
                                    내정보
                                </p>
                                <p className="function">
                                    아이디 : {sessionStorage.getItem('USERID')}
                                </p><p className="function">
                                    닉네임 : {sessionStorage.getItem('NICKNAME')}
                                </p>
                            </div>
                            <div className="stats">
                                <p className="flex flex-col">
                                    오늘 작성한 게시글 수
                                    <span className="state-value">
                                        {countBoard}
                                    </span>
                                    {/* 구현 예정 */}
                                </p>
                                <p className="flex">
                                    총 게시글 수
                                    <span className="state-value">
                                        {board.length}
                                    </span>
                                </p>

                            </div>
                        </div>
                    </div>
                    <button className="request" type="button">
                        정보 수정
                    </button>
                </div>
            </div>

            <div className="container post-container">

                <div id="products" className="row list-group">
                    { board != undefined ? board.map((info) => (
                    <div key={info.idx} className="item col-xs-4 col-lg-4">
                        <div className="thumbnail">
                            <div className="caption">
                                <h4 className="group inner list-group-item-heading">
                                    {info.title}</h4>
                                <p className="group inner list-group-item-text">
                                    {board.content}</p>
                                <p className="group inner list-group-item-text create-date-fontsize" >
                                    작성일 : {new Date(info.create_date).toLocaleString()}</p>
                                <div className="row">

                                    <div className="col-xs-12 col-md-6">
                                        <a className="btn btn-success" href={`/modify?no=${info.idx}`} >수정</a>
                                    </div>
                                    <div className="col-xs-12 col-md-6">
                                        <a className="btn btn-delete" onClick={() => boardDelete(info.idx)}>삭제</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    )) : ''}
                    
                </div>
            </div>
        </>
    );
}

export default MyPage;