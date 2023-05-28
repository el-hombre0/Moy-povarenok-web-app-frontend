import s from "./Dish.module.css";
import { Box, IconButton, Typography, makeStyles } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
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
    if (window.confirm("Вы уверены, что хотите удалить блюдо?")) {
      dispatch(fetchRemoveDish(id));
    }
  };

  return (
    <>
      {isEditable != false && (
        <>
          <Box>
            <Typography component={'span'}>
              <h2>
                {isFullDish ? (
                  title
                ) : (
                  <Link to={`/dishes/${id}`} className={s.dishCardLink}>
                    {title}
                  </Link>
                )}
              </h2>
              <Link to={`/dishes/${id}/edit`}>
                <IconButton color="primary">
                  <EditIcon />
                </IconButton>
              </Link>
              <IconButton onClick={onClickRemove} color="secondary">
                <DeleteIcon />
              </IconButton>
              {imageUrl && <img src={imageUrl} alt={title} />}
              <UserInfo {...user} additionalText={createdAt} />

              <AccessTimeOutlinedIcon />
              <span>{cookingtime} мин.</span>

              <h4>Ингредиенты:</h4>
              <ul>
                {ingredients?.map((name) => (
                  <li key={name}>
                    <Link
                      to={`/ingredients/${name}`}
                      className={s.dishCardLink}
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
              <h4>Тэги:</h4>
              <ul className="tagsList">
                {tags?.map((name) => (
                  <Link to={`/tag/${name}`} className={s.dishCardLink} key={name}>
                    #{name}
                  </Link>
                ))}
              </ul>
              <h3>
                {isFullDish ? (
                  <Typography component={'span'}>
                    <h3>Описание</h3>
                    {description}
                  </Typography>
                ) : (
                  <Link to={`/dishes/${id}`} className={s.dishCardLink}>
                    Подробное описание <ArrowForwardIcon/> 
                  </Link>
                )}
              </h3>
              {children && <div className="content">{children}</div>}
            </Typography>
          </Box>
          <hr/>
        </>
      )}
    </>
  );
};
