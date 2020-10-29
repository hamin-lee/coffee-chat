import React, { Component } from 'react';
import Sidebar from '../components/Sidebar';
import OrganizationCard from '../components/OrganizationCard';

class AdminHomePage extends Component {
     render() {
          return (
               <div className="pageContainer">
                    <Sidebar isAdmin="true"></Sidebar>
                    <div id="homeHeader"> 
                         <h1>Your Organizations</h1>
                         <OrganizationCard></OrganizationCard>
                    </div>
               </div>
          );
     }
}

export default AdminHomePage;