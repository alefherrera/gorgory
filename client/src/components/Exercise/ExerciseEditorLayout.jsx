import React from 'react';
import { Divider } from '@material-ui/core';
import { Field } from 'redux-form';
import { RootFlexColumn, TitleText, StyledForm } from '../Generic';
import TextFieldWrapper from '../TextFieldWrapper';
import AreaTextWrapper from '../AreaTextWrapper';
import { NewTestTable } from '../Guide';

const ExerciseEditorLayout = ({
  title,
  handleSubmit,
  testRows,
  onButtonClick,
  children,
  testButtonsProvider,
}) => (
  <RootFlexColumn>
    {children}
    <TitleText text={title} />
    <Divider />
    <StyledForm onSubmit={handleSubmit}>
      <Field name="name" label="Nombre" component={TextFieldWrapper} />
      <Field rows="8" name="description" label="Enunciado" component={AreaTextWrapper} />
      <NewTestTable
        label="Tests"
        onClick={onButtonClick}
        testRows={testRows}
        buttonsProvider={testButtonsProvider}
      />
    </StyledForm>
  </RootFlexColumn>
);

export default ExerciseEditorLayout;
