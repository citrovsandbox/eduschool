import React from 'react';
import WelcomeDashboard from '../components/WelcomeDashboard';
import ListDashboard from '../components/ListDashboard';
import { connect } from 'react-redux';

class HomeView extends React.Component {

  render() {
    const aTests = this.props.userData.tests || [];
    console.log(aTests);
    if(aTests === null || aTests.length < 1) {
      return (
        <WelcomeDashboard/>
      );
    } else {
      return (
        <ListDashboard/>
      );
    }
  }
}
export default connect (state => state) (HomeView);