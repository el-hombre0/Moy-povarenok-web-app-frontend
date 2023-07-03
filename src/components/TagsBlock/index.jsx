import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { SideBlock } from "../SideBlock";
import { List, ListItem, ListItemButton } from "@mui/material";
import { ListItemIcon, ListItemText } from "@material-ui/core";
import TagIcon from "@mui/icons-material/Tag";
import { Link } from "react-router-dom";
import s from "./Tags.module.css";

export const TagsBlock = ({ items, isLoading = true }) => {
  return (
    <SideBlock title="Тэги">
      <List>
        {(isLoading ? [...Array(5)] : items).map((name, i) => (
          <Link to={`/tags/${name}`} className={s.tagsCardLink} key={i}>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <ListItemText primary={name} />
                )}
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </SideBlock>
  );
};
