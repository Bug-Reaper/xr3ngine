import React from "react";
import PropTypes from "prop-types";
import Dialog from "./Dialog";
import { Trans, useTranslation } from "react-i18next";


/**
 * SupportDialog used to render content for support.
 * 
 * @author Robert Long
 * @param       {function} onCancel
 * @param       {any} props
 * @constructor
 */
export default function SupportDialog({ onCancel, ...props }) {
  const { t } = useTranslation();

  //returning view for SupportDialog
  return (
    <Dialog {...props} title={t('editor:dialog.support.title')}>
      <div>
        <p>{t('editor:dialog.support.header')}</p>
        <p>
          <Trans t={t} values={{ mail: "support@xr3ngine.dev" }} i18nKey="editor:dialog.support.msg">
            You can file a&nbsp;
            <a href="https://github.com/xr3ngine/xr3ngine/issues/new" target="_blank" rel="noopener noreferrer">
              GitHub Issue
            </a>&nbsp;
            or e-mail us for support at <a href="mailto:support@xr3ngine.dev">support@xr3ngine.dev</a>
          </Trans>
        </p>
        <p>
          <Trans t={t} i18nKey="editor:dialog.support.discord">
            You can also find us on&nbsp;
            <a href="https://discord.gg/mQ3D4FE" target="_blank" rel="noopener noreferrer">
              Discord
            </a>
          </Trans>
        </p>
      </div>
    </Dialog>
  );
}

/**
 * declairing propTypes for SupportDialog.
 * 
 * @author Robert Long
 * @type {Object}
 */
SupportDialog.propTypes = {
  onCancel: PropTypes.func
};
