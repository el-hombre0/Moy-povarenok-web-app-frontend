import { Tabs, Tab, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { TagsBlock } from "../components/TagsBlock";
import { Dish } from "../components/Dish";
import { fetchDishes, fetchTags } from "../redux/slices/dishes";

function Home() {
  const dispatch = useDispatch();
  const { dishes, tags, ingredients } = useSelector((state) => state.dishes);

  /** Флаг, что блюда загружаются */
  const isDishesLoading = dishes.status === "loading";
  const isTagsLoading = tags.status === "loading";

  /** Отправка action через dispatch, при первом render нужно сделать запрос на backend*/
  React.useEffect(() => {
    dispatch(fetchDishes());
    dispatch(fetchTags());
  }, []);

  return (
    <>
      <Tabs>
        <Tab label="Новые" />
      </Tabs>

      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isDishesLoading ? [...Array(5)] : dishes.items).map((obj, index) =>
            isDishesLoading ? (
              <Dish key={index} isLoading={true} />
            ) : (
              <Dish
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl}
                user={obj.user}
                createdAt={obj.createdAt}
                cookingtime={obj.cookingtime}
                description={obj.description}
                tags={obj.tags}
                ingredients={obj.ingredients}
                isLoading={true}
                isEditable
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
