import React from 'react';
import { storiesOf } from '@storybook/react';
import Story from '../src/components/Story'

storiesOf('Button', module)
  .add('with text', () => (
    <button>Hello Button</button>
  ))
  .add('with emoji', () => (
    <button><span role="img" aria-label="so cool">😀 😎 👍 💯</span></button>
  ));

  storiesOf('Story', module)
  .add('Story component', () => (
    <Story/>
  ))
  