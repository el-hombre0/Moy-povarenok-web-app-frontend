import {Tabs, Tab, Grid} from "@material-ui/core"
import React, { useEffect } from "react";
import axios from "../axios";

import { TagsBlock } from '../components/TagsBlock';
import { Dish } from '../components/Dish';

function Home(){
    React.useEffect(() => {
        axios.get('/dishes')
    }, []);

    return <>
    <Tabs>
        <Tab label="Новые"/>
    </Tabs>

    <Grid container spacing={4}>
        <Grid xs={8} item>
        {[...Array(5)].map(() => (
            <Dish
              id={1}
              title=""
              imageUrl=""
              user={{
                avatarUrl:
                  '',
                fullName: '',
              }}
              createdAt={'01 января 2023'}
              tags={['potato', 'spagetti', 'milk']}
              isLoading={true}
              isEditable
            />
          ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={['react', 'typescript', 'заметки']} isLoading={false} />
        </Grid>
    </Grid>
    </>
};

export default Home;