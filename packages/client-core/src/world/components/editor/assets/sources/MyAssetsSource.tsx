import { BaseSource } from "./index";
import { ItemTypes } from "../../dnd";
import UploadSourcePanel from "../UploadSourcePanel";
import ModelNode from "@xr3ngine/engine/src/editor/nodes/ModelNode";
import VideoNode from "@xr3ngine/engine/src/editor/nodes/VideoNode";
import ImageNode from "@xr3ngine/engine/src/editor/nodes/ImageNode";
import AudioNode from "@xr3ngine/engine/src/editor/nodes/AudioNode";
import { AcceptsAllFileTypes } from "../fileTypes";
import i18n from "i18next";
import Editor from "../../Editor";
const assetTypeToNode = {
  model: ModelNode,
  image: ImageNode,
  video: VideoNode,
  audio: AudioNode
};
const assetTypeToItemType = {
  model: ItemTypes.Model,
  image: ItemTypes.Image,
  video: ItemTypes.Video,
  audio: ItemTypes.Audio
};
export default class MyAssetsSource extends BaseSource {
  component: typeof UploadSourcePanel;
  editor: Editor;
  tags: { label: string; value: string }[];
  searchLegalCopy: string;
  privacyPolicyUrl: string;
  uploadMultiple: boolean;
  acceptFileTypes: string;
  constructor(editor) {
    super();
    this.component = UploadSourcePanel;
    this.editor = editor;
    this.id = "assets";
    this.name = i18n.t('editor:sources.myAssets.name');
    this.tags = [
      { label: "Models", value: "model" },
      { label: "Images", value: "image" },
      { label: "Videos", value: "video" },
      { label: "Audio", value: "audio" }
    ];
    this.searchLegalCopy = "Search by Mozilla Hubs";
    this.privacyPolicyUrl =
      "https://github.com/xr3ngine/xr3ngine/blob/master/PRIVACY.md";
    this.uploadSource = true;
    this.uploadMultiple = true;
    this.acceptFileTypes = AcceptsAllFileTypes;
    this.requiresAuthentication = true;
  }
  async upload(files, onProgress, abortSignal) {
    const assets = await this.editor.api.uploadAssets(
      this.editor,
      files,
      onProgress,
      abortSignal
    );
    this.emit("resultsChanged");
    return assets;
  }
  async delete(item) {
    await this.editor.api.deleteAsset(item.id);
    this.emit("resultsChanged");
  }
  async search(params, cursor, abortSignal) {
    const {
      results,
      suggestions,
      nextCursor
    } = await this.editor.api.searchMedia(
      this.id,
      {
        query: params.query,
        type: params.tags && params.tags.length > 0 && params.tags[0].value
      },
      cursor,
      abortSignal
    );
    return {
      results: results.map(result => {
        const thumbnailUrl =
          result &&
          result.images &&
          result.images.preview &&
          result.images.preview.url;
        const nodeClass = assetTypeToNode[result.type];
        const iconComponent = thumbnailUrl
          ? null
          : this.editor.nodeEditors.get(nodeClass).WrappedComponent
            ? this.editor.nodeEditors.get(nodeClass).WrappedComponent.iconComponent
            : this.editor.nodeEditors.get(nodeClass).iconComponent;
        return {
          id: result.id,
          thumbnailUrl,
          iconComponent,
          label: result.name,
          type: assetTypeToItemType[result.type],
          url: result.url,
          nodeClass,
          initialProps: {
            name: result.name,
            src: result.url
          }
        };
      }),
      suggestions,
      nextCursor,
      hasMore: !!nextCursor
    };
  }
}
