import { Cube } from "@styled-icons/fa-solid/Cube";
import ModelNode from "@xr3ngine/engine/src/editor/nodes/ModelNode";
import i18n from "i18next";
import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import BooleanInput from "../inputs/BooleanInput";
import InputGroup from "../inputs/InputGroup";
import ModelInput from "../inputs/ModelInput";
import SelectInput from "../inputs/SelectInput";
import StringInput from "../inputs/StringInput";
import NodeEditor from "./NodeEditor";

/**
 * Array containing options for InteractableOption.
 * 
 * @author Robert Long
 * @type {Array}
 */
const InteractableOption = [
  {
    label: "InfoBox",
    value: "infoBox"
  },
  {
    label: "Open link",
    value: "link"
  },
  {
    label: "Equippable",
    value: "equippable"
  },
  {
    label: "GameObject",
    value: "gameobject"
  },
];

/**
 * Declairing properties for ModalNodeEditor component.
 * 
 * @author Robert Long
 * @type {Object}
 */
type ModelNodeEditorProps = {
  editor?: any;
  node?: object;
  multiEdit?: boolean;
  t: Function;
};

//Declairing TriggerVolumeNodeEditor state
type ModelNodeEditorState = {
  options: any[];
};

/**
 * ModelNodeEditor used to create editor view for the properties of ModelNode.
 * 
 * @author Robert Long
 * @type {class component}
 */
export class ModelNodeEditor extends Component<
  ModelNodeEditorProps,
  ModelNodeEditorState
