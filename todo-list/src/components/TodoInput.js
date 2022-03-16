import styles from '../styles/TodoInput.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const TodoInput = ({ value, onChange, onInsert }) => {
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onInsert();
        }
    }

    return (
        <div className={cx('todo-input')}>
            <input onChange={onChange} value={value} onKeyPress={handleKeyPress} />
            <div className={cx('add-button')} onClick={onInsert}>추가</div>
        </div>
    );
};

export { TodoInput };