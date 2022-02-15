import './Registration.scss';
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { CustomButton } from '../common/CustomButton';
import { resources } from '../../resources';
import { CustomField } from '../common/CustomField';
import { registration } from '../../store/Registration/RegistrationThunks';
import { useHistory } from 'react-router';

export function Registration() {
  const dispatch = useDispatch();
  const { error } = useSelector(state => state.registrationReducer);
  const history = useHistory()

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

  const [initialValues] = useState({ 
    username: "", 
    password: "",
    firstName: "",
    lastName: "",
    isActive: false
  })

  const onSubmit = async (data, {setSubmitting, resetForm}) => {
    try {
      dispatch(registration(data))
      history.push("/users")
    } finally {
      resetForm();
      setSubmitting(false);
    }
  }

  const onCancel = () => {
    history.push('/users');
  }

  return (
    <div className="registration">
      <div className="registration__title">{resources.registration}</div>
      { error ? <div className="registration__error"> {resources.errorRegistration}</div> : ""}
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
              <div className="container registration__buttons">
                <CustomButton 
                  text={resources.registrationSubmit} 
                  type="submit" 
                  disabled={isSubmitting}
                />
                <CustomButton text={resources.cancel}  onClick={onCancel} />
              </div>
            </Form>
        )}
      </Formik>
  </div>
  );
}