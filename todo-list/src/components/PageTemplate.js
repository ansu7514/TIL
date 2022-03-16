import styles from '../styles/PageTemplate.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const PageTemplate = ({children}) => {
    return (
        <div className={cx('page-template')}>
            <h1>일정 관리</h1>
            <div className={cx('content')}>
                {children}
            </div>
        </div>
    );
};

export { PageTemplate };