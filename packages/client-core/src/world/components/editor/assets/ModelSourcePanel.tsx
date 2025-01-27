import React from "react";
import PropTypes from "prop-types";
import MediaSourcePanel from "./MediaSourcePanel";
import { useTranslation } from "react-i18next";

/**
 * ModelSourcePanel used to render view containg AssetPanelToolbarContent and AssetPanelContentContainer.
 * 
 * @author Robert Long
 * @param       {any} props
 * @constructor
 */
export default function ModelSourcePanel(props) {
  const { t } = useTranslation();
  return <MediaSourcePanel {...props} searchPlaceholder={props.source.searchPlaceholder || t('editor:asset.modelSourcePanel.ph-search')} />;
}

//declairing properties ModelSourcePanel
ModelSourcePanel.propTypes = {
  source: PropTypes.object
};