> {
  
  //initializing props and state
  constructor(props) {
    super(props);
    this.state = {
      options: []
    };
  }

  componentDidMount() {
    const options = [];
    const sceneNode = (this.props.editor as any).scene;
    sceneNode.traverse(o => {
      if (o.isNode && o !== sceneNode && o.nodeName === "Game") {
        options.push({ label: o.name, value: o.uuid, nodeName: o.nodeName });
      }
    });
    this.setState({ options });
  }

  //initializing description and will appears on the editor view
  static description = i18n.t('editor:properties.model.description');

  //initializing iconComponent with image name
  static iconComponent = Cube;

  //function to handle change in property src
  onChangeSrc = (src, initialProps) => {
    (this.props.editor as any).setPropertiesSelected({ ...initialProps, src });
  };



  //fucntion to handle changes in activeChipIndex property
  onChangeAnimation = activeClipIndex => {
    (this.props.editor as any).setPropertySelected("activeClipIndex", activeClipIndex);
  };

  //function to handle change in collidable property
  onChangeCollidable = collidable => {
    (this.props.editor as any).setPropertySelected("collidable", collidable);
  };

  //function to handle change in saveColliders property
  onChangeSaveColliders = saveColliders => {
    (this.props.editor as any).setPropertySelected("saveColliders", saveColliders);
  };

  // function to handle changes in walkable property
  onChangeWalkable = walkable => {
    (this.props.editor as any).setPropertySelected("walkable", walkable);
  };

  // function to handle changes in castShadow property
  onChangeCastShadow = castShadow => {
    (this.props.editor as any).setPropertySelected("castShadow", castShadow);
  };

  // function to handle changes in Receive shadow property
  onChangeReceiveShadow = receiveShadow => {
    (this.props.editor as any).setPropertySelected("receiveShadow", receiveShadow);
  };

  // function to handle changes in interactable property
  onChangeInteractable = interactable => {
    (this.props.editor as any).setPropertySelected("interactable", interactable);
  };

  // function to handle changes in interactionType property
  onChangeInteractionType = interactionType => {
    (this.props.editor as any).setPropertySelected("interactionType", interactionType);
  };

  // function to handle changes in interactionText property
  onChangeInteractionText = interactionText => {
    (this.props.editor as any).setPropertySelected("interactionText", interactionText);
  };

  // function to handle changes in payloadName property
  onChangePayloadName = payloadName => {
    (this.props.editor as any).setPropertySelected("payloadName", payloadName);
  };

  // function to handle changes in payloadName property
  onChangeRole = role => {
    (this.props.editor as any).setPropertySelected("role", role);
  };

  //function to handle the changes in target
  onChangeTarget = target => {
    (this.props.editor as any).setPropertySelected(
      "target", target
    );
  };

  // function to handle changes in payloadUrl
  onChangePayloadUrl = payloadUrl => {
    (this.props.editor as any).setPropertySelected("payloadUrl", payloadUrl);
  };

  // function to handle changes in payloadBuyUrl
  onChangePayloadBuyUrl = payloadBuyUrl => {
    (this.props.editor as any).setPropertySelected("payloadBuyUrl", payloadBuyUrl);
  };

  // function to handle changes in payloadLearnMoreUrl
  onChangePayloadLearnMoreUrl = payloadLearnMoreUrl => {
    (this.props.editor as any).setPropertySelected("payloadLearnMoreUrl", payloadLearnMoreUrl);
  };

  // function to handle changes in payloadHtmlContent
  onChangePayloadHtmlContent = payloadHtmlContent => {
    (this.props.editor as any).setPropertySelected("payloadHtmlContent", payloadHtmlContent);
  };

  // function to handle changes in isAnimationPropertyDisabled
  isAnimationPropertyDisabled() {
    const { multiEdit, editor, node } = this.props as any;
    if (multiEdit) {
      return editor.selected.some(
        selectedNode => selectedNode.src !== node.src
      );
    }
    return false;
  }

  // creating view for interactable type
  renderInteractableTypeOptions = (node) => {


    const targetOption = this.state.options.find(o => o.value === node.target);
    const target = targetOption ? targetOption.value : null;
    const targetNotFound = node.target && target === null;

    let selectValues = [];
    if(node.target){
    // Get current game mode -- check target game mode
    console.log("Target is", node.target);

    console.log("Editor nodes are", this.props.editor.nodes);

    const nodeTarget = this.props.editor.nodes.find(node => node.uuid === target);
    
    if(nodeTarget){
    console.log("nodeTarget", nodeTarget);

    const gameMode = nodeTarget.gameMode;

    const gameObjectRoles = this.props.editor.Engine.gameModes[gameMode].gameObjectRoles;
    
    console.log("gameObjectRoles are", gameObjectRoles);

    selectValues = gameObjectRoles.map((role, index) => { return { label: role, value: index }; });

    console.log("SelectValues are", selectValues);
    }  
  }
    switch (node.interactionType) {
      case 'gameobject': return <>
        { /* @ts-ignore */}
        <InputGroup
          name="Game Target"
          label={this.props.t('editor:properties.model.lbl-target')}
        >
          { /* @ts-ignore */}
          <SelectInput
            error={targetNotFound}
            placeholder={
              targetNotFound ? this.props.t('editor:properties.model.ph-errorNode') : this.props.t('editor:properties.triggereVolume.ph-selectNode')
            }
            value={node.target}
            onChange={this.onChangeTarget}
            options={this.state.options}
            disabled={this.props.multiEdit}
          />
        </InputGroup>
        { node.target &&
          /* @ts-ignore */
          <InputGroup
            name="Role"
            label={i18n.t('editor:properties.model.lbl-role')}
          >
            { /* @ts-ignore */}
            <SelectInput
              options={selectValues}
              value={node.role}
              onChange={this.onChangeRole}
            />
          </InputGroup>
        }

      </>;
      case 'infoBox': return <>
        { /* @ts-ignore */}
        <InputGroup name="Name" label={this.props.t('editor:properties.model.lbl-name')}>
          <StringInput
            /* @ts-ignore */
            value={node.payloadName}
            onChange={this.onChangePayloadName}
          />
        </InputGroup>
        { /* @ts-ignore */}
        <InputGroup name="Url" label={this.props.t('editor:properties.model.lbl-url')}>
          <StringInput
            /* @ts-ignore */
            value={node.payloadUrl}
            onChange={this.onChangePayloadUrl}
          />
        </InputGroup>
        { /* @ts-ignore */}
        <InputGroup name="BuyUrl" label={this.props.t('editor:properties.model.lbl-buy')}>
          <StringInput
            /* @ts-ignore */
            value={node.payloadBuyUrl}
            onChange={this.onChangePayloadBuyUrl}
          />
        </InputGroup>
        { /* @ts-ignore */}
        <InputGroup name="LearnMoreUrl" label={this.props.t('editor:properties.model.lbl-learnMore')}>
          <StringInput
            /* @ts-ignore */
            value={node.payloadLearnMoreUrl}
            onChange={this.onChangePayloadLearnMoreUrl}
          />
        </InputGroup>
        { /* @ts-ignore */}
        <InputGroup name="HtmlContent" label={this.props.t('editor:properties.model.lbl-htmlContent')}>
          <StringInput
            /* @ts-ignore */
            value={node.payloadHtmlContent}
            onChange={this.onChangePayloadHtmlContent}
          />
        </InputGroup>
      </>;
      default: break;
    }
  }

  // creating view for dependent fields
  renderInteractableDependantFields = (node) => {
    switch (node.interactable) {
      case true: return <>
        { /* @ts-ignore */}
        <InputGroup name="Interaction Text" label={this.props.t('editor:properties.model.lbl-interactionText')}>
          { /* @ts-ignore */}
          <StringInput
            /* @ts-ignore */
            value={node.interactionText}
            onChange={this.onChangeInteractionText}
          />
        </InputGroup>
        { /* @ts-ignore */}
        <InputGroup name="Interaction Type" label={this.props.t('editor:properties.model.lbl-interactionType')}>
          { /* @ts-ignore */}
          <SelectInput
            options={InteractableOption}
            value={node.interactionType}
            onChange={this.onChangeInteractionType}
          />
        </InputGroup>
        {this.renderInteractableTypeOptions(node)}
      </>;
      default: break;
    }
  }

  // rendering view of ModelNodeEditor
  render() {
    ModelNodeEditor.description = this.props.t('editor:properties.model.description');
    const node = this.props.node as any;
    return (
      /* @ts-ignore */
      <NodeEditor description={ModelNodeEditor.description} {...this.props}>
        { /* @ts-ignore */}
        <InputGroup name="Model Url" label={this.props.t('editor:properties.model.lbl-modelurl')}>
          <ModelInput value={node.src} onChange={this.onChangeSrc} />
          {!(this.props.node as ModelNode).isValidURL && <div>{this.props.t('editor:properties.model.error-url')}</div>}
        </InputGroup>
        { /* @ts-ignore */}
        <InputGroup name="Loop Animation" label={this.props.t('editor:properties.model.lbl-loopAnimation')}>
          { /* @ts-ignore */}
          <SelectInput
            disabled={this.isAnimationPropertyDisabled()}
            options={node.getClipOptions()}
            value={node.activeClipIndex}
            onChange={this.onChangeAnimation}
          />
        </InputGroup>
        { /* @ts-ignore */}
        <InputGroup name="Collidable" label={this.props.t('editor:properties.model.lbl-collidable')}>
          <BooleanInput
            value={node.collidable}
            onChange={this.onChangeCollidable}
          />
        </InputGroup>
        { /* @ts-ignore */}
        <InputGroup name="Save Colliders" label={this.props.t('editor:properties.model.lbl-saveColliders')}>
          <BooleanInput
            value={node.saveColliders}
            onChange={this.onChangeSaveColliders}
          />
        </InputGroup>
        { /* @ts-ignore */}
        <InputGroup name="Walkable" label={this.props.t('editor:properties.model.lbl-walkable')}>
          <BooleanInput
            value={node.walkable}
            onChange={this.onChangeWalkable}
          />
        </InputGroup>
        { /* @ts-ignore */}
        <InputGroup name="Cast Shadow" label={this.props.t('editor:properties.model.lbl-castShadow')}>
          <BooleanInput
            value={node.castShadow}
            onChange={this.onChangeCastShadow}
          />
        </InputGroup>
        { /* @ts-ignore */}
        <InputGroup name="Receive Shadow" label={this.props.t('editor:properties.model.lbl-receiveShadow')}>
          <BooleanInput
            value={node.receiveShadow}
            onChange={this.onChangeReceiveShadow}
          />
        </InputGroup>
        { /* @ts-ignore */}
        <InputGroup name="Interactable" label={this.props.t('editor:properties.model.lbl-interactable')}>
          <BooleanInput
            value={node.interactable}
            onChange={this.onChangeInteractable}
          />
        </InputGroup>
        {this.renderInteractableDependantFields(node)}
      </NodeEditor>
    );
  }
}

export default withTranslation()(ModelNodeEditor);