import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes, { object } from 'prop-types';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import GuideTable from '../../components/GuideTable';
import { guideSelector } from '../../selectors/entities/guide';
import { loadGuides } from '../../actions/guide';

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

class MyGuidesPage extends Component {
  componentDidMount() {
    this.props.loadGuides();
  }

  renderIcons = () => (
    <div>
      <IconButton>
        <Icon style={{ color: '#00897b' }}>play-circle-filled</Icon>
      </IconButton>
    </div>
  );

  render() {
    const { guides } = this.props;
    return (
      <Container>
        <TitleRow>
          <Typography gutterBottom variant="title" align="left" component="h2">
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

MyGuidesPage.propTypes = {
  guides: PropTypes.arrayOf(object),
  loadGuides: PropTypes.func,
};

export default connect(
  state => ({
    guides: guideSelector(state),
  }),
  { loadGuides },
)(MyGuidesPage);
