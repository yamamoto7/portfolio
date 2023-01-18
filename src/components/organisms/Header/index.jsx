import React from 'react';
import cn from 'classnames';
import * as styles from './Header.module.sass';
import getFilePath from '../../../utils/getFilePath';

function Header() {
    return (
        <header className={styles.header}>
            <div className={cn('center', styles.container)}>
                <a className={styles.logo} href="/">
                    <img className={styles.logo_desktop} src={getFilePath('logo.svg')} alt="logo image for this site" />
                    <img className={styles.logo_mobile} src={getFilePath('logo.svg')} alt="logo image for this site" />
                </a>

            </div>

        </header>
    );
}

export default Header;
