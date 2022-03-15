import React, { Component } from 'react';

// 함수형으로 해결하는 방법을 찾지 못함
// 일단 class 형으로 실습
class ScrollBox extends Component {
    scrollToBottom = () => {
        /*
            비구조화 할당 문법 사용
            const scrollHeight = this.box.scrollHeight;
            const clientHeight = this.box.clientHeight;
        */
        const { scrollHeight, clientHeight } = this.box;
        this.box.scrollTop = scrollHeight - clientHeight;
    }

    render() {
        const style = {
            border: '1px solid black',
            height: '300px',
            width: '300px',
            overflow: 'auto',
            position: 'relative'
        };

        const innerStyle = {
            width: '100%',
            height: '650px',
            background: 'linear-gradient(white, black)'
        }

        return (
            <div
                style={style}
                ref={(ref) => {this.box=ref}}
            >
                <div style={innerStyle} />
            </div>
        )
    };
}

export { ScrollBox };