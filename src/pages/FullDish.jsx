import { Dish } from "../components";
import { useParams } from "react-router-dom";
import React from "react";
import axios from "../axios";

export const FullDish = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);

  const { id } = useParams();

  /** Запрос во время рендера, результат которого сохраняется в state */
  React.useEffect(() => {
    axios
      .get(`/dishes/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении блюда!");
      });
  }, []);

  if (isLoading) {
    return <Dish isLoading={isLoading} isFullDish />;
  }

  return (
    <>
      <Dish
        id={data._id}
        title={data.title}
        cookingtime={data.cookingtime}
        imageUrl={data.imageUrl}
        ingredients={data.ingredients}
        user={data.user}
        createdAt={data.createdAt}
        tags={data.tags}
        isFullDish
      >
        <p>{data.description}</p>
      </Dish>
    </>
  );
};
