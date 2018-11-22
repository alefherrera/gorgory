import React from "react";

const GuideEditorLayout = () => {
  return (
    <RootFlexColumn>
      <TitleText text="Nueva Guia" />
      <Divider />
      <StyledForm onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <Field
          name="start"
          label="Fecha de Inicio"
          component={DatePickerWrapper}
        />
        <Field name="end" label="Fecha de Fin" component={DatePickerWrapper} />
        <Field name="name" label="Nombre" component={TextFieldWrapper} />
        <Field
          name="language"
          label="Lenguaje"
          component={SelectWrapper}
          validate={[required]}
        >
          <MenuItem value="JAVA">Java</MenuItem>
          <MenuItem value="PYTHON">Python</MenuItem>
        </Field>
        <Field
          name="course"
          label="Comisión"
          component={SelectWrapper}
          validate={[required]}
        >
          {this.props.courses.map(course => (
            <MenuItem key={course.id} value={course.id}>
              {`${course.signature && course.signature.name} - ${course.name}`}
            </MenuItem>
          ))}
        </Field>
        <NewExercisesTable
          label="Ejercicios"
          exercisesRows={this.props.created.exercises}
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
};

export default GuideEditorLayout;
