import styles from './PageTemplate.css';
import className from 'classnames/bind';

const cx = className.bind(styles);

const PageTemplate = ({children}) => {
    return (
        <div className={'page-template'}>
            <h1>일정 관리</h1>
            <div>
                {children}
            </div>
        </div>
    );
};

export { PageTemplate };