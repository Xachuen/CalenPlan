import React from 'react';

import styles from './MemberLabel.module.css';

export interface MemberLabelProps {
  prop?: string;
}

export function MemberLabel({prop = 'default value'}: MemberLabelProps) {
  return <div className={styles.MemberLabel}>MemberLabel {prop}</div>;
}
