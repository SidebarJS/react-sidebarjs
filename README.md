# React SidebarJS
Create mobile sidebar/sidenav experiance in react.

```ssh
npm install react-sidebarjs --save
```

## Import
```js
import {SidebarJS, sidebarService} from 'react-sidebarjs';
```

## Implementation

```js
import {SidebarJS, sidebarService} from 'react-sidebarjs';
import {NavLink} from 'react-router-dom';

<SidebarJS sidebarjsName="MainSidebar">
  <h3>React SidebarJS</h3>
  <nav>
    <NavLink
      to="/home"
      onClick={() => sidebarService.close('MainSidebar')}>
      Home 
    </NavLink>
  </nav>
</SidebarJS>
```