/**
 *Compoment to render existing project on the basis of projectId.
 *@Param :- projectId
 */

import dynamic from "next/dynamic";
import React, { lazy, Suspense, useEffect, useState } from "react";
import NoSSR from "react-no-ssr";


// importing component EditorContainer.
const EditorContainer = dynamic(() => import("@xr3ngine/client-core/src/world/components/editor/EditorContainer"), { ssr: false });

import { connect } from 'react-redux';
import {selectAuthState} from "@xr3ngine/client-core/src/user/reducers/auth/selector";
import {bindActionCreators, Dispatch} from "redux";
import {doLoginAuto} from "@xr3ngine/client-core/src/user/reducers/auth/service";
import { initializeEngine } from "@xr3ngine/engine/src/initialize";
import { DefaultGameMode } from "@xr3ngine/engine/src/templates/game/DefaultGameMode";
import { Engine } from "@xr3ngine/engine/src/ecs/classes/Engine";

/**
 * Declairing Props interface having two props.
 *@authState can be of any type.
 *@doLoginAuto can be of type doLoginAuto component.
 *
 */
interface Props {
    authState?: any;
    doLoginAuto?: typeof doLoginAuto;
}

/**
 *Function component providing authState on the basis of state.
 */

const mapStateToProps = (state: any): any => {
    return {
        authState: selectAuthState(state),
    };
};

/**
 *Function component providing doAutoLogin on the basis of dispatch.  
 */
const mapDispatchToProps = (dispatch: Dispatch): any => ({
    doLoginAuto: bindActionCreators(doLoginAuto, dispatch)
});

/**
 * Function component providing project editor view. 
 */
const Project = (props: Props) => {

	// initialising consts using props interface.
    const {
        authState,
        doLoginAuto
    } = props;

    // initialising authUser. 
    const authUser = authState.get('authUser');
    // initialising authState.
    const user = authState.get('user');
    // initialising hasMounted to false. 
    const [hasMounted, setHasMounted] = useState(false);

    const [engineIsInitialized, setEngineInitialized] = useState(false);
    
    const InitializationOptions = {
        postProcessing: true,
        editor: true,
        gameModes: [
            DefaultGameMode
          ]
      };
  
    useEffect(() => {
        initializeEngine(InitializationOptions).then(() => {
            console.log("Setting engine inited");
            setEngineInitialized(true);
        });
    }, []);

    // setting hasMounted true once DOM get rendered or get updated.
    useEffect(() => setHasMounted(true), []);

    // setting doLoginAuto true once DOM get rendered or get updated..
    useEffect(() => {
        doLoginAuto(true);
    }, []);

/**
 * validating user and rendering EditorContainer component.
 * <NoSSR> enabling the defer rendering.
 *
 */
    return hasMounted &&
    <Suspense fallback={React.Fragment}>
        <NoSSR>
            { authUser?.accessToken != null && authUser.accessToken.length > 0 
              && user?.id != null && engineIsInitialized && <EditorContainer Engine={Engine} {...props} /> }
        </NoSSR>
    </Suspense>;
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);