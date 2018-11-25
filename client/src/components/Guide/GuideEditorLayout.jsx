import React from 'react';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import { Field } from 'redux-form';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import MenuItem from '@material-ui/core/MenuItem';
import TextFieldWrapper from '../TextFieldWrapper';
import DatePickerWrapper from '../DatePickerWrapper';
import { RootFlexColumn, TitleText, StyledForm } from '../Generic';
import { NewExercisesTable } from '.';
import SelectWrapper from '../SelectWrapper';
import { required } from '../../util/validations';

const GuideEditorLayout = ({
  handleSubmit, exercisesButtonsProvider, title, courses, guide,
}) => (
  <RootFlexColumn>
    <TitleText text={title} />
    <Divider />
    <StyledForm onSubmit={handleSubmit}>
      <Field name="start" label="Fecha de Inicio" component={DatePickerWrapper} />
      <Field name="end" label="Fecha de Fin" component={DatePickerWrapper} />
      <Field name="name" label="Nombre" component={TextFieldWrapper} />
      <Field name="language" label="Lenguaje" component={SelectWrapper} validate={[required]}>
        <MenuItem value="JAVA">Java</MenuItem>
        <MenuItem value="PYTHON">Python</MenuItem>
      </Field>
      <Field name="course" label="Comisión" component={SelectWrapper} validate={[required]}>
        {courses.map(course => (
          <MenuItem key={course.id} value={course.id}>
            {`${course.signature && course.signature.name} - ${course.name}`}
          </MenuItem>
        ))}
      </Field>
      <NewExercisesTable
        buttonsProvider={exercisesButtonsProvider}
        label="Ejercicios"
        exercisesRows={guide.exercises}
      >
        <Button
          component={Link}
          to="/guide/add/exercise"
          variant="fab"
          color="primary"
          aria-label="Add"
        >
          <AddIcon />
        </Button>
      </NewExercisesTable>
    </StyledForm>
  </RootFlexColumn>
);

export default GuideEditorLayout;
