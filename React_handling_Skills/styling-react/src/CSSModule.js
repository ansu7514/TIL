import sytles from './CSSModule.module.css';

const CSSModule = () => {
    return (
        <div className={`${sytles.wrapper} ${sytles.inverted}`}>
            안녕하세요, 저는 <span className='something'>CSS Module!</span>
        </div>
    );
};

export default CSSModule;