import React, {PropTypes} from 'react'
import Multistep from '../common/MultiStep'
import SavePage from './Save/SavePage'
import ProjectPage from './Project/ProjectPage'
import TeamPage from './Team/TeamPage'
import ContactPage from './Contact/ContactPage'
import PepitePage from './Pepite/PepitePage'
import SendPage from './Send/SendPage'
import CareerPage from './Career/CareerPage'
import ProfilePage from './Profile/ProfilePage'
import { Modal } from 'react-bootstrap'
import '../../styles/apply-form.css'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as errorsActions from '../../actions/errorsActions'


class ApplicationPage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isSaveShown: false
    }
    this.getSteps = this.getSteps.bind(this)
    this.closeSave = this.closeSave.bind(this)
    this.openSave = this.openSave.bind(this)

  }

  openSave(event) {
    event.preventDefault()
    if (this.props.actions.validateContact()) {
      this.setState({ isSaveShown: true })
    }
  }

  closeSave() {
    this.setState({ isSaveShown: false })
  }

  getSteps() {
    return (
      [
        { name: 'Mes Infos', component: <ContactPage /> },
        { name: 'Mon Équipe', component: <TeamPage /> },
        { name: 'Mon Projet', component: <ProjectPage /> },
        { name: 'Mon PEPITE', component: <PepitePage /> },
        { name: 'Mon Parcours', component: <CareerPage /> },
        { name: 'Mon Profil', component: <ProfilePage /> },
        { name: 'Envoi', component: <SendPage /> }
      ]
    )
  }

  render() {
    return (
      <div className="jumbotron">
        <Multistep steps={this.getSteps()} save={this.openSave} />
        <Modal show={this.state.isSaveShown} onHide={this.closeSave}>
          <Modal.Header>
            <Modal.Title>Sauvegarder mon formulaire</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SavePage />
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}


function mapStateToProps(state, ownProps) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(errorsActions, dispatch)
  }
}

ApplicationPage.propTypes = {
  actions: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationPage)
