import React, { useState } from "react";
import CustomModal from "@components/modal";

import { Cards, Footer, Header, Main } from "@components";

const Lessons: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
    <div className="container" style={{backgroundColor: '#eee'}}>
        <div className="row">
            <div className="col-md-8">
                <h1>
                    Bootstrap Tabs!</h1>
                <ul className="nav nav-tabs" id="myTab">
                    <li className="active"><a href="#home" data-toggle="tab">Home</a></li>
                    <li><a href="#profile" data-toggle="tab">Profile</a></li>
                    <li><a href="#messages" data-toggle="tab">Messages</a></li>
                    <li><a href="#settings" data-toggle="tab">Settings</a></li>
                </ul>
                <div className="tab-content">
                    <div className="tab-pane active" id="home">
                        ...</div>
                    <div className="tab-pane" id="profile">
                        ...</div>
                    <div className="tab-pane" id="messages">
                        ...</div>
                    <div className="tab-pane" id="settings">
                        ...</div>
                </div>
            </div>
        </div>
    </div>
    </div>
  );
};

export default Lessons;
