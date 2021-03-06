import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes, { object } from 'prop-types';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import GuideTable from '../../components/GuideTable';
import { guidesSelector } from '../../selectors/entities/guide';
import { getGuides, deleteGuide, editGuide } from '../../actions/guide';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const TitleRow = styled.div`
  justify-content: space-around;
  margin: 10px;
`;

const Row = styled.div`
  justify-content: space-around;
  margin: 10px;
  overflow-y: auto;
`;

class GuidesPage extends Component {
  componentDidMount() {
    this.props.getGuides();
  }

  handleDelete = (guide) => {
    this.props.deleteGuide(undefined, { id: guide.id });
  };

  handleEdit = (guide) => {
    this.props
      .editGuide(undefined, { id: guide.id })
      .then(() => this.props.history.push(`/guide/edit/${guide.id}`));
  };

  handleReport = (guide) => {
    this.props.history.push(`/guide/report/${guide.id}`);
  };

  renderIcons = guide => (
    <div>
      <IconButton onClick={() => this.handleDelete(guide)}>
        <Icon style={{ color: '#ff511b' }}>delete</Icon>
      </IconButton>
      <IconButton onClick={() => this.handleEdit(guide)}>
        <Icon style={{ color: '#FFA000' }}>edit</Icon>
      </IconButton>
      <IconButton onClick={() => this.handleReport(guide)}>
        <Icon style={{ color: '#1e88e5' }}>bar_chart</Icon>
      </IconButton>
    </div>
  );

  render() {
    const { guides } = this.props;
    return (
      <Container>
        <TitleRow>
          <Typography gutterBottom variant="h5" align="left" component="h2">
            Mis Guias
          </Typography>
        </TitleRow>
        <Row>
          <GuideTable guides={guides} iconsRenderer={this.renderIcons} />
        </Row>
      </Container>
    );
  }
}

GuidesPage.propTypes = {
  guides: PropTypes.arrayOf(object),
  getGuides: PropTypes.func,
  deleteGuide: PropTypes.func,
  editGuide: PropTypes.func,
  history: PropTypes.object,
};

export default connect(
  state => ({
    guides: guidesSelector(state),
  }),
  { getGuides, deleteGuide, editGuide },
)(GuidesPage);
