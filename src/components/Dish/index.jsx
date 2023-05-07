// import clsx from "clsx";
import { Box, IconButton } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import { UserInfo } from "../UserInfo";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { Link } from "react-router-dom";
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
  //   if (isLoading) {
  //     return <PostSkeleton />;
  //   }

  const onClickRemove = () => {};

  return (
    <Box>
      <Link to={`/dishes/${id}/edit`}>
        <IconButton color="primary">
          <EditIcon />
        </IconButton>
      </Link>
      <IconButton onClick={onClickRemove} color="secondary">
        <DeleteIcon />
      </IconButton>
      <img src={imageUrl} alt={title} />

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
  );
};
