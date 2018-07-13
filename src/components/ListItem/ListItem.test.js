import React from 'react';
import LinkItem from './ListItem';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer
        .create(<LinkItem value="Test Queue" />)
        .toJSON();
    expect(tree).toMatchSnapshot();
})
