import React, { Component } from 'react';
import '../organization.css';

class OrganizationCard extends Component {
     state = {
          organizations: ['Amazon', 'Intel', 'CSC309', 'KDMFKSD', 'SSDFPSDP'],

     }

     render() {
          const organizationCards = this.state.organizations.map((organization) => {
               return (
                   <div className="organizationCard">
                        <div className="organizationContainer">
                            <div>
                                <h2><b>{organization}</b></h2>
                            </div>
                            <div>
                                <button className="exploreButton"> Explore </button>
                            </div>
                        </div>
                   </div>
               )
          })
          return (
              <div className="organizationCards">
                   {organizationCards}
              </div>
          );
     }
}

export default OrganizationCard;