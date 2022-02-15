import './Autification.scss';
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../../store/Auth/AuthThunks';
import { useState } from 'react';
import { CustomButton } from '../common/CustomButton';
import { resources } from '../../resources';
import { CustomField } from '../common/CustomField';

export function Autification() {
  const dispatch = useDispatch();
  const { error } = useSelector(state => state.authReducer);

  const validationSchema = yup.object({
    username: yup.string()
      .min(1, 'Минимальная длина 1 символ')
      .max(150, 'Максимальная длина 150 символа')
      .matches(/^[\w.@+-]+$/, "Логин содержит недопустимые символы")
      .required('Введите имя пользователя'),
    password: yup.string()
      .min(1, 'Минимальная длина 1 символ')
      .matches(/^(?=.*[A-Z])(?=.*\d).{8,}$/, "Условия безопасности пароля не выполнены")
      .max(128, 'Максимальная длина 128 символа')
      .required('Введите пароль')
  });

  const [initialValues] = useState({ username: "", password: "" })

  const onSubmit = async (data, {setSubmitting, resetForm}) => {
    try {
      await dispatch(getToken(data));
    } finally {
      resetForm();
      setSubmitting(false);
    }
  }

  return (
    <div className="autification">
      <div className="autification__title">{resources.authorization}</div>
      { error ? <div className="autification__error"> {resources.errorLogin}</div> : ""}
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
                type={"username"}
                errors={errors}
                touched={touched}
                placeholder={resources.username}
              />
              <CustomField 
                name={"password"} 
                type={"password"}
                errors={errors}
                touched={touched}
                placeholder={resources.password}
              />
              <CustomButton 
                text={resources.login} 
                type="submit" 
                disabled={isSubmitting}
              />
            </Form>
        )}
      </Formik>
  </div>
  );
}