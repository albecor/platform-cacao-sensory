import { FormControl } from 'native-base';
import { bool, func, number, oneOfType, shape, string } from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';
import { isEmail, isStrongPws } from '../../../utils';
import Input from '../../atoms/Input';

const propTypes = {
  callback: func,
  defaultValue: oneOfType([number, string]),
  control: shape({}).isRequired,
  error: shape({}),
  mt: number,
  name: string,
  rules: shape({})
};
const defaultProps = {
  mt: 8
};

const InputContainer = ({
  callback,
  defaultValue,
  control,
  label,
  hasError,
  hasHint,
  hint,
  inputError,
  inputProps,
  mt,
  rules,
  name
}) => (
  <FormControl mt={mt} isInvalid={hasError}>
    <Input.Label>
      {label}
    </Input.Label>
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Input.TextInput
          {...inputProps}
          error={!!error}
          onChangeText={(input) => {
            onChange(input);
            if (callback) callback();
          }}
          value={value}
        />
      )}
    />
    {hasError && (
      <Input.HintError>
        {inputError}
      </Input.HintError>
    )}
    {hasHint && (
      <Input.Hint>
        {hint}
      </Input.Hint>
    )}
  </FormControl>
);
InputContainer.defaultProps = {
  ...defaultProps,
  hasError: false
};
InputContainer.propTypes = {
  ...propTypes,
  hasError: bool,
  inputProps: shape({}),
  inputError: oneOfType([bool, string])
};

InputContainer.Email = ({ callback, defaultValue, control, error, mt, name, rules }) => (
  <FormControl mt={mt} isInvalid={!!error}>
    <Input.Label>
      Correo
    </Input.Label>
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <Input.Email
          autoCapitalize='none'
          error={!!error}
          onChangeText={(input) => {
            onChange(input);
            if (callback) callback();
          }}
          value={value}
        />
      )}
    />
    {!!error && (
      <Input.HintError>
        {
          (error.type === 'required' && 'Correo es requerido') ||
          (error.type === 'validate' && 'Correo no válido')
        }
      </Input.HintError>
    )}
  </FormControl>
);
InputContainer.Email.defaultProps = {
  ...defaultProps,
  name: 'email',
  rules: { required: true, validate: isEmail }
};
InputContainer.Email.propTypes = propTypes;

InputContainer.Password = ({ callback, defaultValue, control, error, label, mt, rules, name }) => (
  <FormControl mt={mt} isInvalid={!!error}>
    <Input.Label>
      {label}
    </Input.Label>
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <Input.Password
          autoCapitalize='none'
          error={!!error}
          onChangeText={(input) => {
            onChange(input);
            if (callback) callback();
          }}
          value={value}
        />
      )}
    />
    {!!error && (
      <Input.HintError>
        {
          (error.type === 'required' &&
            'Contraseña es requerida') ||
          (error.type === 'validate' && 'Contraseña no válida')
        }
      </Input.HintError>
    )}
  </FormControl>
);
InputContainer.Password.defaultProps = {
  ...defaultProps,
  name: 'password',
  label: 'Contraseña',
  rules: { required: true, validate: isStrongPws }
};
InputContainer.Password.propTypes = {
  ...propTypes,
  label: string
};

InputContainer.Area = ({
  callback,
  defaultValue,
  control,
  label,
  hasError,
  hasHint,
  hint,
  inputError,
  inputProps,
  mt,
  rules,
  name
}) => (
  <FormControl mt={mt} isInvalid={hasError}>
    <Input.Label>
      {label}
    </Input.Label>
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Input.Area
          {...inputProps}
          error={!!error}
          onChangeText={(input) => {
            onChange(input);
            if (callback) callback();
          }}
          value={value}
        />
      )}
    />
    {hasError && (
      <Input.HintError>
        {inputError}
      </Input.HintError>
    )}
    {hasHint && (
      <Input.Hint>
        {hint}
      </Input.Hint>
    )}
  </FormControl>
);
InputContainer.Area.defaultProps = {
  ...defaultProps,
  hasError: false
};
InputContainer.Area.propTypes = {
  ...propTypes,
  hasError: bool,
  inputProps: shape({}),
  inputError: oneOfType([bool, string])
};

export default InputContainer;
