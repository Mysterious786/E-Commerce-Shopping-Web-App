import { useNavigate } from "react-router-dom";
import { BackgroundImage,Body,DirectoryItemContainer } from "./directory-item.styles";
const DirectoryItem=({category})=>{
    const {imageUrl,title,route}=category;//destructuring      .....
    const navigate = useNavigate();
    
    const onNavigateHandler = () => navigate(route)
    return(

   
    <DirectoryItemContainer onClick={onNavigateHandler}>
    <BackgroundImage 
    imageUrl={imageUrl}
    style={{
      backgroundImage:`url(${imageUrl})`// custom style in to specific element destructuring here.......
     }}  />    
    
    
    <Body>
       
      <h2>{title}</h2>
      <p>Shop Now</p>
    </Body>
      </DirectoryItemContainer>
)

}


export default DirectoryItem;