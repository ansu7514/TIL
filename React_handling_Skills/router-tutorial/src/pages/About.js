import { useLocation } from "react-router-dom";

const About = () => {
    const location = useLocation();
    
    return (
        <div>
            <h1>소개</h1>
            <p>리액트 라우터를 사용해 보는 프로젝트입니다.</p>
            <p>쿼리스트링 : {location.search}</p>
        </div>
    );
};

export default About;