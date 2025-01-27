import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import LinkIcon from '@material-ui/icons/Link';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
// TODO: Reenable me! Disabled because we don't want the client-networking dep in client-core, need to fix this
// import { provisionInstanceServer } from "@xr3ngine/client-networking/src/reducers/instanceConnection/service";
import { EngineEvents } from '@xr3ngine/engine/src/ecs/classes/EngineEvents';
import { ClientInputSystem } from '@xr3ngine/engine/src/input/systems/ClientInputSystem';
import { WebGLRendererSystem } from '@xr3ngine/engine/src/renderer/WebGLRendererSystem';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { alertSuccess } from '../../../common/reducers/alert/service';
import { selectAppOnBoardingStep } from '../../../common/reducers/app/selector';
import { selectAuthState } from '../../reducers/auth/selector';
import { fetchAvatarList, removeAvatar, updateUserAvatarId, updateUserSettings, uploadAvatarModel } from '../../reducers/auth/service';
import AvatarMenu from './menus/AvatarMenu';
import AvatarSelectMenu from './menus/AvatarSelectMenu';
import ProfileMenu from './menus/ProfileMenu';
import SettingMenu from './menus/SettingMenu';
import ShareMenu from './menus/ShareMenu';
// @ts-ignore
import styles from './style.module.scss';
import { UserMenuProps, Views } from './util';

type StateType = {
  currentActiveMenu: any;
  profileMenuOpen: boolean;
  username: any;
  userSetting: any;
  graphics: any;
}

