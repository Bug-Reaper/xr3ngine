import React, { useState } from "react";
import Router from "next/router";

import AddCircleIcon from '@material-ui/icons/AddCircle';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';

// @ts-ignore
import styles from './Footer.module.scss';
import Avatar from "@material-ui/core/Avatar";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { useEffect } from "react";
import { selectCreatorsState } from "../../reducers/creator/selector";
import { getLoggedCreator } from "../../reducers/creator/service";
import { selectAuthState } from "../../../user/reducers/auth/selector";
import { PopupLogin } from "../PopupLogin/PopupLogin";
import IndexPage from "@xr3ngine/social/pages/login";

const mapStateToProps = (state: any): any => {
  return {
    creatorState: selectCreatorsState(state),
    authState: selectAuthState(state), 
  };
};

const mapDispatchToProps = (dispatch: Dispatch): any => ({
  getLoggedCreator: bindActionCreators(getLoggedCreator, dispatch),
});

const AppFooter = ({creatorState, getLoggedCreator,authState}: any) => {
  useEffect(()=>getLoggedCreator(),[]);  

  const [buttonPopup , setButtonPopup] = useState(false);
  const creator = creatorState && creatorState.get('fetching') === false && creatorState.get('currentCreator'); 
  const checkGuest = authState.get('authUser')?.identityProvider?.type === 'guest' ? true : false;
  return (
    <nav className={styles.footerContainer}>
        <HomeIcon onClick={()=> {checkGuest ? setButtonPopup(true) : Router.push('/');}} fontSize="large" className={styles.footerItem}/>
        <PopupLogin trigger={buttonPopup} setTrigger={setButtonPopup}>
          <IndexPage />
        </PopupLogin>
        <AddCircleIcon onClick={()=> {checkGuest ? setButtonPopup(true) : Router.push('/newfeed');}} style={{fontSize: '5em'}} className={styles.footerItem}/>
        {creator && <WhatshotIcon htmlColor="#FF6201" onClick={()=>{checkGuest ? setButtonPopup(true) : Router.push({ pathname: '/notifications'});}} /> }
        {creator && ( 
          <Avatar onClick={()=> {checkGuest ? setButtonPopup(true) : Router.push({ pathname: '/creator', query:{ creatorId: creator.id}});}} 
          alt={creator.username} src={creator.avatar} />
        )}
    </nav>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AppFooter);

