import React from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import "easymde/dist/easymde.min.css";
import axios from "../../axios";
import { Link } from "react-router-dom";
import { hostname } from "../../hostname";

export const AddDish = () => {
  /** Если в запросе есть id */
  const { id } = useParams();
  /** Переадресация на статью после её отправки */
  const navigate = useNavigate();

  const isAuth = useSelector(selectIsAuth);

  /** Хуки для работы с полями формы ввода */
  const [description, setDescription] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [cookingtime, setCookingTime] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [ingredients, setIngredients] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");

  const [isLoading, setIsLoading] = React.useState("false");

  const isEditing = Boolean(id);

  /** Ссылка на настоящую кнопку загрузки файла */
  const inputFileRef = React.useRef(null);

  /** Обработчик поля для вставки файла */
  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);

      const { data } = await axios.post("/uploads", formData);
      /** Получение ссылки на изображение и сохранение её в state */
      setImageUrl(data.url);
    } catch (error) {
      console.warn(error);
      alert("Ошибка при загрузке файла!");
    }
  };

  /** Удаление изображения */
  const onClickRemoveImage = () => {
    setImageUrl("");
  };

  /** Получение данных из поля ввода simplemde */
  const onChange = React.useCallback((value) => {
    setDescription(value);
  }, []);

  /** Получение данных для вставки их в форму при редактировании блюда */
  React.useEffect(() => {
    if (id) {
      axios
        .get(`/dishes/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setCookingTime(data.cookingtime);
          setDescription(data.description);
          setImageUrl(data.imageUrl);
          setTags(data.tags.join(","));
          setIngredients(data.ingredients.join(","));
        })
        .catch((error) => {
          console.warn(error);
          alert("Ошибка при загрузке данных блюда!");
        });
    }
  }, []);

  /** Настройки редактора */
  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Описание",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  /** Обработчик подтверждения формы для добавления нового блюда */
  const onSubmit = async () => {
    try {
      setIsLoading(true);
      /** Отправка данных формы на backend */
      const dataFields = {
        title,
        cookingtime,
        description,
        imageUrl,
        ingredients: ingredients.split(","),
        tags: tags.split(","),
      };

      /** В зависимости от флага isEditing выбирается изменение или создание */
      const { data } = isEditing
        ? await axios.patch(`/dishes/${id}`, dataFields)
        : await axios.post("/dishes", dataFields);

      /** Редактирование: перенаправление user на страницу изменяемого блюда
       * Создание: получения id из новой записи и перенаправление на новую страницу блюда
       */
      const _id = isEditing ? id : data._id;

      navigate(`/dishes/${_id}`);
    } catch (error) {
      console.warn(error);
      alert("Ошибка при создании блюда!");
    }
  };

  /** Дополнительная проверка на наличие токена
   * @detail Нужна, т.к. при отрисовке страницы пользователь не авторизован.
   */
  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <form>
        <Button
          onClick={() => inputFileRef.current.click()}
          variant="outlined"
          size="large"
        >
          Загрузить изображение
        </Button>
        <input
          type="file"
          ref={inputFileRef}
          onChange={handleChangeFile}
          hidden
        />
        {imageUrl && (
          <>
            <Button
              variant="contained"
              color="error"
              onClick={onClickRemoveImage}
            >
              Удалить
            </Button>
            <img src={`http://${hostname}:8080${imageUrl}`} alt="Uploaded" />
          </>
        )}

        <br />
        <br />
        <TextField
          variant="standard"
          placeholder="Заголовок"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          variant="standard"
          placeholder="Время приготовления"
          fullWidth
          value={cookingtime}
          onChange={(e) => setCookingTime(e.target.value)}
        />

        <TextField
          variant="standard"
          placeholder="Тэги"
          fullWidth
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <TextField
          variant="standard"
          placeholder="Ингредиенты"
          fullWidth
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />

        <SimpleMDE value={description} onChange={onChange} options={options} />
        <div>
          <Button onClick={onSubmit} size="large" variant="contained">
            {isEditing ? "Сохранить" : "Опубликовать"}
          </Button>
          <Link to="/">
            <Button size="large">Отмена</Button>
          </Link>
        </div>
      </form>
    </Paper>
  );
};