const mapStateToProps = (state: any): any => {
  return {
    onBoardingStep: selectAppOnBoardingStep(state),
    authState: selectAuthState(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch): any => ({
  updateUserAvatarId: bindActionCreators(updateUserAvatarId, dispatch),
  updateUserSettings: bindActionCreators(updateUserSettings, dispatch),
  alertSuccess: bindActionCreators(alertSuccess, dispatch),
  // provisionInstanceServer: bindActionCreators(provisionInstanceServer, dispatch),
  uploadAvatarModel: bindActionCreators(uploadAvatarModel, dispatch),
  fetchAvatarList: bindActionCreators(fetchAvatarList, dispatch),
  removeAvatar: bindActionCreators(removeAvatar, dispatch),
});

const UserMenu = (props: UserMenuProps): any => {
  const {
    authState,
    updateUserAvatarId,
    alertSuccess,
    uploadAvatarModel,
    fetchAvatarList,
  } = props;

  const menus = [
    { id: Views.Profile, iconNode: PersonIcon },
    { id: Views.Settings, iconNode: SettingsIcon },
    { id: Views.Share, iconNode: LinkIcon },
  ];

  const menuPanel = {
    [Views.Profile]: ProfileMenu,
    [Views.Settings]: SettingMenu,
    [Views.Share]: ShareMenu,
    [Views.Avatar]: AvatarMenu,
    [Views.AvatarUpload]: AvatarSelectMenu,
  };

  const [engineLoaded, setEngineLoaded] = useState(false);

  const selfUser = authState.get('user') || {};
  const avatarList = authState.get('avatarList') || [];
  const prevPropUsername = '';

  const [currentActiveMenu, setCurrentActiveMenu] = useState({} as any);
  const [actorEntityID, setActorEntityID] = useState(null);

  const [username, setUsername] = useState(selfUser?.name);
  const [userSetting, setUserSetting] = useState(selfUser?.user_setting);
  const [graphics, setGraphicsSetting] = useState({
    resolution: WebGLRendererSystem.scaleFactor,
    shadows: WebGLRendererSystem.shadowQuality,
    automatic: WebGLRendererSystem.automatic,
    pbr: WebGLRendererSystem.usePBR,
    postProcessing: WebGLRendererSystem.usePostProcessing,
  });
  
  const onEngineLoaded = () => {
    setEngineLoaded(true);
    EngineEvents.instance?.addEventListener(EngineEvents.EVENTS.CONNECT_TO_WORLD, graphicsSettingsLoaded);
    document.removeEventListener('ENGINE_LOADED', onEngineLoaded);
  };
  document.addEventListener('ENGINE_LOADED', onEngineLoaded);

  // EngineEvents.instance?.removeEventListener(WebGLRendererSystem.EVENTS.QUALITY_CHANGED, this.setGraphicsSettings);

  const graphicsSettingsLoaded = () => {
    EngineEvents.instance?.addEventListener(WebGLRendererSystem.EVENTS.QUALITY_CHANGED, updateGraphicsSettings);
    EngineEvents.instance?.removeEventListener(EngineEvents.EVENTS.CONNECT_TO_WORLD, graphicsSettingsLoaded);
  };

  const setAvatar = (avatarId: string, avatarURL: string, thumbnailURL: string) => {
    if (selfUser) {
      updateUserAvatarId(selfUser.id, avatarId, avatarURL, thumbnailURL);
    }
  };

  const setUserSettings = (newSetting: any): void => {
    const setting = { ...userSetting, ...newSetting };
    setUserSetting(setting);
    updateUserSettings(selfUser.user_setting.id, setting);
  };

  const updateGraphicsSettings = (newSetting: any): void => {
    const setting = { ...graphics, ...newSetting };

    setGraphicsSetting(setting);
  };

  const setActiveMenu = (e): void => {
    const identity = e.currentTarget.id.split('_');
    const enabled = Boolean(currentActiveMenu && currentActiveMenu.id === identity[0]);
    setCurrentActiveMenu(enabled ? null : menus[identity[1]]);
    if(EngineEvents.instance) EngineEvents.instance.dispatchEvent({ type: ClientInputSystem.EVENTS.ENABLE_INPUT, mouse: enabled, keyboard: enabled });
  };

  const changeActiveMenu = (menu) => {
    setCurrentActiveMenu(menu ? { id: menu } : null);
    const enabled = Boolean(menu);
    if(EngineEvents.instance) EngineEvents.instance.dispatchEvent({ type: ClientInputSystem.EVENTS.ENABLE_INPUT, mouse: !enabled, keyboard: !enabled });
  };

  const renderMenuPanel = () => {
    if (!currentActiveMenu) return null;

    let args = {};
    switch (currentActiveMenu.id) {
      case Views.Profile:
        args = {
          changeActiveMenu: changeActiveMenu,
        };
        break;
      case Views.Avatar:
        args = {
          setAvatar: setAvatar,
          changeActiveMenu: changeActiveMenu,
          removeAvatar: removeAvatar,
          fetchAvatarList: fetchAvatarList,
          avatarList: avatarList,
          avatarId: selfUser?.avatarId,
        };
        break;
      case Views.Settings:
        args = {
          setting: userSetting,
          setUserSettings: setUserSettings,
          graphics: graphics,
          setGraphicsSettings: updateGraphicsSettings,
        };
        break;
      case Views.Share:
        args = { alertSuccess: alertSuccess };
        break;
      case Views.AvatarUpload:
        args = {
          userId: selfUser?.id,
          changeActiveMenu: changeActiveMenu,
          uploadAvatarModel: uploadAvatarModel,
        };
        break;
      default: return null;
    }

    const Panel = menuPanel[currentActiveMenu.id];

    return <Panel {...args} />;
  };

  return (
    <>
      {engineLoaded && 
        <ClickAwayListener onClickAway={() => changeActiveMenu(null)}>
          <section className={styles.settingContainer}>
            <div className={styles.iconContainer}>
              {menus.map((menu, index) => {
                return (
                  <span
                    key={index}
                    id={menu.id + '_' + index}
                    onClick={setActiveMenu}
                    className={`${styles.materialIconBlock} ${currentActiveMenu && currentActiveMenu.id === menu.id ? styles.activeMenu : null}`}
                  >
                    <menu.iconNode className={styles.icon} />
                  </span>
                );
              })}
            </div>
            {currentActiveMenu
              ? renderMenuPanel()
              : null}
          </section>
        </ClickAwayListener>
      }
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);