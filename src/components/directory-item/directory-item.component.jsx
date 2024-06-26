import './directory-item.styles.jsx';
import { useNavigate } from 'react-router-dom';
import { BackgroundImage, DirectoryItemContainer, Body } from './directory-item.styles.jsx';

const DirectoryItem = ({ category }) => {
    const { title, route, imageUrl } = category;
    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(route);
    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
            <BackgroundImage imageUrl={imageUrl} />
            <Body>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    );
};

export default DirectoryItem;
