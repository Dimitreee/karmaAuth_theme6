import * as React from 'React';
import AppBar from 'material-ui/AppBar';

import { HeaderWrapper } from 'app/components/Header/componenets';

export const Header = () => (
  <HeaderWrapper>
    <AppBar
      showMenuIconButton={false}
      title="Karma Auth Service"
      iconClassNameLeft={undefined}
    />
  </HeaderWrapper>
);
