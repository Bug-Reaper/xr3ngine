import Button from '@material-ui/core/Button';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { selectCreatorsState } from '../../reducers/creator/selector';
import { followCreator, getCreator, getFollowersList, getFollowingList, unFollowCreator } from '../../reducers/creator/service';
import CreatorCard from '../CreatorCard';
import Featured from '../Featured';
// @ts-ignore
import styles from './Creator.module.scss';

const mapStateToProps = (state: any): any => {
    return {
      creatorState: selectCreatorsState(state),
    };
  };
  
  const mapDispatchToProps = (dispatch: Dispatch): any => ({
    getCreator: bindActionCreators(getCreator, dispatch),
    followCreator: bindActionCreators(followCreator, dispatch),
    unFollowCreator: bindActionCreators(unFollowCreator, dispatch),
    getFollowersList: bindActionCreators(getFollowersList, dispatch),
    getFollowingList: bindActionCreators(getFollowingList, dispatch),
  });

  interface Props{
    creatorId: string;
    creatorState?: any;
    getCreator?: typeof getCreator;
    followCreator?: typeof followCreator;
    unFollowCreator?: typeof unFollowCreator;
    getFollowersList?:typeof getFollowersList;
    getFollowingList?:typeof getFollowingList;
    creatorData?: any;
  }

const Creator = ({creatorId, creatorState, getCreator, followCreator, unFollowCreator, getFollowersList, getFollowingList, creatorData}:Props) => { 
    const [isMe, setIsMe] = useState(false);
    let creator = null;
    useEffect(()=>{
        if(creatorState && creatorState.get('currentCreator') && creatorId === creatorState.get('currentCreator').id){
            setIsMe(true);
        }else{
            if(!creatorData){
                getCreator(creatorId);
            }
        }
    },[]);
    if(creatorState && creatorState.get('fetching') === false){
        creator = isMe === true ? creatorState.get('currentCreator') : creatorData ? creatorData : creatorState.get('creator');
    }
    const [videoType, setVideoType] = useState('creator');
    return  creator ?  (<section className={styles.creatorContainer}>
            <CreatorCard creator={creator} />
            {isMe && <section className={styles.videosSwitcher}>
                    <Button variant={videoType === 'myFeatured' ? 'contained' : 'text'} color='secondary' className={styles.switchButton+(videoType === 'myFeatured' ? ' '+styles.active : '')} onClick={()=>setVideoType('myFeatured')}>Featured</Button>
                    <Button variant={videoType === 'creator' ? 'contained' : 'text'} color='secondary' className={styles.switchButton+(videoType === 'creator' ? ' '+styles.active : '')} onClick={()=>setVideoType('creator')}>My Videos</Button>
                    <Button variant={videoType === 'bookmark' ? 'contained' : 'text'} color='secondary' className={styles.switchButton+(videoType === 'bookmark' ? ' '+styles.active : '')} onClick={()=>setVideoType('bookmark')}>Saved Videos</Button>
            </section>}
            {creator?.id && <section className={styles.feedsWrapper}><Featured creatorId={creator.id} type={videoType}/></section>}
        </section>) 
    : <></>;
};

export default connect(mapStateToProps, mapDispatchToProps)(Creator);