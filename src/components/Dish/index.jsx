import { Box, IconButton } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import { UserInfo } from "../UserInfo";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchRemoveDish } from "../../redux/slices/dishes";
export const Dish = ({
  id,
  title,
  createdAt,
  cookingtime,
  description,
  imageUrl,
  tags,
  children,
  ingredients,
  user,
  isFullDish,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch();
  //   if (isLoading) {
  //     return <PostSkeleton />;
  //   }

  /** Обработчик удаления блюда  */
  const onClickRemove = () => {
    dispatch(fetchRemoveDish(id));
    if (window.confirm("Вы уверены, что хотите удалить блюдо?")) {
    }
  };

  return (
    <div>
      {isEditable != false && (
        <div>
          <Box>
            <Link to={`/dishes/${id}/edit`}>
              <IconButton color="primary">
                <EditIcon />
              </IconButton>
            </Link>
            <IconButton onClick={onClickRemove} color="secondary">
              <DeleteIcon />
            </IconButton>
            {imageUrl && (<img src={imageUrl} alt={title} />)}

            <UserInfo {...user} additionalText={createdAt} />
            <div>
              <h2>
                {isFullDish ? title : <Link to={`/dishes/${id}`}>{title}</Link>}
              </h2>
              <AccessTimeOutlinedIcon />
              <span>{cookingtime} мин.</span>
              <h3>
                {isFullDish ? (
                  description
                ) : (
                  <Link to={`/dishes/${id}`}>Подробное описание</Link>
                )}
              </h3>
              <ul>
                {ingredients?.map((name) => (
                  <li key={name}>
                    <Link to={`/ingredients/${name}`}>{name}</Link>
                  </li>
                ))}
              </ul>
              <ul>
                {tags?.map((name) => (
                  <li key={name}>
                    <Link to={`/tag/${name}`}>#{name}</Link>
                  </li>
                ))}
              </ul>
              {children && <div className="content">{children}</div>}
            </div>
          </Box>
        </div>
       )}  
    </div>
  );
};
