import Responsive from "../components/common/Responsive";
import EditorContainer from "../components/write/EditorContainer";
import TagBoxContainer from "../components/write/TagBoxContainer";
import WriteActionButtonsContainer from "../components/write/WrtieActionButtonsContainer";

const WritePage = () => {
    return (
        <Responsive>
            <EditorContainer />
            <TagBoxContainer />
            <WriteActionButtonsContainer />
        </Responsive>
    )
};

export default WritePage;