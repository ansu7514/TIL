import ColorConsumer from "../contexts/color";

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

const SelectColor = () => {
    return (
        <div>
            <h2>색상을 선택하세요.</h2>
            <ColorConsumer>
                {({ actions }) => (
                    <div style={{ display: 'flex '}}>
                        {colors.map(color => (
                            <div
                                key={color}
                                style={{
                                    background: color,
                                    width: '24px',
                                    height: '24px',
                                    cursor: 'pointer',
                                }}
                                onClick={() => actions.setColor(color)}
                                onContextMenu={(e) => {
                                    // 마우스 오른쪽 클릭시 메뉴가 뜨는 것을 무시함
                                    e.preventDefault();
                                    actions.setSubColor(color);
                                }}
                            />
                        ))}
                    </div>
                )}
            </ColorConsumer>
            <hr />
        </div>
    );
};

export default SelectColor;