const EventPractice = () => {
    return (
        <div>
            <h1>이벤트 연습</h1>
            <input
                type="text"
                name="message"
                placeholder="아무거나 입력해보세요"
                onChange={(e) => {
                        console.log(e);

                        /*
                            콘솔에 객체 출력
                            SyntheticBaseEvent {_reactName: 'onChange', _targetInst: null, type: 'change', nativeEvent: InputEvent, target: input, …}
                            bubbles: true
                            cancelable: false
                            currentTarget: null
                            defaultPrevented: false
                            eventPhase: 3
                            isDefaultPrevented: ƒ functionThatReturnsFalse()
                            isPropagationStopped: ƒ functionThatReturnsFalse()
                            isTrusted: true
                            nativeEvent: InputEvent {isTrusted: true, data: '2', isComposing: false, inputType: 'insertText', dataTransfer: null, …}
                            target: input
                            timeStamp: 1067.7999999523163
                            type: "change"
                            _reactName: "onChange"
                            _targetInst: null
                            [[Prototype]]: Object
                        */
                    }
                }
            ></input>
        </div>
    )
}

export default EventPractice;