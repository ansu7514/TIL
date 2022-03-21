import styles from '../styles/TodoItem.css';
import classNames from 'classnames';

const cx = classNames.bind(styles);

// 비구조화 할당 레퍼런스
const TodoItem = ({ done, children, onToggle, onRemove }) => {
    return (
        <div className={cx('todo-item')} onClick={onToggle}>
            <input className={cx('tick')} type="checkbox" checked={done} readOnly />

            <div className={cx('text', { done })}>{children}</div>
            <div className={cx('delete')} onClick={(e) => {
                onRemove();
                e.stopPropagation();
            }}>[지우기]</div>
        </div>
    );
};

export { TodoItem };