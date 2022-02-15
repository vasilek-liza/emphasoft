import './EditUser.scss';
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { CustomButton } from '../common/CustomButton';
import { resources } from '../../resources';
import { CustomField } from '../common/CustomField';
import { resetUser } from '../../store/Users/UsersSlice';
import { getUser, updateUser } from '../../store/Users/UsersThunks';
import { useHistory, useParams } from 'react-router';
import { DeleteUser } from '../DeleteUser/DeleteUser';

export function EditUser() {
  const dispatch = useDispatch();
  const [isDailog, setDialog] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  const { error, user } = useSelector(state => state.usersReducer);
  const { account } = useSelector(state => state.authReducer);

  const validationSchema = yup.object({
    username: yup.string()
      .matches(/^[\w.@+-]+$/, "Логин содержит недопустимые символы")
      .min(1, 'Минимальная длина 1 символ')
      .max(150, "Максимальная длина логина")
      .required('Введите логин пользователя'),
    firstName: yup.string()
      .max(30, "Максимальная длина 30"),
    lastName: yup.string()
      .max(150, "Максимальная длина 150"),
    password: yup.string()
      .min(1, 'Минимальная длина 1 символ')
      .max(128, 'Максимальная длина 128 символа')
      .matches(/^(?=.*[A-Z])(?=.*\d).{8,}$/, "Условия безопасности пароля не выполнены")
      .required('Введите пароль'),
    isActive: yup.boolean()
  });

  useEffect(() => {
    dispatch(getUser(id));
    return () => {
      dispatch(resetUser())
    }
  }, []);

  const initialValues = {
    username: user.username, 
    password: user.password,
    firstName: user.first_name,
    lastName: user.last_name,
    isActive: user.is_active
  };

  const onSubmit = async (data) => {
    try {
      await dispatch(updateUser({ id, data }));
    } finally {
      history.push("/users");
    }
  } 

  const openPopUp = () => {
    setDialog(true)
  }

  const onCancel =  () => {
    history.push('/users');
  }

  if (!user.id) {
    return "Загрузка";
  }

  return (
    <div className="edit-user">
      <div className="edit-user__title">{ resources.profile + " " + user.username }</div>
      { error ? <div className="edit-user__error"> {resources.errorRegistration}</div> : ""}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        setSubmitting={false}
        onSubmit={onSubmit}
      >
        {({errors, touched, isSubmitting}) => (
            <Form>
              <CustomField 
                name={"username"} 
                type={"input"}
                errors={errors}
                touched={touched}
                placeholder={resources.username}
              />
              <CustomField 
                name={"firstName"} 
                type={"input"}
                errors={errors}
                touched={touched}
                placeholder={resources.first_name}
              />
              <CustomField 
                name={"lastName"} 
                type={"input"}
                errors={errors}
                touched={touched}
                placeholder={resources.last_name}
              />
              <CustomField 
                name={"password"} 
                type={"password"}
                errors={errors}
                touched={touched}
                placeholder={resources.password}
              />
              <div className="container">
                {resources.isActive}
                <CustomField 
                  name={"isActive"} 
                  type={"checkbox"}
                  errors={errors}
                  touched={touched}
                />
              </div>
              <div className="edit-user__buttons">
              <CustomButton 
                text={resources.edit} 
                type="submit" 
                disabled={isSubmitting}
              />
            </div>
            </Form>
        )}
      </Formik>
      <div className="edit-user__buttons">
        {account.is_superuser && <CustomButton text={resources.remove} type="input"onClick={openPopUp} />}
        <CustomButton text={resources.cancel} onClick={onCancel} />
      </div>
      { isDailog ? <DeleteUser id={id} setOpen={setDialog} /> : ""}
  </div>
  );
}