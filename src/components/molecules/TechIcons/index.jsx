import React from 'react';
import cn from 'classnames';
import * as styles from './TechIcons.module.sass';
import Icon from '../../atoms/Icon';

function TechIcons({ list }) {
    return (
        <div>
            {list.map((x, i) => {
                return <TechIcon x={x} key={i} />;
            }
            )}
        </div>
    );
}

function TechIcon({ x }) {
    return (
        <>
            <div className={styles.title}>{x.title}</div>
            <div className={styles.contents}>
                {x.contents.map((content, j) => {
                    return <TechIconContent content={content} key={j} />;
                }
                )}
            </div>
        </>
    );
}

function TechIconContent({ content }) {
    return (
        <div className={styles.item}>
            <Icon className={cn('icon-common', styles.icon)} name={content} />
            <div className={styles.name}>{content}</div>
        </div>
    );
}

export default TechIcons;
