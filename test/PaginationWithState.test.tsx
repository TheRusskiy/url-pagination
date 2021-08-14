/* eslint-disable react/react-in-jsx-scope */

import * as ReactDOM from 'react-dom';
import { Default as PaginationWithState } from '../stories/PaginationWithState.stories';

describe('PaginationWithState', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PaginationWithState total={100} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
