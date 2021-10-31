import React from 'react';
import MyLogo from '../../images/logo.png';

import { Link } from 'react-router-dom';

import { Wrapper, Content, LogoImg } from './Header.styles';

const Header: React.FC = () => (
    <Wrapper>
        <Content>
            <Link to='/'>
                <LogoImg src={MyLogo} alt='ts-logo' />
            </Link>
        </Content>
    </Wrapper>
);

export default Header;