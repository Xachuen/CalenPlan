import React from 'react';

import styles from './ProfilePictureIcon.module.css';

const ProfilePictureIcon = ( { className }) => {
  return ( 
    <img className={`${styles.ProfilePictureIcon} ${className}`} src='front_end\src\assets\Temp\profile_picture.jpg'/>
   );
}
 
export default ProfilePictureIcon;