/* eslint-disable react/react-in-jsx-scope */

import * as ReactDOM from 'react-dom';
import { Default as PaginationWithUrl } from '../stories/PaginationWithUrl.stories';

describe('PaginationWithUrl', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PaginationWithUrl total={100} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
