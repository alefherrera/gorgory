import React, { Component } from "react";
import { connect } from "react-redux";
import Divider from "@material-ui/core/Divider";
import { Field, reduxForm } from "redux-form";
import TextFieldWrapper from "../../components/TextFieldWrapper";
import AreaTextWrapper from "../../components/AreaTextWrapper";
import {
  RootFlexColumn,
  TitleText,
  StyledForm
} from "../../components/Generic";
import { NewTestTable } from "../../components/Guide";
import AddTestDialog from "./AddTestDialog";

class AddExercisePage extends Component {
  state = {};

  render() {
    return (
      <RootFlexColumn>
        <AddTestDialog />
        <TitleText text="Nuevo Ejercicio" />
        <Divider />
        <StyledForm>
          <Field name="name" label="Nombre" component={TextFieldWrapper} />
          <Field
            rows="10"
            maxRows="5"
            name="description"
            label="Enunciado"
            component={AreaTextWrapper}
          />
          <NewTestTable
            label="Tests"
            testRows={[
              { number: 1, name: "Tests Megadificil" },
              { number: 2, name: "P=NP?" }
            ]}
          />
        </StyledForm>
      </RootFlexColumn>
    );
  }
}

export default connect(
  null,
  {}
)(reduxForm({ form: "addExercise" })(AddExercisePage));
